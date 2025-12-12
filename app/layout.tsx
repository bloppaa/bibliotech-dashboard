import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { BookOpen, LayoutDashboard, Library } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BiblioTech - Sistema de Gestión de Biblioteca",
  description:
    "Dashboard moderno para gestión de biblioteca con visualización de datos en tiempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <Link href="/" className="flex items-center space-x-2">
                    <Library className="h-8 w-8 text-purple-600" />
                    <span className="text-xl font-bold text-gray-900">
                      BiblioTech
                    </span>
                  </Link>

                  <nav className="flex space-x-1">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <Link
                      href="/libros"
                      className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="hidden sm:inline">Catálogo</span>
                    </Link>
                  </nav>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-gray-600 text-sm">
                  © 2025 BiblioTech. Sistema de Gestión de Biblioteca - Proyecto
                  Universitario
                </p>
              </div>
            </footer>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
