import Person from './Person'

const Persons = ({ persons, handleRemovalOf }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={handleRemovalOf}
        />
      ))}
    </div>
  )
}

export default Persons
