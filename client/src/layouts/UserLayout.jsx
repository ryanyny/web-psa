

import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function UserLayout({ children }) {
    return (
        <>
        <Navbar/>
        <main className="pt-24">{children}</main>
        <Footer/>
        </>
    )
}
