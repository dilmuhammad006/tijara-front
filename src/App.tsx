import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuthProvider";
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from "./pages";
import MainLayout from "./layout/Main";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
