import { FC, useState, useCallback, memo, useEffect } from "react";
import { IQuestion } from "../../pages/Test";
import Topbar from "./Topbar";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
import submitResponse from "../../utils/submitResponse";

interface QuestionScreenProps {
  questions: IQuestion[];
}

const QuestionScreen: FC<QuestionScreenProps> = memo(({ questions }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  const handleTimerExpiration = useCallback(() => {
    // if user has not selected anything for the current question, then set empty options array
    submitResponse([]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      navigate("/result");
    }
  }, [currentQuestionIndex, questions.length, navigate]);

  const nextQuestionHandler = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [questions.length,currentQuestionIndex]);

  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleTimerExpiration();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleTimerExpiration]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center bg-white rounded-md items-center md:min-h-[70vh] w-full md:w-[70%] px-2 py-10 md:p-10">
        <Topbar 
          currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length}
          timeLeft={timeLeft}
        />
        <Question 
          currentQuestion={questions[currentQuestionIndex]} 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          nextQuestionHandler={nextQuestionHandler}
        />
      </div>
    </div>
  );
});

export default QuestionScreen;
