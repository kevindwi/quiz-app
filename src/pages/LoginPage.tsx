import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem("user", name);
      navigate("/quiz");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-[#76acdb]">
      <div className="flex justify-center items-center w-md bg-white">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
          <form className="space-y-6" action="#">
            <div className="flex flex-col items-center gap-y-3">
              <h5 className="text-2xl font-medium text-gray-900">Quiz App</h5>
              <p className="text-sm text-gray-500">
                Enter your name to start quiz.
              </p>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleLogin}
            >
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
