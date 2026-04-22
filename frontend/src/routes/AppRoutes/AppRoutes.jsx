import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../../Pages";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
