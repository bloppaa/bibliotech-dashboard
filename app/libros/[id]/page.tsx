import { DeleteBookButton } from "@/components/DeleteBookButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import connectDB from "@/lib/mongodb";
import Libro from "@/models/Libro";
import {
  ArrowLeft,
  Book,
  Calendar,
  Globe,
  Layers,
  Library,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getLibro(id: string) {
  await connectDB();

  try {
    const libro = await Libro.findById(id).lean();
    if (!libro) return null;
    return JSON.parse(JSON.stringify(libro));
  } catch (error) {
    return null;
  }
}

export default async function DetalleLibroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const libro = await getLibro(id);

  if (!libro) {
    notFound();
  }

  const isDisponible = libro.disponibles > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/libros">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Detalles del Libro
          </h1>
        </div>
        <DeleteBookButton id={libro._id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna Izquierda: Portada y Status */}
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden border-2">
            <CardContent className="p-6">
              <div
                className={`text-center p-3 rounded-lg font-semibold ${
                  isDisponible
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isDisponible ? "Disponible" : "No Disponible"}
                <div className="text-sm font-normal mt-1 opacity-80">
                  {libro.disponibles} de {libro.totalCopias} copias
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Información detallada */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                    {libro.categoria}
                  </div>
                  <CardTitle className="text-3xl sm:text-4xl">
                    {libro.titulo}
                  </CardTitle>
                  <div className="flex items-center text-xl text-gray-600">
                    <User className="h-5 w-5 mr-2" />
                    {libro.autor}
                  </div>
                </div>
                {libro.rating > 0 && (
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-bold text-yellow-700">
                      {libro.rating}
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">
                  {libro.descripcion ||
                    "No hay descripción disponible para este libro."}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Library className="h-4 w-4 mr-1.5" />
                    Editorial
                  </div>
                  <p className="font-medium text-gray-900">{libro.editorial}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Año
                  </div>
                  <p className="font-medium text-gray-900">
                    {libro.anioPublicacion}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Layers className="h-4 w-4 mr-1.5" />
                    Páginas
                  </div>
                  <p className="font-medium text-gray-900">
                    {libro.numeroPaginas}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="h-4 w-4 mr-1.5" />
                    Idioma
                  </div>
                  <p className="font-medium text-gray-900">{libro.idioma}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Book className="h-4 w-4 mr-1.5" />
                    ISBN
                  </div>
                  <p
                    className="font-mono text-sm text-gray-900 truncate"
                    title={libro.isbn}
                  >
                    {libro.isbn}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
