/**
 * Dữ liệu áo theo mùa — dùng chung cho trang chủ (HomeEmbroideryStudio)
 * và trang chi tiết sản phẩm (NullProductDetailClient).
 *
 * Mỗi mùa = 1 loại áo trắng + 2 góc nhìn (áo phẳng / mặc thử).
 * Tọa độ x, y tính theo % khung ảnh 4:5 (ảnh đã chuẩn hóa trong
 * /public/assets/img/custom). rot = độ nghiêng chữ thêu.
 * size = cỡ chữ theo % bề rộng khung ảnh (đơn vị cqw), k = hệ số theo ảnh.
 */
export const IMG_DIR = "/assets/img/custom";

export const SEASONS = [
  {
    id: "summer",
    label: "Mùa hè",
    product: "Áo thun cộc tay",
    tagline: "Gọn nhẹ cho ngày nóng",
    centerLabel: "Giữa ngực",
    views: {
      flat: {
        src: `${IMG_DIR}/summer-flat.webp`,
        k: 1,
        spots: {
          chest: { x: 63, y: 26, rot: 0, size: 3.6 },
          center: { x: 50, y: 35, rot: 0, size: 5.6 },
          hem: { x: 60, y: 82, rot: 0, size: 3.1 },
          cuff: { x: 90, y: 38, rot: 24, size: 2.2 },
        },
      },
      model: {
        src: `${IMG_DIR}/summer-model.webp`,
        k: 0.95,
        spots: {
          chest: { x: 62, y: 37, rot: 0, size: 3.4 },
          center: { x: 50, y: 46, rot: 0, size: 5.4 },
          hem: { x: 55, y: 78, rot: 0, size: 3 },
          cuff: { x: 80, y: 53, rot: 8, size: 2.2 },
        },
      },
    },
  },
  {
    id: "autumn",
    label: "Mùa thu",
    product: "Áo dài tay",
    tagline: "Dáng rộng cho ngày se lạnh",
    centerLabel: "Giữa ngực",
    views: {
      flat: {
        src: `${IMG_DIR}/autumn-flat.webp`,
        k: 1,
        spots: {
          chest: { x: 63, y: 27, rot: 0, size: 3.6 },
          center: { x: 50, y: 36, rot: 0, size: 5.6 },
          hem: { x: 58, y: 83, rot: 0, size: 3.1 },
          cuff: { x: 86, y: 87, rot: -10, size: 1.9 },
        },
      },
      model: {
        src: `${IMG_DIR}/autumn-model.webp`,
        k: 1,
        spots: {
          chest: { x: 60, y: 37, rot: 0, size: 3.4 },
          center: { x: 48, y: 46, rot: 0, size: 5.4 },
          hem: { x: 52, y: 86, rot: 0, size: 3 },
          cuff: { x: 75, y: 86, rot: -4, size: 1.9 },
        },
      },
    },
  },
  {
    id: "winter",
    label: "Mùa đông",
    product: "Hoodie",
    tagline: "Dày ấm cho mùa lạnh",
    centerLabel: "Túi áo",
    views: {
      flat: {
        src: `${IMG_DIR}/winter-flat.webp`,
        k: 0.9,
        spots: {
          chest: { x: 60, y: 38, rot: 0, size: 3.3 },
          center: { x: 50, y: 70, rot: 0, size: 4.6 },
          hem: { x: 52, y: 82, rot: 0, size: 2.8 },
          cuff: { x: 88, y: 82, rot: -15, size: 1.8 },
        },
      },
      model: {
        src: `${IMG_DIR}/winter-model.webp`,
        k: 0.8,
        spots: {
          chest: { x: 63, y: 47, rot: 0, size: 3.3 },
          center: { x: 51, y: 76, rot: 0, size: 4.6 },
          hem: { x: 53, y: 88, rot: 0, size: 2.8 },
          cuff: { x: 76, y: 28, rot: 20, size: 1.8 },
        },
      },
    },
  },
];

export const VIEWS = [
  { id: "flat", label: "Áo phẳng" },
  { id: "model", label: "Mặc thử" },
];

/* Vị trí thêu trên trang chủ → id vị trí mà trang chi tiết sản phẩm hiểu */
export const PLACEMENTS = [
  { id: "chest", label: "Ngực trái", productPos: "chest_pocket" },
  { id: "center", label: null, productPos: "center" }, // nhãn lấy theo mùa
  { id: "hem", label: "Gấu áo", productPos: "hem" },
  { id: "cuff", label: "Bo tay", productPos: "left_cuff" },
];

/* id vị trí của trang chi tiết → id điểm thêu trong SEASONS[].views[].spots.
   inner_neck (gáy cổ trong) không nhìn thấy trên ảnh mặt trước nên không có. */
export const SPOT_BY_PLACEMENT = {
  chest_pocket: "chest",
  center: "center",
  hem: "hem",
  left_cuff: "cuff",
};

export const FONTS = [
  {
    id: 0,
    label: "Cổ điển",
    family: "var(--font-serif), 'Libre Bodoni', serif",
    weight: "600",
    factor: 1,
    productFont: "serif_minimal",
  },
  {
    id: 1,
    label: "Viết tay",
    family: "var(--font-script), 'Great Vibes', cursive",
    weight: "400",
    factor: 1.5,
    productFont: "italic_atelier",
  },
  {
    id: 2,
    label: "Hiện đại",
    family: "var(--font-sans), 'Montserrat', sans-serif",
    weight: "700",
    factor: 0.95,
    productFont: "sans_architect",
  },
];

export function getSeason(id) {
  return SEASONS.find((s) => s.id === id) || null;
}

/** Tên vị trí hiển thị, "center" đổi theo mùa (hoodie = Túi áo) */
export function placementLabel(season, spotId) {
  if (spotId === "center") return season?.centerLabel || "Giữa ngực";
  return PLACEMENTS.find((p) => p.id === spotId)?.label || "";
}

/** Hè: 4–8, Thu: 9–11, Đông: 12–3 (theo khí hậu miền Bắc) */
export function seasonByMonth(month) {
  if (month >= 4 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}
