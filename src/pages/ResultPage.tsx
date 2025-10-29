import { useLocation, useNavigate } from "react-router";

const ResultPage = () => {
  const {
    state: { correct, total, user },
  } = useLocation();
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("questions");
    localStorage.removeItem("current");
    localStorage.removeItem("score");
    localStorage.removeItem("quiz_timer");

    navigate("/");
  }

  const percentage = (correct / total) * 100;

  let message = "Congratulations";
  let color = "text-green-600";
  let icon = // Icon Ceklis
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );

  if (percentage < 40) {
    message = "Maybe next time";
    color = "text-red-500";
    icon = // Icon Silang
      (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
  } else if (percentage < 80) {
    message = "You did great";
    color = "text-yellow-600";
    icon = // Icon Bintang
      (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.637-.921 1.938 0l1.071 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.05a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.05a1 1 0 00-1.175 0l-2.817 2.05c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118l-2.817-2.05c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
  }

  return (
    <div className="flex justify-center h-screen bg-sky-100">
      <div className="w-md bg-white">
        <div className="flex flex-col w-full min-h-screen items-center justify-center p-4 px-12">
          <div
            className={`flex justify-center items-center w-[120px] h-[120px] rounded-full ${percentage >= 80 ? "bg-green-500" : percentage < 40 ? "bg-red-500" : "bg-yellow-500"}`}
          >
            {icon}
          </div>
          <h1 className="text-sm mt-8">Your Score</h1>
          <p
            className={`text-2xl font-bold from-primary to-secondary bg-clip-text ${color}`}
          >
            {correct} / {total}
          </p>

          <h1 className={`text-2xl font-medium mt-2 ${color}`}>
            {message} {user}!
          </h1>

          <button
            onClick={handleClick}
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mt-6 text-center"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
