function Uncontrolled() {
  const handleForm = (e) => {
    e.preventDefault()
    const name = e.target.elements.name.value
    const email = e.target.elements.email.value

    alert(`Name: ${name}\nEmail: ${email}`)
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
  }

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={handleForm}>
        <label>
          Enter Your Name
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
          />
        </label>
        <br />
        <label>
          Enter Your Email
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Uncontrolled
