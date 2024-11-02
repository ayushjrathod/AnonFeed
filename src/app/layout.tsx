import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="{popins.className}">
          {/* <DarkModeToggle /> */}
          {/* <Navbar /> */}
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
