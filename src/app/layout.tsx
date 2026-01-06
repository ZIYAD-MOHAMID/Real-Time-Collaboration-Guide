import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "نرسم مع بعض",
  description:
    "تطبيق نرسم مع بعض للرسم التعاوني عبر الإنترنت والتخطيط المتين جدا جدا جدا",
  icons: [{ rel: "png", url: "/src/app/art.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
