import { useState } from 'react'

function Controlled() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    alert(`Name: ${name}\nEmail: ${email}`)
    setName('')
    setEmail('')
  }

  return (
    <>
      <h1>Controlled Form</h1>
      <form onSubmit={handleForm}>
        <label>
          Enter Your Name
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Enter Your Email
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Controlled
