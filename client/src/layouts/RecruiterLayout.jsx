import Navbar from "../components/screening/Navbar";
import Sidebar from "../components/screening/Sidebar";

export default function RecruiterLayout({ children }) {
  return (
    <div className="flex">
      <Navbar />
      <Sidebar />
      <main className="ml-48 mt-24 p-6 w-full">{children}</main>
    </div>
  );
}
