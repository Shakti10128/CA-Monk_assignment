import { FC } from "react"

interface ButtonProps{
    title:string
    onClick:(option:string)=>void;
}

const Button:FC<ButtonProps> = ({title,onClick}) => {
  return (
    <button
    className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-gray-300 rounded-md border"
    onClick={()=>onClick(title)}
    >
    {title}
    </button>
  )
}

export default Button