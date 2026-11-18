"use client";

import { Suspense } from "react";
import NullCatalogClient from "@/components/null/NullCatalogClient";

export default function ProductsPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <NullCatalogClient />
    </Suspense>
  );
}
