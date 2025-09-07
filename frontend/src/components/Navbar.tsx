import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link
        to="/dashboard"
        className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
      >
        BridgePay
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-gray-300 hover:text-white transition font-medium"
        >
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition font-semibold shadow-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
