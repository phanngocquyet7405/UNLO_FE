"use client";

import Link from "next/link";
import { Home, ShoppingBag, UserCircle, Package, ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileTabs({ profileContent, addressContent, cartContent }) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto w-full gap-1.5 sm:gap-2 bg-muted/60 p-1.5 rounded-2xl border border-border">
        <TabsTrigger
          value="profile"
          className="min-h-11 h-auto py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center text-center leading-tight whitespace-normal data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground transition-all"
        >
          <UserCircle className="mr-1.5 h-4 w-4 shrink-0 text-[#15095D]" />
          <span>Hồ sơ cá nhân</span>
        </TabsTrigger>

        <Link
          href="/profile/orders"
          className="min-h-11 h-auto py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center text-center leading-tight whitespace-normal text-muted-foreground hover:text-foreground hover:bg-card/80 transition-all cursor-pointer border border-transparent hover:border-border/60"
        >
          <Package className="mr-1.5 h-4 w-4 shrink-0 text-[#EB6D48]" />
          <span>Thông tin đơn hàng</span>
          <ArrowUpRight className="ml-1 h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-70" />
        </Link>

        <TabsTrigger
          value="addresses"
          className="min-h-11 h-auto py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center text-center leading-tight whitespace-normal data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground transition-all"
        >
          <Home className="mr-1.5 h-4 w-4 shrink-0 text-[#32259B]" />
          <span>Sổ địa chỉ</span>
        </TabsTrigger>

        <TabsTrigger
          value="cart"
          className="min-h-11 h-auto py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center text-center leading-tight whitespace-normal data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground transition-all"
        >
          <ShoppingBag className="mr-1.5 h-4 w-4 shrink-0 text-[#1D7A5F]" />
          <span>Giỏ hàng</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        {profileContent}
      </TabsContent>
      <TabsContent value="addresses" className="mt-6">
        {addressContent}
      </TabsContent>
      <TabsContent value="cart" className="mt-6">
        {cartContent}
      </TabsContent>
    </Tabs>
  );
}
