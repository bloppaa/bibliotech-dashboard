"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteBookButtonProps {
  id: string;
}

export function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/libros/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el libro");
      }

      router.push("/libros");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el libro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleDelete}
      disabled={loading}
      title="Eliminar libro"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
