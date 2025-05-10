
const Button = ({ handleClick, text }) => {
  if (text === "good") {
    return (
      <button onClick={handleClick}>{text}</button>
    )
  }
  if (text === "neutral") {
    return (
      <button onClick={handleClick}>{text}</button>
    )
  }
  if (text === "bad") {
    return (
      <button onClick={handleClick}>{text}</button>
    )
  }
}

export default Button