import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

export default function UserLayout({ children }) {
    return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
    </div>
    )
}