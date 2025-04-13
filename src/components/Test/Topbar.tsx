import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  totalQustions: number;
  currentQuestionIndex: number;
  nextQuestionHandler:()=>void;
}

const Topbar: FC<TopbarProps> = ({
  currentQuestionIndex,
  totalQustions,
  nextQuestionHandler
}) => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const navigate = useNavigate();

  // additional useEffect to specifically handle timer when next question come
  useEffect(() => {
    setTimeLeft(30); // Whenever question changes, reset timer
  }, [currentQuestionIndex]);
  

  useEffect(() => {
    if (timeLeft < 0) {
        if(currentQuestionIndex+1 < totalQustions){
            // show next question if there is next question
            nextQuestionHandler();
            // reset the timer again for the next question if there is
            setTimeLeft(30);
        }
        else{
            // no more questions redirect to result page, after timer expire
            navigate("/result");
        }
      return;
    }


    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // clean up the timer when the component will unmount
    return () => clearTimeout(timer); 
  }, [timeLeft,nextQuestionHandler,currentQuestionIndex,totalQustions,navigate]);

  return (
    <div className="h-[10vh] w-full mx-2 flex flex-col justify-between">
      <div className="flex justify-between mx-2">
        <div className="font-medium text-gray-600 text-2xl transition">
            {   
                // if there is questions remaining keep showing the timer
                currentQuestionIndex < totalQustions ? (
                    `0:${timeLeft}`
                ) : (
                    // but if it is the last question, until the timer not expired till then show timer
                    // else show 0:00 means all question attempt timer 0:00
                    `${timeLeft >= 0 ? `0:${timeLeft}` : `0:00`}`
                )
            }
        </div>
        <button className="bg-gray-50 border-2 rounded-md px-4 py-1 font-medium border-gray-400 cursor-pointer"
          onClick={()=>navigate("/")}
        >
          Quit
        </button>
      </div>

      <div className="flex justify-around gap-1 mx-2">
        {[...Array(totalQustions)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-20 rounded-md transition ${
              index <= currentQuestionIndex
                ? "bg-amber-500"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Topbar;
