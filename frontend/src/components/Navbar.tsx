import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="backdrop-blur-xl bg-black/50 border-b border-white/10 shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/dashboard" className="flex items-center">
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "30px",
            marginLeft:"20px",
            background: "linear-gradient(90deg, #1E40AF, #3B82F6, #60A5FA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            MozBackgroundClip: "text",
            MozTextFillColor: "transparent",
          }}
        >
          QuickPay
        </h2>
      </Link>

      <div className="flex items-center gap-6">
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition font-semibold shadow-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-md"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
