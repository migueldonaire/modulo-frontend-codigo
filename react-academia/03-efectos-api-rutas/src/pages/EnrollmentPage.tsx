import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useCourses } from "../hooks/useCourses";
import { useMyCourses } from "../context/MyCoursesContext";
import { createEnrollment } from "../services/coursesService";

// Los campos del formulario
type EnrollmentFormData = {
  name: string;
  email: string;
  course: string;
  mode: string;
};

// Un mensaje por campo. El ? = si el campo está bien, no hay mensaje
type FormErrors = {
  name?: string;
  email?: string;
  course?: string;
};

// Recibe los datos y devuelve los errores
function validate(data: EnrollmentFormData): FormErrors {
  const errors: FormErrors = {};

  if (data.name.trim() === "") {
    errors.name = "Escribe tu nombre.";
  }
  // algo, una @, algo, un punto y algo
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "El email no tiene un formato válido.";
  }
  if (data.course === "") {
    errors.course = "Elige un curso.";
  }

  return errors;
}

export function EnrollmentPage() {
  const { courses } = useCourses(); // para el select
  const { add } = useMyCourses();
  const [searchParams] = useSearchParams(); // lo que va después de ? en la URL
  const navigate = useNavigate(); // para cambiar de página desde el código

  const [data, setData] = useState<EnrollmentFormData>({
    name: "",
    email: "",
    course: searchParams.get("course") ?? "", // /enrollment?course=6 → "6"
    mode: "onsite",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false); // ¿se está enviando?
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Una sola función para todos los campos
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validate(data);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSending(true); // desactiva el botón
    setSubmitError(null);
    try {
      await createEnrollment({
        courseId: data.course,
        name: data.name,
        email: data.email,
        mode: data.mode,
      });
      add(data.course); // el curso pasa también a Mis cursos
      navigate("/my-courses"); // vamos a otra página
    } catch (error) {
      setSubmitError((error as Error).message); // la API ha fallado
    } finally {
      setSending(false); // vuelve a activar el botón, vaya bien o mal
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <h1>Inscripción</h1>
      {submitError && <p className="error">{submitError}</p>}

      <label htmlFor="name">Nombre *</label>
      <input id="name" name="name" value={data.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="email">Email *</label>
      <input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="course">Curso *</label>
      <select id="course" name="course" value={data.course} onChange={handleChange}>
        <option value="">Elige un curso</option>
        {/* las opciones salen de la API */}
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
      {errors.course && <p className="error">{errors.course}</p>}

      <fieldset>
        <legend>Modalidad</legend>
        <label>
          <input type="radio" name="mode" value="onsite" checked={data.mode === "onsite"} onChange={handleChange} />
          Presencial
        </label>
        <label>
          <input type="radio" name="mode" value="online" checked={data.mode === "online"} onChange={handleChange} />
          Online
        </label>
      </fieldset>

      <button type="submit" disabled={sending}>
        {sending ? "Enviando..." : "Enviar inscripción"}
      </button>
    </form>
  );
}
