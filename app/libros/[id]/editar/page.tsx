import connectDB from "@/lib/mongodb";
import LibroModel from "@/models/Libro";
import { notFound } from "next/navigation";
import EditLibroFormWrapper from "./client";

async function getLibro(id: string) {
  await connectDB();
  try {
    const libro = await LibroModel.findById(id).lean();
    if (!libro) return null;
    return JSON.parse(JSON.stringify(libro));
  } catch (error) {
    return null;
  }
}

export default async function EditarLibroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const libro = await getLibro(id);

  if (!libro) {
    notFound();
  }

  return <EditLibroFormWrapper libro={libro} />;
}
