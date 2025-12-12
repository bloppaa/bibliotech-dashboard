import * as dotenv from "dotenv";
import mongoose from "mongoose";
import Libro from "../models/Libro";

dotenv.config({ path: ".env.local" });
// Fallback for normal .env if local doesn't exist or is insufficient
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Por favor define la variable de entorno MONGODB_URI");
}

// Data definitions for the 6 specific categories
const categoryData: Record<string, { title: string; author: string }[]> = {
  Ficción: [
    { title: "Cien Años de Soledad", author: "Gabriel García Márquez" },
    { title: "Don Quijote de la Mancha", author: "Miguel de Cervantes" },
    { title: "1984", author: "George Orwell" },
    { title: "El Alquimista", author: "Paulo Coelho" },
    {
      title: "Crónica de una Muerte Anunciada",
      author: "Gabriel García Márquez",
    },
    { title: "La Sombra del Viento", author: "Carlos Ruiz Zafón" },
    { title: "El Código Da Vinci", author: "Dan Brown" },
    { title: "La Odisea", author: "Homero" },
    { title: "Fahrenheit 451", author: "Ray Bradbury" },
    { title: "El Gran Gatsby", author: "F. Scott Fitzgerald" },
    { title: "Matar a un Ruiseñor", author: "Harper Lee" },
    { title: "Orgullo y Prejuicio", author: "Jane Austen" },
    { title: "Crimen y Castigo", author: "Fiódor Dostoyevski" },
  ],
  Historia: [
    { title: "Sapiens: De animales a dioses", author: "Yuval Noah Harari" },
    { title: "Homo Deus", author: "Yuval Noah Harari" },
    { title: "Historia del Siglo XX", author: "Eric Hobsbawm" },
    { title: "Los Cañones de Agosto", author: "Barbara Tuchman" },
    { title: "SPQR: Una Historia de la Antigua Roma", author: "Mary Beard" },
    { title: "La Segunda Guerra Mundial", author: "Antony Beevor" },
    { title: "El Diario de Ana Frank", author: "Ana Frank" },
    { title: "Guns, Germs, and Steel", author: "Jared Diamond" },
    {
      title: "Imperiofobia y Leyenda Negra",
      author: "María Elvira Roca Barea",
    },
    { title: "Breve Historia del Mundo", author: "Ernst Gombrich" },
    { title: "La Guerra del Peloponeso", author: "Tucídides" },
  ],
  Infantil: [
    { title: "El Principito", author: "Antoine de Saint-Exupéry" },
    { title: "Donde Viven los Monstruos", author: "Maurice Sendak" },
    { title: "Alicia en el País de las Maravillas", author: "Lewis Carroll" },
    { title: "Harry Potter y la Piedra Filosofal", author: "J.K. Rowling" },
    { title: "Matilda", author: "Roald Dahl" },
    { title: "Charlie y la Fábrica de Chocolate", author: "Roald Dahl" },
    { title: "Cuentos de la Selva", author: "Horacio Quiroga" },
    { title: "El León, la Bruja y el Armario", author: "C.S. Lewis" },
    { title: "Winnie the Pooh", author: "A.A. Milne" },
    { title: "El Gato con Sombrero", author: "Dr. Seuss" },
    { title: "Papelucho", author: "Marcela Paz" },
    { title: "Pinocho", author: "Carlo Collodi" },
  ],
  Ciencia: [
    { title: "Breve Historia del Tiempo", author: "Stephen Hawking" },
    { title: "Cosmos", author: "Carl Sagan" },
    { title: "El Gen Egoísta", author: "Richard Dawkins" },
    { title: "El Origen de las Especies", author: "Charles Darwin" },
    { title: "Una Breve Historia de Casi Todo", author: "Bill Bryson" },
    {
      title: "Astrophysics for People in a Hurry",
      author: "Neil deGrasse Tyson",
    },
    { title: "El Universo en una Cáscara de Nuez", author: "Stephen Hawking" },
    {
      title: "La Estructura de las Revoluciones Científicas",
      author: "Thomas Kuhn",
    },
    { title: "Primavera Silenciosa", author: "Rachel Carson" },
    { title: "El Gen: Una Historia Íntima", author: "Siddhartha Mukherjee" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
  ],
  Filosofía: [
    { title: "El Arte de la Guerra", author: "Sun Tzu" },
    { title: "Meditaciones", author: "Marco Aurelio" },
    { title: "Así habló Zaratustra", author: "Friedrich Nietzsche" },
    { title: "La República", author: "Platón" },
    { title: "Crítica de la Razón Pura", author: "Immanuel Kant" },
    { title: "El Mundo de Sofía", author: "Jostein Gaarder" },
    { title: "Ética a Nicómaco", author: "Aristóteles" },
    { title: "El Mito de Sísifo", author: "Albert Camus" },
    { title: "Más allá del Bien y del Mal", author: "Friedrich Nietzsche" },
    { title: "El Contrato Social", author: "Jean-Jacques Rousseau" },
    { title: "Tao Te Ching", author: "Lao-Tzu" },
  ],
  Tecnología: [
    { title: "Clean Code", author: "Robert C. Martin" },
    { title: "Design Patterns", author: "Erich Gamma et al." },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt" },
    { title: "Refactoring", author: "Martin Fowler" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
    { title: "The Mythical Man-Month", author: "Fred Brooks" },
    { title: "Code Complete", author: "Steve McConnell" },
    { title: "You Don't Know JS", author: "Kyle Simpson" },
    {
      title: "Patterns of Enterprise Application Architecture",
      author: "Martin Fowler",
    },
    { title: "Domain-Driven Design", author: "Eric Evans" },
    { title: "The Phoenix Project", author: "Gene Kim" },
    { title: "Sprint", author: "Jake Knapp" },
    { title: "Life 3.0", author: "Max Tegmark" },
    { title: "Superintelligence", author: "Nick Bostrom" },
  ],
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function generateBooks() {
  const books: any[] = [];
  const editorials = [
    "Planeta",
    "Alfaguara",
    "Penguin",
    "O'Reilly",
    "Debate",
    "Anagrama",
    "Cátedra",
  ];
  const languages = ["Español", "Inglés"]; // Majority Spanish

  Object.entries(categoryData).forEach(([category, items]) => {
    items.forEach((item) => {
      const isSpanish = Math.random() > 0.3; // 70% chance of Spanish
      const totalCopias = getRandomInt(3, 15);
      // Non-uniform available copies
      const disponibles = getRandomInt(0, totalCopias);
      const prestamos = getRandomInt(10, 500); // Varied popularity
      const rating = getRandomFloat(3.5, 5.0); // Skewed positive

      books.push({
        titulo: item.title,
        autor: item.author,
        isbn: `978-${getRandomInt(1000000000, 9999999999)}`,
        categoria: category,
        editorial: editorials[getRandomInt(0, editorials.length - 1)],
        anioPublicacion: getRandomInt(1950, 2023),
        numeroPaginas: getRandomInt(150, 900),
        idioma: isSpanish ? "Español" : "Inglés",
        disponibles: disponibles,
        totalCopias: totalCopias,
        prestamos: prestamos,
        rating: rating,
        descripcion: `Una obra fundamental de la categoría ${category} escrita por ${item.author}.`,
        fechaAdquisicion: new Date(
          2023,
          getRandomInt(0, 11),
          getRandomInt(1, 28)
        ),
      });
    });
  });

  return books;
}

async function seed() {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado exitosamente");

    console.log("Limpiando colección de libros...");
    await Libro.deleteMany({});
    console.log("Colección limpiada todos los libros eliminados.");

    console.log("Generando nueva data...");
    const librosToInsert = generateBooks();

    console.log(`Insertando ${librosToInsert.length} libros...`);
    await Libro.insertMany(librosToInsert);

    console.log("\nResumen actual en BD:");
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
