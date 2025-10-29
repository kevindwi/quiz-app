import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { fetchQuestion } from "../api/opentdbApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTimer } from "../hooks/useTimer";
import type { Question } from "../types";

const QuizPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const [questions, setQuestions] = useLocalStorage<Question[]>(
    "questions",
    [],
  );
  const [currentQuestion, setCurrentQuestion] = useLocalStorage<number>(
    "current",
    0,
  );
  const [score, setScore] = useLocalStorage<number>("score", 0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const time = useTimer(60 * 5, () => finishQuiz(), "quiz_timer");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await fetchQuestion();

      setQuestions(data);
      setLoading(false);
    };

    if (questions.length == 0) {
      dataFetch();
    } else {
      setLoading(false);
    }
  }, [questions.length, setQuestions]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  const answers: string[] = (() => {
    if (questions.length > 0) {
      return [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
      ].sort();
    }
    return [];
  })();

  const moveToNextQuestion = () => {
    setCurrentQuestion((prev) => {
      const next = prev + 1;
      if (next < questions.length) {
        setAnswered(false);
        setSelectedAnswer(null);
        return next;
      } else {
        finishQuiz();
        return prev;
      }
    });
  };

  const handleAnswer = (answerIndex: number) => {
    if (questions.length === 0) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);

    const chosen = answers[answerIndex];
    const isCorrect = chosen === questions[currentQuestion].correct_answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      toast.success("Benar!");
    } else {
      toast.error("Salah!");
    }

    const projectedScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      if (currentQuestion + 1 >= questions.length) {
        navigate("/result", {
          state: {
            correct: projectedScore,
            incorrect: questions.length - projectedScore,
            total: questions.length,
            user,
          },
        });
      } else {
        moveToNextQuestion();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    navigate("/result", {
      state: {
        correct: score,
        incorrect: questions.length - score,
        total: questions.length,
        user,
      },
    });
  };

  const timeRemaining =
    time < 60 ? `${time}s` : `${Math.floor(time / 60)}m ${time % 60}s`;

  return (
    <div className="flex justify-center h-screen bg-sky-100">
      <div className="w-md pt-6 px-4 bg-white">
        <div>
          <p className="text-gray-600 text-lg mb-1">
            Halo, <span className="font-semibold text-gray-800">{user}</span>
          </p>

          <div className="flex justify-between items-center text-md font-medium text-gray-500">
            <p>
              Question{" "}
              <span className="font-semibold text-gray-800">
                {currentQuestion + 1} / {questions.length}
              </span>
            </p>
            <div
              className={`flex items-center space-x-1 p-1 px-3 rounded-full transition-colors duration-300 ${time <= 25 ? "bg-red-100 text-red-600" : "bg-indigo-50 text-sky-600"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{timeRemaining}</span>
            </div>
          </div>

          <div className="w-full bg-blue-100 rounded-2xl p-5 mt-4">
            <h1
              className="text-lg font-medium"
              dangerouslySetInnerHTML={{
                __html: questions[currentQuestion].question,
              }}
            />
          </div>

          <div className="mt-8">
            <div className="flex flex-col gap-y-2">
              {answers.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`flex items-center gap-x-4 w-full bg-slate-100 rounded-2xl border border-gray-200 p-4 cursor-pointer transition-all duration-300 hover:bg-sky-50 group`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300 ${
                      answered &&
                      option === questions[currentQuestion].correct_answer
                        ? "border-green-500 bg-green-500 text-white"
                        : answered && index === selectedAnswer
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-sky-200 bg-sky-100 text-gray-800 group-hover:scale-110 group-hover:bg-sky-200 group-hover:border-sky-300"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <h1
                    className="text-base font-medium text-gray-700 group-hover:text-black transition-colors duration-300"
                    dangerouslySetInnerHTML={{
                      __html: option,
                    }}
                  ></h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
