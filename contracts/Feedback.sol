// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Feedback {
  struct FeedbackMessage {
    string message;
    address sender;
  }

  FeedbackMessage[] public feedbackMessages;

  function addFeedback(string memory _feedbackMessage) public {
    feedbackMessages.push(FeedbackMessage(_feedbackMessage, msg.sender));
  }

  function getFeedbackMessages() public view returns (FeedbackMessage[] memory) {
    return feedbackMessages;
  }
}

