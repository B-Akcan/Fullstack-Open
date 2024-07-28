const Persons = ({persons, shownPersons, deleteHandler}) => {
    const personsToShow = []

    for (let i=0; i<persons.length; i++)
    {
        if (shownPersons[i])
        {
            personsToShow.push(<li key={persons[i].name}>
                                    {persons[i].name} {persons[i].number}
                                    <button onClick={() => deleteHandler(persons[i].id)}>delete</button>
                               </li>)
        }
    }


    return (
        <ul>
        {personsToShow}
        </ul>
    )
}

export default Persons