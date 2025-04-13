import { FC } from "react";
import { IQuestion } from "../../pages/Test";

interface FeedbackQestionProps{
    totalQuestions:number;
    currentQuestionNumber:number;
    question:IQuestion;
    userSelectedOptions:string[];
    isAttempt:boolean;
    isUserAnsCorrect:boolean;
}

const BLANK:string = "_____________";

const FeedbackQestion:FC<FeedbackQestionProps> = ({
    currentQuestionNumber,isAttempt,isUserAnsCorrect,question,totalQuestions,userSelectedOptions
}) => {

    function getOriginalQestion(qst: string, options: string[]): string {
        options?.forEach(option => {
          const index: number = qst?.indexOf(BLANK);
          if (index !== -1) { // Ensure we find BLANK in the string
            qst = qst.replace(BLANK, option); // Replacing BLANK with the option
          }
        });
        return qst;
      }

  return (
    <div className="h-full  flex flex-col justify-between my-20 bg-white rounded-md">
        <div className="h-full flex flex-col py-5">
            <div className="flex items-center justify-between px-5">
                <p className="text-gray-500 bg-gray-300 rounded-md px-3 py-1 my-3">
                    prompt
                </p>
                <p className="font-medium">
                    <span>{currentQuestionNumber+1}</span>
                    /
                    <span className="text-gray-500">{totalQuestions}</span>
                </p>
            </div>
            <p className="px-5">
                {getOriginalQestion(question.question,question.correctAnswer)}
            </p>
        </div>
        <div className="h-full py-2 flex flex-col gap-4 bg-green-50 rounded-b-md px-5">
            <p className="py-2 text-gray-500">
                Your Response: 
                {
                    isAttempt ? (
                        <span className={`${isUserAnsCorrect ? "text-green-600 bg-green-200" : "text-red-600 bg-red-200"} ml-3 p-1 rounded-md text-center`}>
                        {isUserAnsCorrect ? " Correct" : " Incorrect"}
                        </span>
                    ) : (
                        <span className="text-amber-900 bg-yellow-100 ml-3 rounded-md p-1">
                            Not Answered
                        </span>
                    )
                }
            </p>
            <p className="">
                {
                    isAttempt && getOriginalQestion(question.question,userSelectedOptions)
                }
            </p>
        </div>
    </div>
  )
}

export default FeedbackQestion