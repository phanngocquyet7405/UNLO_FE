import "@fontsource/plus-jakarta-sans/latin-400.css";
import "@fontsource/plus-jakarta-sans/vietnamese-400.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "@fontsource/plus-jakarta-sans/vietnamese-700.css";
import { Libre_Bodoni, Climate_Crisis, Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import { AppContextProvider } from "./context/AppContext";
import { CartProvider } from "@/app/context/CartContext";
import { WishlistProvider } from "@/app/context/WishlistContext";
import "./globals.css";
import "./commerce.css";

const libreBodoni = Libre_Bodoni({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-bodoni",
  display: "swap",
});

const climateCrisis = Climate_Crisis({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-climate-crisis",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata = {
  title: "UNLO — Brandless M2C | Chuẩn Xuất Khẩu, Giá Thực Tại Xưởng",
  description:
    "Nền tảng Brandless M2C kết nối trực tiếp 4 nhà máy Tier-1 OEM Việt Nam — minh bạch bóc tách giá thành, Hộ chiếu nhà máy, Smart Fit Finder và đổi trả miễn phí 30 ngày.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${libreBodoni.variable} ${climateCrisis.variable} ${greatVibes.variable}`}
      style={{
        "--font-serif": "var(--font-libre-bodoni), 'Libre Bodoni', Georgia, serif",
        "--font-display": "var(--font-climate-crisis), 'Climate Crisis', sans-serif",
        "--font-script": "var(--font-great-vibes), 'Great Vibes', cursive",
        "--font-sans": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppContextProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: "#15095D",
                      color: "#FCFDF1",
                      border: "1px solid #443EB1",
                    },
                  }}
                />
              </WishlistProvider>
            </CartProvider>
          </AppContextProvider>
        </NextIntlClientProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
