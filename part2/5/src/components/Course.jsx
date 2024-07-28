const Course = ({course}) => {
    return (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
    )
}

const Header = ({name}) => {
    return <h2>{name}</h2>
}

const Content = ({parts}) => {
    return (
    <ul>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </ul>
    )
}

const Part = ({name, exercises}) => {
    return <li>{name} {exercises}</li>
}

const Total = ({parts}) => {
    const total = parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)
    return <b>total of {total} exercises</b>
}

export default Course