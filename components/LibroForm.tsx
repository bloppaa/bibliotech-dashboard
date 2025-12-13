"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CATEGORIAS, IDIOMAS } from "@/lib/constants";
import { Libro } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LibroFormProps {
  initialData?: Partial<Libro>;
  onSubmit: (data: any) => Promise<void>;
  title: string;
  submitLabel: string;
}

export function LibroForm({
  initialData,
  onSubmit,
  title,
  submitLabel,
}: LibroFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for inventory validation logic
  const [totalCopias, setTotalCopias] = useState(initialData?.totalCopias || 0);
  const [disponibles, setDisponibles] = useState(initialData?.disponibles || 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data: any = {
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

    // If editing, include fields that might be controlled separately or hidden in creation
    if (initialData) {
      data.disponibles = parseInt(formData.get("disponibles") as string);
      // Ensure disponibles doesn't exceed totalCopias
      if (data.disponibles > data.totalCopias) {
        setError(
          "La cantidad disponible no puede ser mayor al total de copias."
        );
        setLoading(false);
        return;
      }
    } else {
      // For new books, usually disponibles = totalCopias, but API currently sets to 0.
      // We will let the API handle creation defaults unless we want to override.
      // However, if we want the user to specify it:
      // The current 'nuevo' page only asks for totalCopias.
    }

    try {
      await onSubmit(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!initialData;

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalCopias(parseInt(e.target.value) || 0);
  };

  const handleDisponiblesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisponibles(parseInt(e.target.value) || 0);
  };

  const adjustDisponibles = (delta: number) => {
    const newVal = disponibles + delta;
    if (newVal >= 0 && newVal <= totalCopias) {
      setDisponibles(newVal);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button variant="outline" onClick={() => router.back()} type="button">
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
                  defaultValue={initialData?.titulo}
                  placeholder="Ej: Cien Años de Soledad"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Autor</label>
                <Input
                  name="autor"
                  required
                  defaultValue={initialData?.autor}
                  placeholder="Ej: Gabriel García Márquez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ISBN</label>
                <Input
                  name="isbn"
                  required
                  defaultValue={initialData?.isbn}
                  placeholder="978-..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Editorial</label>
                <Input
                  name="editorial"
                  required
                  defaultValue={initialData?.editorial}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <select
                  name="categoria"
                  required
                  defaultValue={initialData?.categoria || ""}
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
                  defaultValue={initialData?.idioma || "Español"}
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
                  defaultValue={initialData?.anioPublicacion}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nº Páginas</label>
                <Input
                  name="numeroPaginas"
                  type="number"
                  required
                  min="1"
                  defaultValue={initialData?.numeroPaginas}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha Adquisición</label>
                <Input
                  name="fechaAdquisicion"
                  type="date"
                  required
                  defaultValue={
                    initialData?.fechaAdquisicion
                      ? new Date(initialData.fechaAdquisicion)
                          .toISOString()
                          .split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>

            {/* Inventory Management Section */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-semibold mb-3 text-slate-800">
                Gestión de Inventario
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Copias</label>
                  <Input
                    name="totalCopias"
                    type="number"
                    required
                    min="0"
                    value={totalCopias}
                    onChange={handleTotalChange}
                  />
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Disponibles</label>
                    <div className="flex space-x-2">
                      <Input
                        name="disponibles"
                        type="number"
                        required
                        min="0"
                        max={totalCopias}
                        value={disponibles}
                        onChange={handleDisponiblesChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => adjustDisponibles(-1)}
                        title="Registrar Préstamo"
                        className="px-3"
                      >
                        -1
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => adjustDisponibles(1)}
                        title="Registrar Devolución"
                        className="px-3"
                      >
                        +1
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Usa -1 para prestar y +1 para devolver.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                name="descripcion"
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Breve descripción del libro..."
                defaultValue={initialData?.descripcion}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Guardando..." : submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
