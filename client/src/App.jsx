import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// ===== Landing Pages =====
import Home from "./pages/landing/Home"
import Tentangkami from "./pages/landing/Tentangkami"
import Contact from "./pages/landing/Contact"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Program from "./pages/landing/Program"
import DetailProgram from "./pages/landing/Detail-program"
import Mitra from "./pages/landing/Mitra"
import DetailMitra from "./pages/landing/Detail-mitra"
import DashboardUser from "./pages/landing/DashboardUser"
import DaftarProgram from "./pages/landing/Daftar-program"
import Testimoni from "./pages/landing/Testimoni"

// ===== Admin Pages =====
import DashboardAdmin from "./pages/admin/DashboardAdmin"
import ProgramAdmin from "./pages/admin/ProgramAdmin"
import MitraAdmin from "./pages/admin/MitraAdmin"
import PesertaAdmin from "./pages/admin/PesertaAdmin"
import TestimoniAdmin from "./pages/admin/TestimoniAdmin"
import KategoriAdmin from "./pages/admin/KategoriAdmin"

// Layout
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"

// ===== Blog Pages =====
import BlogHome from "./pages/blog/Home"
import PostDetail from "./pages/blog/PostDetail"
import CreatePost from "./pages/blog/CreatePost"
import EditPost from "./pages/blog/EditPost"
import MyPosts from "./pages/blog/MyPosts"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/blog/ProtectedRoute"
import SavedPosts from "./pages/blog/SavedPosts"

function App() {
  return (
    <BrowserRouter>
            <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored" />
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
        <Route
          path="/kategori-admin"
          element={
            <AdminLayout>
              <KategoriAdmin />
            </AdminLayout>
          }
        />

        {/* ====== BLOG ROUTES (dengan UserLayout yang sama) ====== */}
        <Route
          path="/blog"
          element={
            <UserLayout>
              <BlogHome />
            </UserLayout>
          }
        />
        <Route
          path="/blog/post/:id"
          element={
            <UserLayout>
              <PostDetail />
            </UserLayout>
          }
        />
        <Route
          path="/blog/create"
          element={
            <UserLayout>
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            </UserLayout>
          }
        />
        <Route
          path="/blog/edit/:id"
          element={
            <UserLayout>
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            </UserLayout>
          }
        />
        <Route
          path="/blog/my-posts"
          element={
            <UserLayout>
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            </UserLayout>
          }
        />
        <Route
          path="/blog/saved"
          element={
            <UserLayout>
              <ProtectedRoute>
                <SavedPosts />
              </ProtectedRoute>
            </UserLayout>
          }
        />

        {/* ====== NOT FOUND ====== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App