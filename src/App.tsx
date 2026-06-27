import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Vocabulary } from "./pages/Vocabulary";
import { Grammar } from "./pages/Grammar";
import { Speaking } from "./pages/Speaking";
import { Listening } from "./pages/Listening";
import { Achievements } from "./pages/Achievements";
import { Community } from "./pages/Community";
import { Profile } from "./pages/Profile";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vocabulary/:courseId" element={<Vocabulary />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/grammar/:courseId" element={<Grammar />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/speaking/:courseId" element={<Speaking />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/listening/:courseId" element={<Listening />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
