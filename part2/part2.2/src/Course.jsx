import Header from './Header'
import Content from './Content'
import Part from './Part'
import Total from './Total'

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Part parts={course.parts} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
