import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Project, Register } from "../../Pages";
import { UserAuth } from "../../auth";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserAuth>
                <Home />
              </UserAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/project"
            element={
              <UserAuth>
                <Project />
              </UserAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
