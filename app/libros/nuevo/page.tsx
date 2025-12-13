"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIAS = [
  "Ficción",
  "Historia",
  "Infantil",
  "Ciencia",
  "Filosofía",
  "Tecnología",
];

const IDIOMAS = ["Español", "Inglés"];

export default function CrearLibroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      titulo: formData.get("titulo"),
      autor: formData.get("autor"),
      isbn: formData.get("isbn"),
      categoria: formData.get("categoria"),
      editorial: formData.get("editorial"),
      anioPublicacion: parseInt(formData.get("anioPublicacion") as string),
      numeroPaginas: parseInt(formData.get("numeroPaginas") as string),
      idioma: formData.get("idioma"),
      totalCopias: parseInt(formData.get("totalCopias") as string),
      descripcion: formData.get("descripcion"),
      fechaAdquisicion: formData.get("fechaAdquisicion")
        ? new Date(formData.get("fechaAdquisicion") as string)
        : new Date(),
    };

    try {
      const response = await fetch("/api/libros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al crear el libro");
      }

      router.push("/libros");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agregar Nuevo Libro</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Libro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  name="titulo"
                  required
                  placeholder="Ej: Cien Años de Soledad"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Autor</label>
                <Input
                  name="autor"
                  required
                  placeholder="Ej: Gabriel García Márquez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ISBN</label>
                <Input name="isbn" required placeholder="978-..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Editorial</label>
                <Input name="editorial" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <select
                  name="categoria"
                  required
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">Seleccionar categoría...</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Idioma</label>
                <select
                  name="idioma"
                  required
                  defaultValue="Español"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {IDIOMAS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Año Publicación</label>
                <Input
                  name="anioPublicacion"
                  type="number"
                  required
                  min="1000"
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nº Páginas</label>
                <Input name="numeroPaginas" type="number" required min="1" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha Adquisición</label>
                <Input
                  name="fechaAdquisicion"
                  type="date"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Copias</label>
                <Input name="totalCopias" type="number" required min="0" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                name="descripcion"
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Breve descripción del libro..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Libro"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
