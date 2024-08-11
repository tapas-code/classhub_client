import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./services/PrivateRoute";
import ManageTeachers from "./pages/ManageTeachers";
import ManageStudents from "./pages/ManageStudents";
import ManageClassrooms from "./pages/ManageClassrooms";
import Home from "./pages/Home";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen max-h-screen">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route
            path="/register"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/principal"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <PrincipalDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/principal/teacher"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <ManageTeachers />
              </PrivateRoute>
            }
          />
          <Route
            path="/principal/teacher/add"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <Register role="Teacher" />
              </PrivateRoute>
            }
          />
          <Route
            path="/principal/student"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <ManageStudents />
              </PrivateRoute>
            }
          />
          <Route
            path="/principal/student/add"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <Register role="Student" />
              </PrivateRoute>
            }
          />
          <Route
            path="/principal/classroom"
            element={
              <PrivateRoute allowedRoles={["Principal"]}>
                <ManageClassrooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <PrivateRoute allowedRoles={["Teacher"]}>
                <TeacherDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student"
            element={
              <PrivateRoute allowedRoles={["Student"]}>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
