import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import Script from "next/script";
import ToastProvider from "@/components/ToastProvider";
// 이 파일에서 @는 src 폴더를 기준으로 폴더와 파일을 찾아간다는 뜻.

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Market",
  description: "MarketPlace Practice",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar currentUser={currentUser}/>
        <ToastProvider />
        {children}
        <Script          
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b4285441b6e657d3e419afdcf34ec35f&libraries=services,clusterer&autoload=false"
        />
      </body>
    </html>
  );
}
