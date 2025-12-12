import connectDB from "@/lib/mongodb";
import Libro from "@/models/Libro";
import { NextRequest, NextResponse } from "next/server";

// GET - Obtener todos los libros con filtros
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const busqueda = searchParams.get("busqueda") || "";
    const categoria = searchParams.get("categoria") || "";
    const idioma = searchParams.get("idioma") || "";
    const disponibilidad = searchParams.get("disponibilidad") || "todos";
    const ordenarPor = searchParams.get("ordenarPor") || "reciente";
    const orden = searchParams.get("orden") || "desc";

    // Construir query
    const query: any = {};

    if (busqueda) {
      query.$or = [
        { titulo: { $regex: busqueda, $options: "i" } },
        { autor: { $regex: busqueda, $options: "i" } },
        { descripcion: { $regex: busqueda, $options: "i" } },
      ];
    }

    if (categoria) {
      query.categoria = categoria;
    }

    if (idioma) {
      query.idioma = idioma;
    }

    if (disponibilidad === "disponibles") {
      query.disponibles = { $gt: 0 };
    } else if (disponibilidad === "prestados") {
      query.disponibles = 0;
    }

    // Ordenamiento
    const sortOptions: any = {};
    switch (ordenarPor) {
      case "titulo":
        sortOptions.titulo = orden === "asc" ? 1 : -1;
        break;
      case "autor":
        sortOptions.autor = orden === "asc" ? 1 : -1;
        break;
      case "prestamos":
        sortOptions.prestamos = orden === "asc" ? 1 : -1;
        break;
      case "rating":
        sortOptions.rating = orden === "asc" ? 1 : -1;
        break;
      default:
        sortOptions.createdAt = orden === "asc" ? 1 : -1;
    }

    const libros = await Libro.find(query).sort(sortOptions).lean();

    return NextResponse.json({ success: true, data: libros }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener libros" },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo libro
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Enforce default values as requested
    const newBookData = {
      ...body,
      disponibles: 0,
      prestamos: 0,
      rating: 0,
    };

    const libro = await Libro.create(newBookData);

    return NextResponse.json({ success: true, data: libro }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: Object.values(error.errors)
            .map((e: any) => e.message)
            .join(", "),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Error al crear libro" },
      { status: 400 }
    );
  }
}
