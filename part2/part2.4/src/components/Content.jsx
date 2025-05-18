import Part from "./Part"

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part) => {
                return (
                    <Part key={part.id} parts={part} />
                )
            })}
        </div>
    )
}
export default Content