import { BrowserRouter, Routes, Route } from "react-router-dom"

// ===== Landing Pages =====
import Home from "./pages/landing/Home"
import Tentangkami from "./pages/landing/Tentangkami"
import Contact from "./pages/landing/Contact"
import Login from "./pages/landing/Login"
import Register from "./pages/landing/Register"
import Program from "./pages/landing/Program"
import DetailProgram from "./pages/landing/Detail-program"
import Mitra from "./pages/landing/Mitra"
import DetailMitra from "./pages/landing/Detail-mitra"
import DashboardUser from "./pages/landing/DashboardUser"
import DaftarProgram from "./pages/landing/Daftar-program"
import Testimoni from "./pages/landing/Testimoni"
import DashboardAdmin from "./pages/landing/Admin/DashboardAdmin"
import ProgramAdmin from "./pages/landing/Admin/ProgramAdmin"
import MitraAdmin from "./pages/landing/Admin/MitraAdmin"
import PesertaAdmin from "./pages/landing/Admin/PesertaAdmin"
import TestimoniAdmin from "./pages/landing/Admin/TestimoniAdmin"

// Layout
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"

// ===== Blog Pages =====
import BlogHome from "./pages/blog/Home"
import PostDetail from "./pages/blog/PostDetail"
import CreatePost from "./pages/blog/CreatePost"
import EditPost from "./pages/blog/EditPost"
import BlogLogin from "./pages/blog/Login"
import BlogRegister from "./pages/blog/Register"
import MyPosts from "./pages/blog/MyPosts"
import NotFound from "./pages/NotFound"
import BlogLayout from "./components/blog/Layout"
import ProtectedRoute from "./components/blog/ProtectedRoute"

import WelcomeFormPage from "./pages/screening/WelcomeFormPage"
import ApplicantFormPage from "./pages/screening/ApplicantFormPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ====== LANDING ROUTES ====== */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/tentangkami"
          element={
            <UserLayout>
              <Tentangkami />
            </UserLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UserLayout>
              <Login />
            </UserLayout>
          }
        />
        <Route
          path="/register"
          element={
            <UserLayout>
              <Register />
            </UserLayout>
          }
        />
        <Route
          path="/program"
          element={
            <UserLayout>
              <Program />
            </UserLayout>
          }
        />
        <Route
          path="/detail-program/:id"
          element={
            <UserLayout>
              <DetailProgram />
            </UserLayout>
          }
        />
        <Route
          path="/mitra"
          element={
            <UserLayout>
              <Mitra />
            </UserLayout>
          }
        />
        <Route
          path="/detail-mitra/:id"
          element={
            <UserLayout>
              <DetailMitra />
            </UserLayout>
          }
        />
        <Route
          path="/testimoni"
          element={
            <UserLayout>
              <Testimoni />
            </UserLayout>
          }
        />
        <Route
          path="/daftar-program"
          element={
            <UserLayout>
              <DaftarProgram />
            </UserLayout>
          }
        />
        <Route
          path="/dashboard-user"
          element={
            <UserLayout>
              <DashboardUser />
            </UserLayout>
          }
        />

        {/* ====== ADMIN ROUTES ====== */}
        <Route
          path="/dashboard-admin"
          element={
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/program-admin"
          element={
            <AdminLayout>
              <ProgramAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/mitra-admin"
          element={
            <AdminLayout>
              <MitraAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/peserta-admin"
          element={
            <AdminLayout>
              <PesertaAdmin />
            </AdminLayout>
          }
        />
        <Route
          path="/testimoni-admin"
          element={
            <AdminLayout>
              <TestimoniAdmin />
            </AdminLayout>
          }
        />

        {/* ====== BLOG ROUTES (nested) ====== */}
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogHome />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="login" element={<BlogLogin />} />
          <Route path="register" element={<BlogRegister />} />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-posts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* ====== Punya Skill Connect ====== */}
        <Route path="/skill-connect" element={<WelcomeFormPage />} />
        <Route path="/skill-connect/form" element={<ApplicantFormPage />} />
        {/* ====== NOT FOUND ====== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App