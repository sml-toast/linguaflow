import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// 懒加载页面组件 - 代码分割，提高首屏加载速度
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const Login = lazy(() => import("./pages/Login").then(module => ({ default: module.Login })));
const Register = lazy(() => import("./pages/Register").then(module => ({ default: module.Register })));
const Dashboard = lazy(() => import("./pages/Dashboard").then(module => ({ default: module.Dashboard })));
const Vocabulary = lazy(() => import("./pages/Vocabulary").then(module => ({ default: module.Vocabulary })));
const Grammar = lazy(() => import("./pages/Grammar").then(module => ({ default: module.Grammar })));
const Speaking = lazy(() => import("./pages/Speaking").then(module => ({ default: module.Speaking })));
const Listening = lazy(() => import("./pages/Listening").then(module => ({ default: module.Listening })));
const Achievements = lazy(() => import("./pages/Achievements").then(module => ({ default: module.Achievements })));
const Community = lazy(() => import("./pages/Community").then(module => ({ default: module.Community })));
const Profile = lazy(() => import("./pages/Profile").then(module => ({ default: module.Profile })));

// 加载动画组件
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 animate-pulse">加载中...</p>
      </div>
    </div>
  );
}

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
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </AppLayout>
    </Router>
  );
}
