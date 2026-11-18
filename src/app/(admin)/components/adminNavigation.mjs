import {
  Gift,
  LayoutDashboard,
  Truck,
  ShoppingCart,
  ClipboardList,
  Users,
  Tags,
  FolderTree,
  User,
  Package,
  PlusCircle,
  Album,
  LayersPlus,
  CreditCard,
  Boxes,
  Megaphone,
  Sparkles,
  Building2,
  RefreshCw,
} from "lucide-react";

export const adminNavigation = [
  { label: "Tổng quan Unit Economics", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Gom đơn / Pre-Order", icon: Megaphone, href: "/admin-campaigns" },
  { label: "Hàng đợi Cá nhân hóa", icon: Sparkles, href: "/admin-personalization" },
  { label: "Báo giá B2B", icon: Building2, href: "/admin-b2b" },
  { label: "Đổi Size / RMA", icon: RefreshCw, href: "/admin-returns" },
  {
    label: "Sản phẩm & Biến thể",
    icon: ShoppingCart,
    children: [
      { label: "Danh sách", icon: Package, href: "/admin-products" },
      { label: "Thêm mới", icon: PlusCircle, href: "/admin-products/create" },
    ],
  },
  { label: "Đơn hàng", icon: ClipboardList, href: "/admin-orders" },
  { label: "Giao hàng & đối soát", icon: Truck, href: "/admin-operations" },
  {
    label: "Xưởng OEM/ODM",
    icon: Tags,
    children: [
      { label: "Danh sách", icon: Album, href: "/admin-brands" },
      { label: "Thêm mới", icon: LayersPlus, href: "/admin-brands/create" },
    ],
  },
  {
    label: "Danh mục",
    icon: FolderTree,
    children: [
      { label: "Danh sách", icon: Album, href: "/admin-categories" },
      { label: "Thêm mới", icon: LayersPlus, href: "/admin-categories/create" },
    ],
  },
  {
    label: "Capsule Bundle",
    icon: Boxes,
    children: [
      { label: "Danh sách", icon: Album, href: "/admin-box" },
      { label: "Thêm mới", icon: LayersPlus, href: "/admin-box/create" },
    ],
  },
  { label: "Quà tặng", icon: Gift, href: "/admin-gifts" },
  {
    label: "Gói định kỳ (Quý)",
    icon: CreditCard,
    children: [
      { label: "Danh sách các gói", icon: Album, href: "/admin-subscribe-plan" },
      { label: "Các gói đăng ký", icon: Album, href: "/admin-subscribe-plan/registered" },
    ],
  },
  { label: "Người dùng", icon: Users, href: "/admin-users" },
  { label: "Hồ sơ cá nhân", icon: User, href: "/profile" },
];
