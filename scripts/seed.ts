import mongoose from "mongoose";
import Libro from "../models/Libro";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Por favor define la variable de entorno MONGODB_URI");
}

const librosEjemplo = [
  {
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    isbn: "978-0307474728",
    categoria: "Ficción",
    editorial: "Sudamericana",
    anioPublicacion: 1967,
    numeroPaginas: 417,
    idioma: "Español",
    disponibles: 3,
    totalCopias: 5,
    prestamos: 127,
    rating: 4.8,
    descripcion:
      "Una obra maestra del realismo mágico que narra la historia de la familia Buendía.",
    fechaAdquisicion: new Date("2023-01-15"),
  },
  {
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    isbn: "978-8420412146",
    categoria: "Ficción",
    editorial: "Alfaguara",
    anioPublicacion: 1605,
    numeroPaginas: 863,
    idioma: "Español",
    disponibles: 2,
    totalCopias: 4,
    prestamos: 95,
    rating: 4.5,
    descripcion: "La obra cumbre de la literatura española y universal.",
    fechaAdquisicion: new Date("2023-02-10"),
  },
  {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    isbn: "978-0132350884",
    categoria: "Tecnología",
    editorial: "Prentice Hall",
    anioPublicacion: 2008,
    numeroPaginas: 464,
    idioma: "Inglés",
    disponibles: 5,
    totalCopias: 6,
    prestamos: 234,
    rating: 4.9,
    descripcion: "Guía completa para escribir código limpio y mantenible.",
    fechaAdquisicion: new Date("2023-03-20"),
  },
  {
    titulo: "Sapiens: De animales a dioses",
    autor: "Yuval Noah Harari",
    isbn: "978-0062316097",
    categoria: "Historia",
    editorial: "Debate",
    anioPublicacion: 2011,
    numeroPaginas: 512,
    idioma: "Español",
    disponibles: 4,
    totalCopias: 7,
    prestamos: 189,
    rating: 4.7,
    descripcion:
      "Breve historia de la humanidad desde la Edad de Piedra hasta hoy.",
    fechaAdquisicion: new Date("2023-04-05"),
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    isbn: "978-0451524935",
    categoria: "Ficción",
    editorial: "Signet Classics",
    anioPublicacion: 1949,
    numeroPaginas: 328,
    idioma: "Inglés",
    disponibles: 0,
    totalCopias: 4,
    prestamos: 201,
    rating: 4.6,
    descripcion:
      "Distopía totalitaria que explora temas de vigilancia y control.",
    fechaAdquisicion: new Date("2023-01-25"),
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    isbn: "978-0156012195",
    categoria: "Infantil",
    editorial: "Harcourt",
    anioPublicacion: 1943,
    numeroPaginas: 96,
    idioma: "Español",
    disponibles: 6,
    totalCopias: 8,
    prestamos: 156,
    rating: 4.9,
    descripcion: "Cuento poético sobre la amistad, el amor y la pérdida.",
    fechaAdquisicion: new Date("2023-02-14"),
  },
  {
    titulo: "Breve Historia del Tiempo",
    autor: "Stephen Hawking",
    isbn: "978-0553380163",
    categoria: "Ciencia",
    editorial: "Bantam",
    anioPublicacion: 1988,
    numeroPaginas: 256,
    idioma: "Inglés",
    disponibles: 3,
    totalCopias: 4,
    prestamos: 143,
    rating: 4.4,
    descripcion: "Explicación accesible de la cosmología y el universo.",
    fechaAdquisicion: new Date("2023-03-10"),
  },
  {
    titulo: "El Alquimista",
    autor: "Paulo Coelho",
    isbn: "978-0062315007",
    categoria: "Ficción",
    editorial: "HarperOne",
    anioPublicacion: 1988,
    numeroPaginas: 208,
    idioma: "Español",
    disponibles: 5,
    totalCopias: 6,
    prestamos: 178,
    rating: 4.3,
    descripcion: "Fábula sobre seguir tus sueños y encontrar tu destino.",
    fechaAdquisicion: new Date("2023-04-20"),
  },
  {
    titulo: "Crónica de una Muerte Anunciada",
    autor: "Gabriel García Márquez",
    isbn: "978-0307387981",
    categoria: "Ficción",
    editorial: "Vintage Español",
    anioPublicacion: 1981,
    numeroPaginas: 120,
    idioma: "Español",
    disponibles: 2,
    totalCopias: 3,
    prestamos: 89,
    rating: 4.2,
    descripcion: "Novela que reconstruye la historia de un asesinato.",
    fechaAdquisicion: new Date("2023-05-15"),
  },
  {
    titulo: "La Sombra del Viento",
    autor: "Carlos Ruiz Zafón",
    isbn: "978-0143034902",
    categoria: "Ficción",
    editorial: "Penguin Books",
    anioPublicacion: 2001,
    numeroPaginas: 487,
    idioma: "Español",
    disponibles: 4,
    totalCopias: 5,
    prestamos: 167,
    rating: 4.7,
    descripcion: "Misterio ambientado en la Barcelona de posguerra.",
    fechaAdquisicion: new Date("2023-06-01"),
  },
  {
    titulo: "Thinking, Fast and Slow",
    autor: "Daniel Kahneman",
    isbn: "978-0374533557",
    categoria: "No Ficción",
    editorial: "Farrar, Straus and Giroux",
    anioPublicacion: 2011,
    numeroPaginas: 499,
    idioma: "Inglés",
    disponibles: 3,
    totalCopias: 4,
    prestamos: 112,
    rating: 4.6,
    descripcion: "Explora los dos sistemas que rigen cómo pensamos.",
    fechaAdquisicion: new Date("2023-07-10"),
  },
  {
    titulo: "El Código Da Vinci",
    autor: "Dan Brown",
    isbn: "978-0307474278",
    categoria: "Ficción",
    editorial: "Anchor",
    anioPublicacion: 2003,
    numeroPaginas: 454,
    idioma: "Español",
    disponibles: 0,
    totalCopias: 5,
    prestamos: 221,
    rating: 4.1,
    descripcion: "Thriller que mezcla arte, historia y conspiraciones.",
    fechaAdquisicion: new Date("2023-08-05"),
  },
  {
    titulo: "La Odisea",
    autor: "Homero",
    isbn: "978-0140268867",
    categoria: "Ficción",
    editorial: "Penguin Classics",
    anioPublicacion: 1614,
    numeroPaginas: 541,
    idioma: "Español",
    disponibles: 3,
    totalCopias: 4,
    prestamos: 76,
    rating: 4.4,
    descripcion: "Poema épico griego sobre el viaje de Odiseo.",
    fechaAdquisicion: new Date("2023-09-12"),
  },
  {
    titulo: "El Arte de la Guerra",
    autor: "Sun Tzu",
    isbn: "978-1599869773",
    categoria: "Filosofía",
    editorial: "Pax Librorum",
    anioPublicacion: 1782,
    numeroPaginas: 273,
    idioma: "Español",
    disponibles: 5,
    totalCopias: 6,
    prestamos: 134,
    rating: 4.5,
    descripcion: "Tratado militar sobre estrategia y táctica.",
    fechaAdquisicion: new Date("2023-10-20"),
  },
  {
    titulo: "Harry Potter y la Piedra Filosofal",
    autor: "J.K. Rowling",
    isbn: "978-0439708180",
    categoria: "Juvenil",
    editorial: "Scholastic",
    anioPublicacion: 1997,
    numeroPaginas: 309,
    idioma: "Español",
    disponibles: 2,
    totalCopias: 8,
    prestamos: 298,
    rating: 4.8,
    descripcion: "Primera entrega de la saga del joven mago Harry Potter.",
    fechaAdquisicion: new Date("2023-11-01"),
  },
];

async function seed() {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado exitosamente");

    console.log("Limpiando colección de libros...");
    await Libro.deleteMany({});
    console.log("Colección limpiada");

    console.log("Insertando libros de ejemplo...");
    const librosCreados = await Libro.insertMany(librosEjemplo);
    console.log(`Libros insertados correctamente: ${librosCreados.length}`);

    console.log("\nResumen:");
    const categorias = await Libro.aggregate([
      { $group: { _id: "$categoria", cantidad: { $sum: 1 } } },
    ]);
    console.log("Libros por categoría:");
    categorias.forEach((cat) => {
      console.log(`  - ${cat._id}: ${cat.cantidad}`);
    });

    await mongoose.disconnect();
    console.log("\nSeed completado exitosamente");
  } catch (error) {
    console.error("Error en el seed:", error);
    process.exit(1);
  }
}

seed();
