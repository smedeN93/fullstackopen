const Total = (props) => {
    const total = props.exercises.reduce((sum, part) => sum + part.exercises, 0);
return (
  <p>Number of exercises {total}</p>
);
}

export default Total