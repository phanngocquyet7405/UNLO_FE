// Integration helper. Import into CartContext and Checkoutpageservice; never calculate final prices here.
export function giftOptions(value = {}) {
  if (typeof (value.message ?? '') !== 'string') throw new Error('Gift message invalid');
  const gift = { wrap: value.wrap ?? 'none', message: (value.message ?? '').trim() };
  if (!['none', 'classic', 'eco', 'premium'].includes(gift.wrap) || typeof gift.message !== 'string' || gift.message.length > 500) throw new Error('Gift options invalid');
  return gift;
}

export function customizationOptions(value) {
  if (!value || typeof value !== 'object') return null;
  const monogramText = String(value.monogramText ?? '').trim().toUpperCase().slice(0, 5);
  const innerLabelText = String(value.innerLabelText ?? '').trim().slice(0, 30);
  const giftBoxType = ['none', 'minimal_kraft', 'atelier_linen'].includes(value.giftBoxType)
    ? value.giftBoxType
    : 'none';
  const giftNote = String(value.giftNote ?? '').trim().slice(0, 250);
  const hasAny = Boolean(monogramText || innerLabelText || giftBoxType !== 'none' || giftNote);
  if (!value.enabled && !hasAny) return null;
  return {
    enabled: true,
    monogramText,
    font: ['serif_minimal', 'sans_architect', 'italic_atelier'].includes(value.font)
      ? value.font
      : 'serif_minimal',
    threadColor: String(value.threadColor ?? '').trim().slice(0, 40),
    placement: ['none', 'left_cuff', 'hem', 'inner_neck', 'chest_pocket'].includes(value.placement)
      ? value.placement
      : 'none',
    innerLabelText,
    giftBoxType,
    giftNote,
  };
}

function itemIdentity(item) {
  const type = item.itemType ?? item.type ?? (item.boxId ? 'box' : 'product');
  if (!['box', 'product'].includes(type)) throw new Error('Cart item type invalid');
  const rawProduct = (item.productId && typeof item.productId === 'object') ? item.productId._id : item.productId;
  const productVal = (typeof rawProduct === 'string' && /^[a-f\d]{24}$/i.test(rawProduct)) ? rawProduct : (item._id ?? item.id ?? rawProduct);
  const value = (type === 'box' ? item.boxId : productVal) ?? item.id ?? item._id;
  const id = typeof value === 'object' && value ? value._id : value;
  if (typeof id !== 'string' || !/^[a-f\d]{24}$/i.test(id)) throw new Error('Cart item ID invalid');
  return { type, id };
}

function normalizeOptionalId(raw) {
  const value = raw && typeof raw === 'object' ? raw._id : raw;
  return typeof value === 'string' && /^[a-f\d]{24}$/i.test(value) ? value.toLowerCase() : null;
}

export function cartLineKey(item) {
  const { type, id } = itemIdentity(item), gift = giftOptions(item.gift);
  const variantId = normalizeOptionalId(item.variantId);
  const campaignId = normalizeOptionalId(item.campaignId);
  const customization = customizationOptions(item.customization);
  if (!variantId && !campaignId && !customization) {
    return JSON.stringify([type, id.toLowerCase(), gift.wrap, gift.message]);
  }
  return JSON.stringify([type, id.toLowerCase(), gift.wrap, gift.message, variantId, campaignId, customization]);
}

export function toCartPayload(items) {
  return items.map(item => {
    const { type, id } = itemIdentity(item), quantity = item.quantity;
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 999) throw new Error('Quantity invalid');
    const variantId = normalizeOptionalId(item.variantId);
    const campaignId = normalizeOptionalId(item.campaignId);
    const customization = customizationOptions(item.customization);
    return {
      [type === 'box' ? 'boxId' : 'productId']: id.toLowerCase(),
      ...(variantId ? { variantId } : {}),
      ...(campaignId ? { campaignId } : {}),
      ...(Array.isArray(item.bundleSelections) && item.bundleSelections.length
        ? { bundleSelections: item.bundleSelections }
        : {}),
      quantity,
      gift: giftOptions(item.gift),
      ...(customization ? { customization } : {}),
    };
  });
}

export function mergeCartLines(items) {
  const merged = new Map();
  for (const item of items) {
    toCartPayload([item]);
    const key = cartLineKey(item), previous = merged.get(key), quantity = (previous?.quantity ?? 0) + item.quantity;
    if (quantity > 999) throw new Error('Quantity exceeds 999');
    const customization = customizationOptions(item.customization);
    merged.set(key, {
      ...item,
      gift: giftOptions(item.gift),
      ...(customization ? { customization } : {}),
      quantity,
    });
  }
  return [...merged.values()];
}
