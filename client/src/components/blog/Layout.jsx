import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate">
            <Navbar />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout