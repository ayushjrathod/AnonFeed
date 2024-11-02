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
      <body className="{popins.className}">
        <AuthProvider>
          {/* <DarkModeToggle /> */}
          {/* <Navbar /> */}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
