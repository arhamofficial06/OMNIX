import { UserProvider } from "./context/user.context";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
};

export default App;
