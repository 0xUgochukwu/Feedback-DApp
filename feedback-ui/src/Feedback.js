import React, { useState, useEffect } from "react";
import Web3 from "web3";
import FeedbackContract from './FeedbackContract.json';

const Feedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const contract = new web3.eth.Contract(FeedbackContract.abi, FeedbackContract.address);
  
      try {
        const messages = await contract.methods.getFeedbackMessages().call();
        setFeedbackMessages(messages);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [submitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(FeedbackContract.abi, FeedbackContract.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.addFeedback(feedbackMessage).send({ from: accounts[0] });
      setFeedbackMessage("");
      setSubmitting(false);
      alert("Feedback added successfully!");

      // Call the fetchData function again to refresh the feedback messages
      setSubmitted(submitted + 1);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div>
          <textarea id="message" rows="4" cols="50"
            value={feedbackMessage}
            onChange={(event) => setFeedbackMessage(event.target.value)}
          />
        </div>
        <button id="submit-btn" type="submit" disabled={submitting}>Submit Feedback</button>
      </form>
      <div className="feedback-messages">
      <h2>Feedback Messages</h2>
        <div className="feedback-content">
            <ul>
        {feedbackMessages.map((message, index) => (
          <li key={index} className="feedback-item">
            <div className="message-container">
            <p className="message">{message.message}</p>
            <p className="sender">{message.sender}</p>
            </div>
            
          </li>
        ))}
      </ul>
        </div>
      
    </div>
    </div>
  );
};

export default Feedback;
