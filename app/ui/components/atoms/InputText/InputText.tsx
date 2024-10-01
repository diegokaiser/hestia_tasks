interface Props {
  className?: string,
  placeholder?: string,
  type: string,
  onChange: any,
  value?: string
}

const InputText = ({className, placeholder, type, onChange, value}: Props) => {
  return (
    <>
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
    </>
  )
}

export default InputText
