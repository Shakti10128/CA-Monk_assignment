
import { FC, useState } from "react"
import { IQuestion } from "../../pages/Test"
import Topbar from "./Topbar"
import Question from "./Question"

interface QuestionScreenProps{
    questions:IQuestion[]
}

const QuestionScreen:FC<QuestionScreenProps> = ({questions}) => {
  const [currentQuestionIndex ,setCurrentQuestionIndex ] = useState<number>(0);


  const nextQuestionHandler = ()=>{
    // if we are at last question show user to finish button or after timer expire user automatically will
    // redirect to result page
    if(currentQuestionIndex < questions.length) {
        setCurrentQuestionIndex(prev => prev+1);
    }
  }


  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center bg-white rounded-md items-center md:min-h-[70vh] w-full md:w-[70%] px-2 py-10 md:p-10">
            {/* top bar */}
            <Topbar currentQuestionIndex={currentQuestionIndex} totalQustions={questions.length} nextQuestionHandler={nextQuestionHandler}/>

            <Question currentQuestion={questions[currentQuestionIndex]} currentQuestionIndex={currentQuestionIndex} totalQustions={questions.length} nextQuestionHandler={nextQuestionHandler}/>
        </div>
    </div>
  )
}

export default QuestionScreen