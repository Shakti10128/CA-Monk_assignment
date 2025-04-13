import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import QuestionScreen from "../components/Test/QuestionScreen";

export interface IQuestion {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

const Test = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IQuestion[]>([]);

  // Memoized fetch function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/data");
      setData(response.data.questions);
    } catch (error) {
      console.log("error while fetching the questions", error);
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      fetchData();
  }, [fetchData]);


  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {data.length > 0 && (
        <QuestionScreen questions={data} />
      )}
    </div>
  );
};

export default Test;
