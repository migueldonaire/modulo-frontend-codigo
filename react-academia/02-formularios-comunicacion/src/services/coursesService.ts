// Así es un curso
export type Course = {
  id: string; // texto ("1"): así lo devolverá la API más adelante
  title: string;
  category: string;
  hours: number;
  price: number;
  seats: number;
};

// De momento, los cursos escritos a mano
const courses: Course[] = [
  { id: "1", title: "Introducción a la programación con JavaScript", category: "Programación", hours: 60, price: 180, seats: 3 },
  { id: "2", title: "HTML y CSS desde cero", category: "Programación", hours: 40, price: 120, seats: 12 },
  { id: "3", title: "Diseño de interfaces con Figma", category: "Diseño", hours: 30, price: 150, seats: 8 },
  { id: "4", title: "Inglés técnico para informática", category: "Idiomas", hours: 50, price: 140, seats: 15 },
  { id: "5", title: "Excel avanzado", category: "Ofimática", hours: 25, price: 90, seats: 2 },
  { id: "6", title: "Bases de datos con SQL", category: "Programación", hours: 45, price: 160, seats: 10 },
];

export function getCourses(): Course[] {
  return courses;
}
