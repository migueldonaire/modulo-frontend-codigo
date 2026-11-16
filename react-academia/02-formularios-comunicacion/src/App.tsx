import { MyCoursesProvider } from "./context/MyCoursesProvider";
import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { MyCourses } from "./components/MyCourses";
import { EnrollmentForm } from "./components/EnrollmentForm";
import { EnrollmentFormRHF } from "./components/EnrollmentFormRHF";

function App() {
  return (
    <MyCoursesProvider>
      <Header />
      <Catalog />
      <main>
        <MyCourses />
        <EnrollmentForm />
        <EnrollmentFormRHF />
      </main>
    </MyCoursesProvider>
  );
}

export default App;
