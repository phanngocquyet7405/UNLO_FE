import { Suspense } from "react";
import NullCatalogClient from "@/components/null/NullCatalogClient";
import {
  getServerProductsCatalog,
  getPublicSiteUrl,
} from "@/app/services/server/serverCatalog";
import { filterUnloProducts } from "@/lib/unloCatalog";

export const revalidate = 60;

export async function generateMetadata({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const search = (searchParams?.search || searchParams?.keyword || "").trim();
  const category = (searchParams?.category || "").trim();
  const brandSlug = (searchParams?.brand || searchParams?.brandSlug || "").trim();

  const siteUrl = getPublicSiteUrl();
  const queryParts = [];
  if (page > 1) queryParts.push(`page=${page}`);
  if (search) queryParts.push(`search=${encodeURIComponent(search)}`);
  if (category) queryParts.push(`category=${encodeURIComponent(category)}`);
  if (brandSlug) queryParts.push(`brand=${encodeURIComponent(brandSlug)}`);
  const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  const canonicalUrl = `${siteUrl}/products${qs}`;

  let title = "Sản Phẩm Trực Tiếp Từ Xưởng M2C | UNLO";
  if (search) {
    title = `Tìm kiếm: "${search}" | UNLO`;
  } else if (page > 1) {
    title = `Sản Phẩm Trực Tiếp Từ Xưởng M2C - Trang ${page} | UNLO`;
  }

  const description =
    "Khám phá hàng thiết yếu chuẩn xuất khẩu từ 4 nhà máy Tier-1 OEM Việt Nam tại UNLO — minh bạch giá thành, Hộ chiếu nhà máy và đổi trả 30 ngày.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "UNLO",
      type: "website",
    },
  };
}

export default async function ProductsPage({ searchParams: searchParamsPromise }) {
  const searchParams = searchParamsPromise ? await searchParamsPromise : {};
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const keyword = (searchParams?.search || searchParams?.keyword || "").trim();
  const category = (searchParams?.category || "").trim();
  const material = (searchParams?.material || "").trim();
  const brandSlug = (searchParams?.brand || searchParams?.brandSlug || "").trim();
  const personalizable = searchParams?.personalizable === "true";

  let serverProducts = [];
  let serverError = null;
  try {
    const catalog = await getServerProductsCatalog({
      page,
      limit: 24,
      keyword: keyword || undefined,
      category: category || undefined,
      brandSlug: brandSlug || undefined,
    });
    serverProducts = catalog?.products || catalog?.data || [];
    if (catalog?.error && Number(catalog.error.status) >= 500) {
      serverError = catalog.error;
    }
  } catch (err) {
    serverProducts = [];
    if (err && Number(err.status) >= 500) {
      serverError = {
        message: err.message,
        status: err.status,
        requestId: err.requestId,
      };
    }
  }

  let initialProducts =
    serverProducts.length > 0
      ? serverProducts
      : filterUnloProducts({
          keyword,
          category,
          material,
          personalizable,
        });

  if (category || material || personalizable) {
    const unloFiltered = filterUnloProducts({
      keyword,
      category,
      material,
      personalizable,
    });
    if (unloFiltered.length > 0) {
      initialProducts = unloFiltered;
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <NullCatalogClient
        initialProducts={initialProducts}
        initialError={serverError}
        preferInitialWhenUnfiltered={serverProducts.length > 0}
      />
    </Suspense>
  );
}
