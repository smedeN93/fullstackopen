import Header from './Header'
import Content from './Content'
import Part from './Part'


const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Part parts={course.parts} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
