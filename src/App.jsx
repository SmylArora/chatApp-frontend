import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SettingsPage from "./Pages/SettingsPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/loginPage";
import ProfilePage from "./Pages/ProfilePage";
import { Loader } from "lucide-react";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme} =useThemeStore();
  useEffect(() => {
    checkAuth();
  }, []);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
