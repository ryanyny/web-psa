

import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function UserLayout({ children }) {
    return (
        <>
        <Navbar/>
        <main className="pt-24">{children}</main>
        <Footer/>
        </>
    )
}
