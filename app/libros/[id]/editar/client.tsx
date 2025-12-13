"use client";

import { LibroForm } from "@/components/LibroForm";
import { Libro } from "@/types";
import { useRouter } from "next/navigation";

export default function EditLibroFormWrapper({ libro }: { libro: Libro }) {
  const router = useRouter();

  const handleUpdate = async (data: any) => {
    const response = await fetch(`/api/libros/${libro._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Error al actualizar el libro");
    }

    router.push(`/libros/${libro._id}`);
    router.refresh();
  };

  return (
    <LibroForm
      initialData={libro}
      onSubmit={handleUpdate}
      title="Editar Libro"
      submitLabel="Actualizar Libro"
    />
  );
}
