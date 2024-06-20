import { useState } from "react";
import "./RaportPage.css";

const Raport = () => {
  const [email, setEmail] = useState("");

  const sendData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/expense/send-raport/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("Email sent successfully");
        setEmail("");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    sendData();
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container">
      <h1>Send raport on e-mail</h1>
      <div className="container-event">
        <div className="send-raport">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={email}
              placeholder="E-mail..."
              onChange={handleInputChange}
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Raport;
