import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          {/* <DarkModeToggle /> */}
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
