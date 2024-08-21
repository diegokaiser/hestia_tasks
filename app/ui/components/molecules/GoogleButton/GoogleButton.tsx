import { FcGoogle } from "react-icons/fc"

interface Props {
  className?: string,
  color: "success" | "danger" | "primary" | "secondary" | "light" | "dark",
  inactive: boolean,
  text: string,
  type: "submit" | "button",
  onClick?: any
}

const GoogleButton = ({className, color, inactive, text, type, onClick}: Props) => {

  return (
    <>
      <button
        className={`btn btn-${color} ${className} text-3xl`}
        disabled={inactive}
        type={type}
        onClick={onClick}
      >
        <FcGoogle />
        <span className="text-base">
          {text}
        </span>
      </button>
    </>
  )
}

export default GoogleButton
