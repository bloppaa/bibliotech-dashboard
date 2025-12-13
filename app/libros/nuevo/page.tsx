"use client";

import { LibroForm } from "@/components/LibroForm";
import { useRouter } from "next/navigation";

export default function CrearLibroPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
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
  };

  return (
    <LibroForm
      onSubmit={handleCreate}
      title="Agregar Nuevo Libro"
      submitLabel="Guardar Libro"
    />
  );
}
