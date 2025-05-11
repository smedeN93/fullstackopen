import { useState } from 'react'

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Next anecdote
    </button>
  )
}


const VoteButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      Vote
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  
  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  )

const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0)
const MostVotedAnecdote = ({ mostVotedAnecdote }) => {
  if (mostVotedAnecdote === null) {
    return null
  } else {
    return <p>{anecdotes[mostVotedAnecdote]}</p>
  }
}

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <h1>Anecdote of the day</h1>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />

      <VoteButton handleClick={() => {
        votes[selected] = votes[selected] ? votes[selected] + 1 : 1
        setVotes([...votes])
        setMostVotedAnecdote(votes.indexOf(Math.max(...votes)))
        console.log(`Anecdote: ${anecdotes[selected]}, Votes: ${votes[selected]}`)
      }} />
      <p>has {votes[selected] || 0} votes</p>

      <h2>Anecdote with most votes</h2>

      <MostVotedAnecdote mostVotedAnecdote={mostVotedAnecdote} />

    </div>
  )
}

export default App