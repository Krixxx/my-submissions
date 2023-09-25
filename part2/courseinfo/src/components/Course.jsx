const Header = ({ title }) => {
  return <h2>{title}</h2>
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, current) => {
    return acc + current.exercises
  }, 0)

  return <h3>total of {total} exercises</h3>
}

const SingleCourse = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return <SingleCourse key={course.id} course={course} />
      })}
    </div>
  )
}
export default Course
