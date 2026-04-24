import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Project, Register } from "../../Pages";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
