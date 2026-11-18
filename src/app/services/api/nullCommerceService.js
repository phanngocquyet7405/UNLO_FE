import { axiosConfig } from "./axiosConfig";

export const nullCommerceService = {
  // Products & Variants
  getProducts: (params = {}) =>
    axiosConfig.get("/products/get-all-products", { params }),
  getProductBySlug: (slug) => axiosConfig.get(`/products/by-slug/${slug}`),
  getProductById: (id) => axiosConfig.get(`/products/get-products-by-id/${id}`),
  getProductVariants: (productId) =>
    axiosConfig.get(`/products/${productId}/variants`),
  createVariant: (productId, payload) =>
    axiosConfig.post(`/products/${productId}/variants`, payload),
  adjustVariantStock: (productId, variantId, delta) =>
    axiosConfig.patch(`/products/${productId}/variants/${variantId}/adjust-stock`, {
      delta,
    }),

  // OEM/ODM Factories
  getFactories: () => axiosConfig.get("/factories/get-all-brands"),

  // Commerce Policy (Personalization fees & Shipping threshold)
  getPolicy: () => axiosConfig.get("/commerce-policy"),

  // Verified Fit Reviews
  getReviews: (productId, params = {}) =>
    axiosConfig.get(`/reviews/product/${productId}`, { params }),
  submitReview: (productId, payload) =>
    axiosConfig.post(`/reviews/product/${productId}`, payload),

  // Group-Buy & Pre-Order Campaigns
  getCampaigns: (params = {}) => axiosConfig.get("/campaigns", { params }),
  getCampaignDetail: (idOrSlug) => axiosConfig.get(`/campaigns/${idOrSlug}`),
  createCampaign: (payload) => axiosConfig.post("/campaigns", payload),
  updateCampaignStage: (id, payload) =>
    axiosConfig.patch(`/campaigns/${id}/stage`, payload),
  triggerCampaignMoqRefund: (id, reason) =>
    axiosConfig.post(`/campaigns/${id}/trigger-moq-refund`, { reason }),

  // Capsule Bundles (Boxes)
  getBundles: (params = {}) => axiosConfig.get("/boxes/get-all-box", { params }),

  // B2B Subtle Branding Portal
  submitB2BQuote: (payload) => axiosConfig.post("/b2b/quotes", payload),
  getMyB2BQuotes: () => axiosConfig.get("/b2b/my-quotes"),
  adminGetB2BQuotes: (params = {}) =>
    axiosConfig.get("/b2b/admin/quotes", { params }),
  adminUpdateB2BQuote: (id, payload) =>
    axiosConfig.patch(`/b2b/admin/quotes/${id}`, payload),

  // Return / Size Exchange (RMA)
  submitReturn: (payload) => axiosConfig.post("/returns", payload),
  getMyReturns: () => axiosConfig.get("/returns/my-returns"),
  adminGetReturns: (params = {}) => axiosConfig.get("/returns/admin", { params }),
  adminProcessReturn: (id, payload) =>
    axiosConfig.patch(`/returns/admin/${id}`, payload),

  // Referral & Affiliate
  getMyReferral: () => axiosConfig.get("/referrals/me"),
  validateReferralCode: (code) => axiosConfig.get(`/referrals/validate/${code}`),
  adminGetReferralProfiles: () => axiosConfig.get("/referrals/admin/profiles"),
  adminUpdateReferralProfile: (id, payload) =>
    axiosConfig.patch(`/referrals/admin/profiles/${id}`, payload),

  // Admin Unit Economics & Postponement Personalization Queue
  adminGetUnitEconomics: () => axiosConfig.get("/admin/analytics/unit-economics"),
  adminGetPersonalizationQueue: (params = {}) =>
    axiosConfig.get("/admin/personalization-queue", { params }),
  adminUpdatePersonalizationStatus: (orderId, lineId, workStatus) =>
    axiosConfig.patch(`/admin/personalization-queue/${orderId}/${lineId}`, {
      workStatus,
    }),
};

export function formatVnd(amount) {
  const n = Number(amount) || 0;
  return `${Math.round(n).toLocaleString("vi-VN")}đ`;
}
