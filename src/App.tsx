import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuthProvider";
import {
  HomePage,
  LastSeenAnnouncements,
  LikedAnnouncements,
  LoginPage,
  New,
  NotFoundPage,
  RegisterPage,
} from "./pages";
import MainLayout from "./layout/Main";
import Profile from "./pages/Profile";
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
              <Profile />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
