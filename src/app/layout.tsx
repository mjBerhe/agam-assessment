import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Raleway } from "next/font/google";

import { type Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Agam Assessment",
  description: "Agam Assessment",
  // icons: [{ rel: "icon", url: "" }],
};

const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.className}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
