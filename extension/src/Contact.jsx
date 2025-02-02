import React from "react";

function Contact() {
  const sendButton = () =>{
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'sendId'});
  });
  }
  return (
    <div>
    <div>Welcome to Contact Page</div>
    <button onClick={sendButton}>Print</button>
    </div>
  );
}

export default Contact;
