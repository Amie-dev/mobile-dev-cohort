import  { useEffect, useState } from 'react'

function UseEffect() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // This runs when the component mounts or when `count` changes
    console.log("Effect runs: count is", count)

    // Cleanup function runs before the effect re-runs or when component unmounts
    return () => {
      console.log("Cleanup: previous count was", count)
    }
  }, [count]) // dependency array

  return (
    <>
      <h1>useEffect Example</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </>
  )
}

export default UseEffect
