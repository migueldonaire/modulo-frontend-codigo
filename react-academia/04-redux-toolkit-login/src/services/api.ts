import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

export type Course = {
  id: string;
  title: string;
  category: string;
  hours: number;
  price: number;
  seats: number;
  description: string;
};

export type NewCourse = Omit<Course, "id">; // un Curso sin id: el id lo pone la API

export type NewEnrollment = {
  courseId: string;
  name: string;
  email: string;
  mode: string;
};

export const api = createApi({
  reducerPath: "api", // dónde se guarda la caché en el store
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    // Se ejecuta antes de cada petición
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // el token del store
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course"], // los nombres de las etiquetas
  endpoints: (builder) => ({
    // query = leer. <lo que devuelve, lo que recibe>
    getCourses: builder.query<Course[], void>({
      query: () => "/courses", // GET /courses
      providesTags: ["Course"], // "estos datos son de tipo Course"
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/courses/${id}`, // GET /courses/3
      providesTags: ["Course"],
    }),
    // mutation = cambiar
    createCourse: builder.mutation<Course, NewCourse>({
      query: (course) => ({ url: "/courses", method: "POST", body: course }),
      invalidatesTags: ["Course"], // "después de esto, los datos de tipo Course están viejos"
    }),
    deleteCourse: builder.mutation<void, string>({
      query: (id) => ({ url: `/courses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Course"],
    }),
    createEnrollment: builder.mutation<NewEnrollment, NewEnrollment>({
      query: (enrollment) => ({ url: "/enrollments", method: "POST", body: enrollment }),
    }),
  }),
});

// Los hooks que crea RTK Query: use + nombre del endpoint + Query o Mutation
export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useCreateEnrollmentMutation,
} = api;
