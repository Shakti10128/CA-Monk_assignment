import { useCallback, useEffect, useState } from "react"
import { IQuestion } from "./Test";
import axios from "axios";
import FeedbackQestion from "../components/feedback/FeedbackQestion";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";




const Result = () => {
  
  const [finalScore,setFinalScore] = useState<string[][]>([]);
  const [questions,setQuestions] = useState<IQuestion[] | []> ([]); 

  const navigate = useNavigate();

  const isUserAnsCorrect = (correctAns: string[], userSelectedAns: string[]): boolean => {
    // if the length is not matching return false, no need further checking
    if (correctAns?.length !== userSelectedAns?.length) return false;
    // else will check the order or userSelectedAnswer
    return correctAns.every((ans, idx) => ans === userSelectedAns[idx]);
  };

  const totalQuestions = ()=>{
    return finalScore?.length;
  }

  const totalScore = () => {
    return questions?.reduce((acc, question, index) => {
      if (isUserAnsCorrect(question?.correctAnswer, finalScore[index])) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  };
  
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setQuestions(response.data.questions);
    } catch (error) {
      console.log("error while fetching the questions", error);
    }
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("user-response");
    if (stored) {
      const userResponses: string[][] = JSON.parse(stored);
      setFinalScore(userResponses);
    }
    fetchData();
  }, [fetchData]);
  


  return (
    <div className="w-full">
      <div className="flex justify-start items-center pl-10 bg-white shadow-md w-[100%] h-[10vh]">
            <HiArrowLeft className="cursor-pointer h-5 w-5"
            onClick={()=> navigate("/")}
            />
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full md:w-[50%] mx-auto">
          <div className={`h-full flex-col w-full flex justify-between items-center ${totalScore() < 5 ? "text-red-500" : "text-green-600"}`}>
            <div className="mt-10">
              <div className={`border-4 h-40 w-40 rounded-full flex flex-col justify-center items-center p-6
                ${totalScore() < 5 ? "border-red-500" : "border-green-600"}`}>
              <h1 className="text-4xl font-semibold">
                {totalScore()}
              </h1>
              <p className="font-semibold">
                Overall score
              </p>
              </div>
          </div>
      </div>
          <div className="my-10 flex flex-col justify-center items-center mx-5">
            <p>
            While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
            </p>

            <button className=" mt-10 border-2 border-blue-800 rounded-md text-blue-800 bg-white px-10 py-2 font-medium cursor-pointer"
            onClick={()=> navigate("/")}
            >
              Go to Dashboard
            </button>
          </div>

        {/* question progress */}

        <div className="w-full h-[100%]">
          <div>
          {questions.map((question,index)=>{
            return <FeedbackQestion
                      currentQuestionNumber={index}
                      isAttempt={finalScore[index]?.length !== 0}
                      isUserAnsCorrect={isUserAnsCorrect(question?.correctAnswer,finalScore[index])}
                      question={question}
                      totalQuestions={totalQuestions()}
                      userSelectedOptions={finalScore[index]}
                      key={question.questionId}
                    />
          })}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Result