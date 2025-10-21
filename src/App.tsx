import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuthProvider";
import {
  ForgotPasswordPage,
  HomePage,
  LastSeenAnnouncements,
  LikedAnnouncements,
  LoginPage,
  New,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import MainLayout from "./layout/Main";
import MyAnnouncements from "./pages/MyAnnouncements";

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
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/new"
          element={
            <MainLayout>
              <New />
            </MainLayout>
          }
        />
        <Route
          path="/liked/announcements"
          element={
            <MainLayout>
              <LikedAnnouncements />
            </MainLayout>
          }
        />
        <Route
          path="/last-seen/announcements"
          element={
            <MainLayout>
              <LastSeenAnnouncements />
            </MainLayout>
          }
        />
        <Route
          path="/my/announcements"
          element={
            <MainLayout>
              <MyAnnouncements />
            </MainLayout>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/forgot/password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
