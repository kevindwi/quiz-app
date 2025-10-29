import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("user", name);
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="w-md min-h-screen flex items-center justify-center bg-white">
        <div className="w-xs sm:w-sm bg-white border border-gray-300/60 rounded-2xl p-6 m-6">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
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
