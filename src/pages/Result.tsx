import { finalScore } from "../utils/userResponses";



const Result = () => {

  const isUserAnsCorrect = (correctAns: string[], userSelectedAns: string[]): boolean => {
    // if the length is not matching return false, no need further checking
    if (correctAns.length !== userSelectedAns.length) return false;
    // else will check the order or userSelectedAnswer
    return correctAns.every((ans, idx) => ans === userSelectedAns[idx]);
  };

  const totalQuestions = ()=>{
    return finalScore.length;
  }

  const totalScore = () => {
    return finalScore.reduce((acc, result) => {
      if (isUserAnsCorrect(result.correctAnswer, result.userSelectedOptions)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };
  




  return (
    <div className="h-screen w-screen">
      <div>

      </div>
    </div>
  )
}

export default Result