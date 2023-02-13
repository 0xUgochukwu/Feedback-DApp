import React, { useState } from "react";
import Web3 from "web3";
import FeedbackContract from './FeedbackContract.json';



const Feedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(FeedbackContract.abi, FeedbackContract.address);

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(contract);
      await contract.methods.addFeedback(feedbackMessage).send({ from: accounts[0] });
      alert("Feedback added successfully!");
    } catch (error) {
      console.error(error);
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
      <button id="submit-btn" type="submit">Submit Feedback</button>
    </form>
</div>
  );
};

export default Feedback;
