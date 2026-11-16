import { useState } from "react";
import type { FormEvent } from "react";
import {
  useDeleteCourseMutation,
  useCreateCourseMutation,
  useGetCoursesQuery,
} from "../../app/api";

export function AdminPage() {
  const { data: courses = [], isLoading } = useGetCoursesQuery();
  // Una mutation devuelve [la función que la lanza, su estado]
  const [createCourse, { isLoading: creating }] = useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  // El formulario "Nuevo curso"
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programación");
  const [price, setPrice] = useState("100");

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === "") return;
    await createCourse({
      title: title.trim(),
      category,
      price: Number(price), // el input da un texto
      hours: 20,
      seats: 20,
      description: "",
    }).unwrap(); // si la API falla, lanza un error
    setTitle("");
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <h1>Panel de administración</h1>
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>{course.price} €</td>
              <td>
                <button onClick={() => deleteCourse(course.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={save}>
        <h2>Nuevo curso</h2>
        <label htmlFor="title">Título</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="category">Categoría</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Programación</option>
          <option>Diseño</option>
          <option>Idiomas</option>
          <option>Ofimática</option>
        </select>
        <label htmlFor="price">Precio (€)</label>
        <input
          id="price"
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" disabled={creating}>
          {creating ? "Guardando..." : "Guardar curso"}
        </button>
      </form>
    </>
  );
}
