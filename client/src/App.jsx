import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/EmailVerification";
import NotificationContainer from "./components/NotificationContainer";
import RequestEmailVerification from "./pages/RequestEmailVerification";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/request-for-email-verification" element={<RequestEmailVerification />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;