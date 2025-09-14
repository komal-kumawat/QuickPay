import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-30 text-center px-4">
      <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent m-5">
        QuickPay
      </h1>

      <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-xl md:max-w-2xl">
        The fastest and easiest way to send money, pay bills, manage your finances, 
        and stay on top of your transactions anytime, anywhere. Secure, reliable, and built for you.
      </p>

      <div className="flex items-center gap-5 mt-10">
        <button
          onClick={handleGetStarted}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-md"
        >
          Get Started <FaArrowRight className="text-white text-lg" />
        </button>
        <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-md">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
