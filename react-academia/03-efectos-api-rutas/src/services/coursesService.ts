const API_URL = "http://localhost:3001"; // en la sesión 5 irá a una variable de entorno

export type Course = {
  id: string;
  title: string;
  category: string;
  hours: number;
  price: number;
  seats: number;
  description: string;
};

// Lo que enviamos para crear una inscripción
export type NewEnrollment = {
  courseId: string;
  name: string;
  email: string;
  mode: string;
};

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_URL}/courses`); // pide los cursos
  if (!response.ok) {
    // ok es true si el código está entre 200 y 299
    throw new Error(`Error ${response.status} al cargar los cursos`);
  }
  return response.json(); // convierte el body en objetos
}

export async function getCourse(id: string): Promise<Course> {
  const response = await fetch(`${API_URL}/courses/${id}`);
  if (!response.ok) {
    throw new Error(response.status === 404 ? "Ese curso no existe" : `Error ${response.status}`);
  }
  return response.json();
}

export async function createEnrollment(enrollment: NewEnrollment) {
  const response = await fetch(`${API_URL}/enrollments`, {
    method: "POST", // crear
    headers: { "Content-Type": "application/json" }, // le decimos que enviamos JSON
    body: JSON.stringify(enrollment), // el objeto, convertido a texto
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status} al enviar la inscripción`);
  }
  return response.json();
}
