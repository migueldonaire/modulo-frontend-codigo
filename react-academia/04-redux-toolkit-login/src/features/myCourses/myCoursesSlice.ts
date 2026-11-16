import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Cómo es esta parte del estado
type MyCoursesState = {
  ids: string[];
};

// Cómo empieza
const initialState: MyCoursesState = {
  ids: [],
};

export const myCoursesSlice = createSlice({
  name: "myCourses", // prefijo de las acciones: "myCourses/add"
  initialState,
  reducers: {
    // Cada función es un reducer Y crea su acción
    add(state, action: PayloadAction<string>) {
      // action.payload = el id del curso
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    remove(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    clear(state) {
      state.ids = [];
    },
  },
});

// Las acciones, para usarlas en los componentes
export const { add, remove, clear } = myCoursesSlice.actions;
// El reducer, para el store
export default myCoursesSlice.reducer;
