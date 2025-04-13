import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
}

const Topbar: FC<TopbarProps> = ({
  currentQuestionIndex,
  totalQuestions,
  timeLeft
}) => {
  const navigate = useNavigate();

  const formatTime = (seconds: number) => {
    const displaySeconds = Math.max(0, seconds);
    return `0:${displaySeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[10vh] w-full mx-2 flex flex-col justify-between">
      <div className="flex justify-between mx-2">
        <div className="font-medium text-gray-600 text-2xl transition">
          {formatTime(timeLeft)}
        </div>
        <button 
          className="bg-gray-50 border-2 rounded-md px-4 py-1 font-medium border-gray-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Quit
        </button>
      </div>

      <div className="flex justify-around gap-1 mx-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-20 rounded-md transition ${
              index <= currentQuestionIndex ? "bg-amber-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Topbar;