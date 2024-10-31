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
        <body className="">{children}</body>
      </AuthProvider>
    </html>
  );
}
