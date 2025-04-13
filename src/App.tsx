import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import Test from "./pages/Test"
import Result from "./pages/result"

function App() {

  return (
    <div className="bg-gray-100">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
    <Toaster/>
    </div>
  )
}

export default App
