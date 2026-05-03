import { useState } from "react";

// Controlled vs Uncontrolled Form Example
function FormHandling() {
  // Controlled form state
  const [controlledInput, setControlledInput] = useState("");

  // Uncontrolled form ref
  // const uncontrolledInputRef = useRef(null)


  const handleControlledSubmit = (e) => {
    e.preventDefault();
    alert(`Controlled Input Value: ${controlledInput}`);
  };

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    alert(`Uncontrolled Input Value: ${e.target.elements.name.value}`);

    // ${uncontrolledInputRef.current.value}
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Form Handling</h1>

      {/* Controlled Form */}
      <form onSubmit={handleControlledSubmit} style={{ marginBottom: "20px" }}>
        <h2>Controlled Form</h2>
        <input
          type="text"
          value={controlledInput}
          onChange={(e) => setControlledInput(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit">Submit Controlled</button>
      </form>

      {/* Uncontrolled Form */}
      <form onSubmit={handleUncontrolledSubmit}>
        <h2>Uncontrolled Form</h2>
        <input type="text" name="name" 
        
        // ref={uncontrolledInputRef}

        placeholder="Type something..." />
        <button type="submit">Submit Uncontrolled</button>
      </form>
    </div>
  );
}

export default FormHandling;
