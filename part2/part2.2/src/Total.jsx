

const Total = (props) => {
  const total = props.parts.reduce((sum, parts) => {
    return sum += parts.exercises 
  },0)
  return (
    <p>Total exercises is: {total}</p>
  );
}
export default Total