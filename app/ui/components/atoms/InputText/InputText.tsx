interface Props {
  className?: string,
  placeholder?: string,
  type: string,
  onChange: any
}

const InputText = ({className, placeholder, type, onChange}: Props) => {
  return (
    <>
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </>
  )
}

export default InputText
