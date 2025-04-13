import { MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearPreviousUserResponse } from "../utils/submitResponse";

const Home = () => {

  const navigate = useNavigate();

  // the json-server was not working good for me so i just used sessionStorage

  const testHandler = ()=>{
    // clearing the previous user response from the session storage
    clearPreviousUserResponse();
    navigate("/test");
  }

  return (
    <div className="h-screen w-screen lg:w-[70%] mx-auto">
  <div className="h-full w-full flex flex-col justify-center items-center">
    {/* Top Section */}
    <div className="flex h-1/2 flex-col items-center justify-center px-4 py-2 md:py-8 w-full rounded-md">
      <MdEditNote className="my-5 text-7xl text-gray-500" />
      <h1 className="text-black text-2xl font-medium md:text-5xl text-center">
        Sentence Construction
      </h1>
      <div className="text-gray-500 text-center mt-2 text-md md:font-medium">
        <p className="hidden md:block">
          Select the correct words to complete the sentence by arranging
        </p>
        <p className="hidden md:block">
          the provided options in the right order
        </p>
        <p className="md:hidden">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order
        </p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="w-full h-1/2 md:mt-6 -mt-5 md:p-4 rounded-md">
      <div className="flex w-full flex-col lg:flex-row justify-between text-center">
        <div className="flex-1 justify-between border-r-2 border-gray-200">
          <h3 className="font-medium md:text-2xl text-gray-700">Time Per Question</h3>
          <p className="text-gray-400 text-[20px]">30 sec</p>
        </div>
        <div className="flex-1 justify-between border-r-2 border-gray-200">
          <h3 className="font-medium text-[20px] text-gray-700">Total Questions</h3>
          <p className="text-2xl text-gray-400">10</p>
        </div>
        <div className="flex-1 justify-between">
          <h3 className="font-medium text-[20px] text-gray-700">Coins</h3>
          <p className="text-gray-400 text-2xl">
            🪙 0
        </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-10 md:mt-20 flex justify-center gap-4">
        <button className="bg-white text-blue-600 px-8 md:px-14 py-2 rounded-lg hover:bg-blue-50 border-2 border-blue-600 transition">
          Back
        </button>
        <button className="bg-blue-700 text-white px-8 md:px-14 py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition"
        onClick={testHandler}
        >
          Start
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Home