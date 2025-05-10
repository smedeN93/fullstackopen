const StatisticLine = (props) => {
  return (
    <table>
        <tbody>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
        </tbody>
    </table>
  )
}

export default StatisticLine