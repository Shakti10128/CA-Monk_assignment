import axios from "axios";
import { useEffect,useState } from "react"
import toast from "react-hot-toast"
import QuestionScreen from "../components/Test/QuestionScreen";

export interface IQuestion{
    questionId:string;
    question:string;
    questionType:string;
    answerType:string;
    options:string[];
    correctAnswer:string[];
}

const Test = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [data,setData] = useState<IQuestion[]|[]>([]);

  // 1: for smaller case when the data is small without containing images or video, just simple text this
  // approach is good, coz i don't want loading in my app between question switching
  // 
  // 2: if there are images or videos it will not be a good choice to fetch all data once
  // - if the number of question is high, then according to me, we can do batch fetching, means
  //   we can fetch set of question 5-10, 
  // - or we can just prefetch the prev & next question for the current
  // question, to avoid the loading face, and user will get the smooth experience


  const fetchData = async()=>{
    setLoading(true);
    axios.get("http://localhost:3000/data")
    .then((response)=>{
        setData(response.data.questions);
    })
    .catch((error:unknown)=>{
        console.log("error while fetching the questions",error);
    })
    .finally(()=>{
        setLoading(false);
    })
  }
 
  useEffect(()=>{
    toast.success("20 coins utilized");
    fetchData();
  },[])

  if(loading){
    return "loading....";
  }

  return (
    <div>
        <QuestionScreen questions={data}/>
    </div>
  )
}

export default Test