import { FC, useEffect, useState } from "react";
import Button from "./Button";
import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { IQuestion } from "../../pages/Test";
import  submitResponse from "../../utils/submitResponse";

interface QuestionProps{
    currentQuestion:IQuestion;
    totalQuestions: number;
    currentQuestionIndex: number;
    nextQuestionHandler:()=>void;
}


const BLANK:string = "_____________";

const Question:FC<QuestionProps> = ({currentQuestion,currentQuestionIndex,totalQuestions,nextQuestionHandler}) => {
    const [currQuestion,setCurrQuestion] = useState<IQuestion |null>(null)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [unselectOptions, setUnSelectedOptions] = useState<string[]>([]);

    const navigate = useNavigate();


    const unSelectedOptionHandler = (option: string) => {
        // remove from unselected
        setUnSelectedOptions(prev => prev.filter(opt => opt !== option));

        // add to selected
        setSelectedOptions(prev => [...prev, option]);
    };

    const selectedOptionsHandler = (option: string) => {
        // remove from selected
        setSelectedOptions(prev => prev.filter(opt => opt !== option));

        // add back to unselected
        setUnSelectedOptions(prev => [...prev, option]);
    };

    const questionSubmitHandlerAndFetchNextQuestion = async () => {
        try {
          // Post selected options
        //   while making axios request to json-server it's hard reload the complete page
        //   await axios.post("http://localhost:3001/responses", selectedOptions);
        submitResponse(selectedOptions);
        }
        finally{
            // Move to the next question
          nextQuestionHandler();
        }
      }

    useEffect(() => {
        if(currentQuestionIndex === 0){
            // if user refresh the page then reset the responses array to empty in sessionStorage
            sessionStorage.setItem("user-response",JSON.stringify([]));
        }
        setCurrQuestion(currentQuestion);
        setUnSelectedOptions(currentQuestion?.options || []);
        setSelectedOptions([]); // CLEAR previous selected options for the next question
    }, [currentQuestionIndex,setCurrQuestion,currentQuestion]);

  return (
    <div className="h-full w-full">
        <div>
            {/* title */}
            <div className="flex justify-center my-5 lg:my-10 font-medium text-gray-600 text-sm md:text-[18px]">
                <p>
                    Select the missing words in correct order
                </p>
            </div>
            {/* question content */}
            <div className="mx-2">
            <p className="transition lg:text-2xl font-normal flex flex-wrap gap-2">
                {/* Immediately Invoked Function Expression (IIFE) */}
                {(() => {
                    // spliting the question into sentences
                    const parts = currQuestion?.question.split(BLANK) || [];
                    const filledQuestion: React.ReactNode[] = [];

                    parts.forEach((part, index) => {
                    filledQuestion.push(<span key={`part-${index}`}>{part}</span>);

                    if (index < parts.length - 1) {
                        const selected = selectedOptions[index];

                        filledQuestion.push(
                            <span
                                onClick={()=> selectedOptionsHandler(selected)}
                                key={`blank-${index}`}
                                className="relative flex justify-center min-w-[100px] lg:min-w-[150px] h-[30px] lg:mb-8 border-b-2 border-gray-400 cursor-pointer"
                                >
                                {selected && (
                                    <span className="absolute bg-white p-1 md:p-3 rounded-md border border-gray-300 shadow-sm text-sm text-gray-700 font-medium -mt-1 md:-mt-5">
                                    {selected}
                                    </span>
                                )}
                            </span>

                          );                          
                    }
                    });
                    // return the new question filled with selected options
                    return filledQuestion;
                })()}
                </p>
            </div>

            {/* unselect Options */}
            <div className="flex flex-wrap justify-center items-center my-3 lg:my-10 gap-2">
                {unselectOptions?.map((option,index)=>{
                    return <Button key={index}title={option} onClick={unSelectedOptionHandler}/>
                })}
            </div>

            {/* next question of finish the test */}
            <div className="flex justify-end">
            {currentQuestionIndex + 1 < totalQuestions ? (
                <button
                type="button"
                className={`p-3 md:p-5 border-2 rounded-md border-gray-400
                    ${unselectOptions.length > 0 
                    ? "text-gray-400 border-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white cursor-pointer"}`}
                disabled={unselectOptions.length > 0}
                onClick={questionSubmitHandlerAndFetchNextQuestion}
                >
                <HiArrowRight 
                    className={`${unselectOptions.length > 0 ? 'opacity-50' : ''}`}
                />
                </button>
            ) : (
                <button
                type="button"
                className={`px-4 py-2 border-2 rounded-md border-gray-400 
                    ${unselectOptions.length > 0 
                    ? "text-gray-400 border-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white cursor-pointer"}`}
                disabled={unselectOptions.length > 0}
                onClick={() => {
                    questionSubmitHandlerAndFetchNextQuestion();
                    navigate("/result");
                  }}                  
                >
                <span 
                    className={`${unselectOptions.length > 0 ? 'opacity-50' : ''}`}
                >
                    Finish
                </span>
                </button>
            )}
            </div>

        </div>
    </div>
  )
}

export default Question