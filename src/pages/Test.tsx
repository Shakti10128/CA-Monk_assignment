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
  console.log(data);

  const fetchData = async()=>{
    setLoading(true);
    axios.get("http://localhost:3000/data")
    .then((response)=>{
        console.log(response.data);
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