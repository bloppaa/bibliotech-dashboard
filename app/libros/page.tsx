"use client";

import { FiltrosLibros } from "@/components/FiltrosLibros";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/redux/store";
import { Libro } from "@/types";
import { BookOpen, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const filtros = useAppSelector((state) => state.filtros);

  useEffect(() => {
    fetchLibros();
  }, [filtros]);

  const fetchLibros = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filtros.busqueda) params.append("busqueda", filtros.busqueda);
      if (filtros.categoria) params.append("categoria", filtros.categoria);
      if (filtros.idioma) params.append("idioma", filtros.idioma);
      if (filtros.disponibilidad)
        params.append("disponibilidad", filtros.disponibilidad);
      if (filtros.ordenarPor) params.append("ordenarPor", filtros.ordenarPor);
      if (filtros.orden) params.append("orden", filtros.orden);

      const response = await fetch(`/api/libros?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setLibros(result.data);
      }
    } catch (error) {
      console.error("Error fetching libros:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de Libros</h1>
          <p className="text-muted-foreground mt-1">
            Explora nuestra colección completa
          </p>
        </div>
        <Button asChild>
          <Link href="/libros/nuevo">Agregar Libro</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtros - Columna lateral en desktop */}
        <div className="lg:col-span-1">
          <FiltrosLibros />
        </div>

        {/* Listado de Libros */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                {libros.length}{" "}
                {libros.length === 1
                  ? "libro encontrado"
                  : "libros encontrados"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {libros.map((libro) => (
                  <Card
                    key={libro._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">
                            {libro.titulo}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {libro.autor}
                          </p>
                        </div>
                        <BookOpen className="h-8 w-8 text-purple-600 shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">
                          {libro.rating.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {libro.categoria}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {libro.idioma}
                        </span>
                      </div>

                      <div className="pt-2 flex justify-between items-center text-sm">
                        <span
                          className={
                            libro.disponibles > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {libro.disponibles > 0
                            ? `${libro.disponibles} disponibles`
                            : "No disponible"}
                        </span>
                        <span className="text-muted-foreground">
                          {libro.prestamos} préstamos
                        </span>
                      </div>

                      <Button variant="outline" className="w-full mt-2" asChild>
                        <Link href={`/libros/${libro._id}`}>Ver Detalles</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {libros.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No se encontraron libros
                  </h3>
                  <p className="text-muted-foreground">
                    Intenta ajustar los filtros o la búsqueda
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
