interface Props {
  className?: string,
  color: "success" | "danger" | "primary" | "secondary" | "light" | "dark",
  inactive: boolean,
  text: string,
  type: "submit" | "button",
  onClick?: any
}

const Button = ({className, color, inactive, text, type, onClick}: Props) => {
  return (
    <>
      <button
        className={`btn btn-${color} ${className} text-base`}
        disabled={inactive}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

export default Button
