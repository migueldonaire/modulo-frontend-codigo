import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Cómo tienen que ser los datos, y el mensaje si no lo son
const schema = z.object({
  name: z.string().trim().min(1, "Escribe tu nombre."),
  email: z.email("El email no tiene un formato válido."),
  course: z.string().min(1, "Elige un curso."),
  mode: z.enum(["onsite", "online"]), // uno de estos dos
  accepted: z.literal(true, { error: "Tienes que aceptar las condiciones." }), // tiene que ser true
});

// TypeScript saca el tipo del esquema: no hay que escribirlo a mano
type EnrollmentFormData = z.infer<typeof schema>;

export function EnrollmentFormRHF() {
  const {
    register, // conecta cada campo
    handleSubmit, // valida antes de enviar
    reset, // vacía el formulario
    formState: { errors, isSubmitSuccessful }, // los errores y si se envió bien
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(schema), // valida con el esquema de Zod
    defaultValues: { name: "", email: "", course: "", mode: "onsite" },
  });

  // Solo se llama si todo es válido
  function submit(data: EnrollmentFormData) {
    console.log("Inscripción enviada:", data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <h2>Inscripción (React Hook Form)</h2>
      {isSubmitSuccessful && <p role="status">¡Inscripción enviada!</p>}

      <label htmlFor="rhf-name">Nombre *</label>
      <input id="rhf-name" {...register("name")} />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label htmlFor="rhf-email">Email *</label>
      <input id="rhf-email" type="email" {...register("email")} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <label htmlFor="rhf-course">Curso *</label>
      <select id="rhf-course" {...register("course")}>
        <option value="">Elige un curso</option>
        <option value="1">Introducción a la programación con JavaScript</option>
        <option value="2">HTML y CSS desde cero</option>
        <option value="6">Bases de datos con SQL</option>
      </select>
      {errors.course && <p className="error">{errors.course.message}</p>}

      <fieldset>
        <legend>Modalidad</legend>
        <label>
          <input type="radio" value="onsite" {...register("mode")} />
          Presencial
        </label>
        <label>
          <input type="radio" value="online" {...register("mode")} />
          Online
        </label>
      </fieldset>

      <label>
        <input type="checkbox" {...register("accepted")} />
        Acepto las condiciones *
      </label>
      {errors.accepted && <p className="error">{errors.accepted.message}</p>}

      <button type="submit">Enviar inscripción</button>
    </form>
  );
}
