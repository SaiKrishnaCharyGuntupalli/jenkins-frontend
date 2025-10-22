import React, { useEffect, useState } from "react";

function Welcome() {
  const [initialMessage, setInitialMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showResponsePage, setShowResponsePage] = useState(false);

  // const API_BASE="https://fmnf7cnreh6lpgbbu42jpp2j4e0tjegf.lambda-url.ap-south-1.on.aws/"
  // 1. Call FastAPI GET endpoint on page load
  useEffect(() => {
    // fetch(`${API_BASE}`) // <-- FastAPI backend running
    // fetch(`http://127.0.0.1:8000`) // <-- FastAPI backend running
    // fetch(`http://13.127.203.26:8000`) // <-- FastAPI backend running
    // fetch(`https://new_project.com/api/`) // <-- FastAPI backend running
    fetch(`https://fastapiec.vidyayug.com/api/`) // <-- FastAPI backend running
      .then((res) => res.json())
      .then((data) => setInitialMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // 2. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await fetch(`${API_BASE}/welcome`, {
      // const res = await fetch(`http://127.0.0.1:8000/welcome`, {   //with local ip address
      // const res = await fetch(`http://13.127.203.26:8000/welcome`, {  //with public ip address
      // const res = await fetch(`https://new_project.com/api/welcome`, {  //with domain pointing to ip address by self signed
      const res = await fetch(`https://fastapiec.vidyayug.com/api/welcome`, {  //with real domain pointing to ip address 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue }),
      });

      const data = await res.json();
      setResponseMessage(data.message);
      setShowResponsePage(true); // Switch to new page
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  // 3. Show new page with centered response
  if (showResponsePage) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        <h1>{responseMessage}</h1>
      </div>
    );
  }

  // 4. Show initial page
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{initialMessage}</h1>
      <h3>If you want this application entr your name!</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Welcome;
