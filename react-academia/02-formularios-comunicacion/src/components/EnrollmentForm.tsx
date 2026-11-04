import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// Los campos del formulario
type EnrollmentFormData = {
  name: string;
  email: string;
  course: string;
  mode: string;
  accepted: boolean;
};

// Cómo empieza el formulario: vacío
const initialData: EnrollmentFormData = {
  name: "",
  email: "",
  course: "",
  mode: "onsite",
  accepted: false,
};

// Un mensaje por campo. El ? = si el campo está bien, no hay mensaje
type FormErrors = {
  name?: string;
  email?: string;
  course?: string;
  accepted?: string;
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
  if (!data.accepted) {
    errors.accepted = "Tienes que aceptar las condiciones.";
  }

  return errors;
}

export function EnrollmentForm() {
  const [data, setData] = useState<EnrollmentFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({}); // empieza sin errores
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null); // guardará el input del nombre

  // Una sola función para todos los campos de texto, select y radio
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target; // qué campo y qué valor
    setData({ ...data, [name]: value }); // copia todo y cambia solo ese campo
  }

  // El checkbox se lee con checked (true/false), no con value
  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setData({ ...data, accepted: e.target.checked });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // no recargues la página
    const newErrors = validate(data);
    setErrors(newErrors);

    // Si hay algún error, paramos aquí
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) {
        nameRef.current?.focus(); // pon el cursor en el nombre
      }
      return;
    }

    console.log("Inscripción enviada:", data);
    setSent(true);
    setData(initialData); // vacía el formulario
  }

  return (
    <form onSubmit={submit} noValidate>
      <h2>Inscripción</h2>
      {sent && <p role="status">¡Inscripción enviada!</p>}

      <label htmlFor="name">Nombre *</label>
      <input id="name" name="name" ref={nameRef} value={data.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="email">Email *</label>
      <input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="course">Curso *</label>
      <select id="course" name="course" value={data.course} onChange={handleChange}>
        <option value="">Elige un curso</option>
        <option value="1">Introducción a la programación con JavaScript</option>
        <option value="2">HTML y CSS desde cero</option>
        <option value="6">Bases de datos con SQL</option>
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

      <label>
        <input type="checkbox" checked={data.accepted} onChange={handleCheckboxChange} />
        Acepto las condiciones *
      </label>
      {errors.accepted && <p className="error">{errors.accepted}</p>}

      <button type="submit">Enviar inscripción</button>
    </form>
  );
}
