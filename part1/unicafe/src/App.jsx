  import { useState } from 'react'
  import Button from './Button'
  import StatisticLine from './Statisticline';

  const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const positive = (good / all) * 100 || 0;
    const average = all / 3;
    
    if (all === 0) {
      return (
        <div>
          <p>No feedback given</p>
        </div>
      );
    }


    return (
        <div>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive + " %"} />
        </div>
    );
  }

  const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }

  export default App