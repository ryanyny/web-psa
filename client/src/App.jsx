import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ScrollToTop from "./components/shared/ScrollToTop"
import ProtectedRoute from "./components/shared/ProtectedRoute"

// Layout
import UserLayout from "./layouts/UserLayout"
import AdminLayout from "./layouts/AdminLayout"

// Halaman autentikasi
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

// Halaman landing page / pengguna umum
import Home from "./pages/landing/Home"
import Tentangkami from "./pages/landing/Tentangkami"
import Contact from "./pages/landing/Contact"
import Program from "./pages/landing/Program"
import DetailProgram from "./pages/landing/Detail-program"
import Mitra from "./pages/landing/Mitra"
import DetailMitra from "./pages/landing/Detail-mitra"
import DaftarProgram from "./pages/landing/Daftar-program"
import Testimoni from "./pages/landing/Testimoni"
import DashboardUser from "./pages/landing/DashboardUser"

// Halaman blog
import BlogHome from "./pages/blog/Home"
import PostDetail from "./pages/blog/PostDetail"
import CreatePost from "./pages/blog/CreatePost"
import EditPost from "./pages/blog/EditPost"
import MyPosts from "./pages/blog/MyPosts"
import NotFound from "./pages/NotFound"
import SavedPosts from "./pages/blog/SavedPosts"

// Halaman screening
import WelcomeFormPage from "./pages/screening/WelcomeFormPage"
import ApplicantFormPage from "./pages/screening/ApplicantFormPage"
import ApplicantListPage from "./pages/screening/ApplicantListPage"
import ApplicantDetailPage  from "./pages/screening/ApplicantDetailPage"
import LoginRecruiter from "./pages/screening/Login"

// Halaman admin
import DashboardAdmin from "./pages/admin/DashboardAdmin"
import ProgramAdmin from "./pages/admin/ProgramAdmin"
import MitraAdmin from "./pages/admin/MitraAdmin"
import PesertaAdmin from "./pages/admin/PesertaAdmin"
import TestimoniAdmin from "./pages/admin/TestimoniAdmin"
import KategoriAdmin from "./pages/admin/KategoriAdmin"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Konfigurasi global toast notifications (untuk pesan sukses / error API) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <Routes>
        {/* ==========================
            Rute landing page
            ========================== */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />

        {/* ==========================
            Rute autentikasi
            ========================== */}
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

        {/* ==========================
            Rute pengguna umum
            ========================== */}
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

        {/* ==========================
            Rute blog
            ========================== */}
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

        {/* ==========================
            Rute screening
            ========================== */}
        <Route 
          path="/punya-skill-connect" 
          element={
            <WelcomeFormPage />
          } 
        />

        <Route 
          path="/punya-skill-connect/form" 
          element={
            <ApplicantFormPage />
          } 
        />

        <Route 
          path="/punya-skill-connect/applicants" 
          element={
            <ProtectedRoute role="recruiter" redirectTo="/punya-skill-connect/login">
              <ApplicantListPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/punya-skill-connect/applicants/:id" 
          element={
            <ProtectedRoute role="recruiter" redirectTo="/punya-skill-connect/login">
              <ApplicantDetailPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/punya-skill-connect/login" 
          element={
            <LoginRecruiter />
          } 
        />

        {/* ==========================
            Rute admin
            ========================== */}
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
        

        {/* Catch-all route untuk penanganan error 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App