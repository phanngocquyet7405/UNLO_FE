"use client";
// components/layout/category/category_base_layout.jsx

import React from "react";
import MainHeader from "../../ui/main_header";
import NavMenu from "../../ui/nav_menu";
import TotMartSupport from "../totmart_suppport";
import Footer from "../../ui/footer";
import CategorySidebar from "./category_sidebar";
import HeroSectionProduct from "../../hero_section_page/hero_section_products";

export default function CategoryBaseLayout({ children, categoryId }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Tái cấu trúc Header giống ProductPage */}
      <MainHeader />
      <div className="border-b border-border">
        <NavMenu />
      </div>
      <div className="container mx-auto px-4 pt-8">
        <HeroSectionProduct type="category" id={categoryId} />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CategorySidebar currentId={categoryId} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <TotMartSupport />
      <Footer />
    </div>
  );
}
