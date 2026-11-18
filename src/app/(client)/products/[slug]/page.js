import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import NullProductDetailClient from "@/components/null/NullProductDetailClient";
import {
  getServerProductDetail,
  getPublicSiteUrl,
} from "@/app/services/server/serverCatalog";
import { findUnloProductBySlugOrId } from "@/lib/unloCatalog";

export const revalidate = 60;

async function resolveProduct(slug) {
  const localMatch = findUnloProductBySlugOrId(slug);
  if (localMatch) return localMatch;
  return getServerProductDetail(slug);
}

export async function generateMetadata({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : {};
  const slug = params?.slug || "";
  const product = await resolveProduct(slug);

  if (!product) notFound();

  const canonicalSlug = `${product.slug || "san-pham"}-${product._id}`;
  if (slug !== canonicalSlug) {
    const qs = new URLSearchParams(searchParams).toString();
    permanentRedirect(`/products/${canonicalSlug}${qs ? `?${qs}` : ""}`);
  }

  const siteUrl = getPublicSiteUrl();
  const canonicalUrl = `${siteUrl}/products/${canonicalSlug}`;
  const title = `${product.name} | UNLO`;
  const description = (
    product.descriptions ||
    product.specs?.fabricComposition ||
    product.description ||
    product.name ||
    ""
  ).slice(0, 160);
  const images = (product.images || [])
    .map((img) => (typeof img === "string" ? img : img.url))
    .filter(Boolean);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "UNLO",
      images: images.length ? images.map((url) => ({ url })) : undefined,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : {};
  const slug = params?.slug || "";
  const product = await resolveProduct(slug);

  if (!product) notFound();

  const canonicalSlug = `${product.slug || "san-pham"}-${product._id}`;
  if (slug !== canonicalSlug) {
    const qs = new URLSearchParams(searchParams).toString();
    permanentRedirect(`/products/${canonicalSlug}${qs ? `?${qs}` : ""}`);
  }

  const siteUrl = getPublicSiteUrl();
  const canonicalUrl = `${siteUrl}/products/${canonicalSlug}`;
  const salePercent = product.salePercent || 0;
  const finalPrice =
    salePercent > 0
      ? Math.round(product.price * (1 - salePercent / 100))
      : product.price;
  const brandName = product.creatorName || product.brand?.name || "UNLO Studio";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.descriptions || product.specs?.fabricComposition || product.name,
    image: (product.images || [])
      .map((img) => (typeof img === "string" ? img : img.url))
      .filter(Boolean),
    brand: { "@type": "Brand", name: brandName },
    offers: {
      "@type": "Offer",
      price: finalPrice,
      priceCurrency: "VND",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-7 sm:pt-9 pb-14">
        <nav
          className="flex items-center flex-wrap gap-1.5 text-xs text-[#4E567A] mb-6 sm:mb-8"
          aria-label="Đường dẫn"
        >
          <Link href="/" className="hover:text-[#15095D] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/products" className="hover:text-[#15095D] transition-colors">
            Bộ Sưu Tập
          </Link>
          {product.categoryName && (
            <>
              <ChevronRight size={14} aria-hidden="true" />
              <Link
                href={`/products?category=${product.categorySlug || ""}`}
                className="hover:text-[#15095D] transition-colors"
              >
                {product.categoryName}
              </Link>
            </>
          )}
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" className="text-[#15095D] font-semibold">
            {product.name}
          </span>
        </nav>

        <NullProductDetailClient
          initialProduct={product}
          discountPercent={product.salePercent || 0}
        />
      </main>

      <NullFooter />
    </div>
  );
}
