import { Link } from "react-router-dom";

const ThankYou = ({ message }) => {
    return ( 
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
                Terima Kasih!
            </h2>
            <p className="text-gray-700">{message.text}</p>
            <Link
                to="/punya-skill-connect"
                className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded"
            >
                Kembali ke Form
            </Link>
        </div>
    );
}

export default ThankYou;