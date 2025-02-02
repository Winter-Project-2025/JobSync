function fillInputFields(schema, data) {
  function traverse(schemaNode, dataNode) {
      if (Array.isArray(schemaNode) && Array.isArray(dataNode)) {
          schemaNode.forEach((item, index) => {
              if (dataNode[index] !== undefined) {
                  traverse(item, dataNode[index]);
              }
          });
      } else if (typeof schemaNode === 'object' && schemaNode !== null && typeof dataNode === 'object' && dataNode !== null) {
          Object.keys(schemaNode).forEach(key => {
              if (dataNode.hasOwnProperty(key)) {
                  traverse(schemaNode[key], dataNode[key]);
              }
          });
      } else if (typeof schemaNode === 'string' && schemaNode.trim() !== "") {
          let inputElement = document.getElementById(schemaNode);
          if (inputElement) {
              inputElement.value = dataNode;
              inputElement.dispatchEvent(new Event("input", {bubbles : true}))
          }
      }
  }

  traverse(schema, data);
}



if (localStorage.getItem("server") === "true") {
  const local = localStorage.getItem("user");

  if (local === "true") {
    chrome.storage.local.set({ user: true });
  } else {
    chrome.storage.local.set({ user: false });
  }

  const token = localStorage.getItem("token")
  if(token){
    chrome.storage.local.set({ token: token})
  }
}

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'sendId') {
    const inputFields = document.querySelectorAll('input','textarea');
    const inputFieldsHTML = Array.from(inputFields).map(input => input.outerHTML);
    const token = await chrome.storage.local.get("token")
    
    console.log('Extension received input fields');

    fetch("http://localhost:3000/api/gemini", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token}`
      },
      body: JSON.stringify({ inputFieldsHTML })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const inputid = data.result;
      const resume_data = data.userdata;
      console.log("START");
      fillInputFields(inputid,resume_data)
      console.log("END");
    })
    .catch(error => console.error("Error:", error));
  }
});


