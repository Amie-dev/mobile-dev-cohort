import { useState } from 'react'
import FormHandling from './components/FormHandling'

function App() {
  const [count, setCount] = useState(0)
  const [isDark, setIsDark] = useState(true)

  const changeTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <div 
      className="container" 
      style={{ 
        backgroundColor: isDark ? "black" : "white", 
        color: isDark ? "white" : "black", 
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>Count : {count}</h2>
      <button onClick={() => setCount(count + 1)}>Count++</button>
      <button onClick={() => setCount(prev => prev + 1)}>Count++ (prev)</button>

      <div style={{ marginTop: "20px" }}>
        <button onClick={changeTheme}>
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <FormHandling/>
    </div>
  )
}

export default App
