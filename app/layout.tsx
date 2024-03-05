import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Lato } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] });
 
const lato = Lato({
    weight: '400',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: "Platform21",
    description: "Created by 21 Systems Lab",
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={lato.className}>{children}</body>
        </html>
    );
}
