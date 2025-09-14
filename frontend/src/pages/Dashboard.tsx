import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";
import Home from "../components/Home";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export default function Dashboard() {
  const { username, token } = useAuth(); // use context
  const [balance, setBalance] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (token) {
      fetchBalance();
      fetchUsers();
    }
  }, [token]);

  const fetchBalance = async () => {
    try {
      const res = await api.get("/account/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/bulk");
      setUsers(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/account/transfer", { to, amount: Number(amount) });
      alert("Transfer successful!");
      setAmount("");
      setTo("");
      fetchBalance();
    } catch (err) {
      alert("Transfer failed");
      console.error(err);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />

      {token ? (
        <>
          {/* Welcome message */}
          {username && (
            <div className="p-6 max-w-5xl mx-auto flex justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
                Welcome, {username}!
              </h2>
            </div>
          )}

          <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
              <h2 className="text-lg font-semibold mb-2 text-gray-300">
                Your Balance
              </h2>
              <p className="text-4xl font-bold text-blue-400">
                ₹ {balance !== null ? balance.toFixed(2) : "Loading..."}
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Send Money</h2>
              <form onSubmit={handleTransfer} className="flex flex-col gap-4">
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  className="p-3 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select recipient</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id} className="text-black">
                      {user.firstName} {user.lastName} ({user.username})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="p-3 bg-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition font-semibold shadow-lg"
                >
                  Transfer
                </button>
              </form>
            </div>

            {/* User List */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">All Users</h2>
              <ul className="space-y-3">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between items-center border-b border-white/10 pb-2"
                  >
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-gray-400 text-sm">{user.username}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <Home/>
      )}
    </div>
  );
}
