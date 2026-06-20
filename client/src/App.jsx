import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotificationContainer from "./components/NotificationContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === "light" ? "light" : "dark"}>
      <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
          />
          <Route
            path="/create-post"
            element={<ProtectedRoute><CreatePost /></ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;