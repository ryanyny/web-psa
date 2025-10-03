import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PostDetail from "./pages/PostDetail.jsx"
import CreatePost from "./pages/CreatePost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import MyPosts from "./pages/MyPosts.jsx"
import NotFound from "./pages/NotFound.jsx"
import Layout from "./components/Layout.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App