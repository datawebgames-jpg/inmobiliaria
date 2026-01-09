import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vesta Habitat | Tu Inmobiliaria Digital",
  description: "Encuentra el hogar de tus sueños",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Aquí puedes poner un Navbar global más adelante */}
        {children}
      </body>
    </html>
  );
}