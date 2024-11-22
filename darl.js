
const form = document.getElementById('form');
const messageArea = document.getElementById('messageArea');
const messageInput = document.getElementById('message');
const nameInput = document.getElementById('myname');

document.addEventListener('keydown', function(event) {
    // Check karte hain ki press ki gayi key 'Enter' hai ya nahi
    if (event.key === 'Enter') {
        myFunction(); // function call
    }
});

function myFunction() {
    console.log("Enter key was pressed!");
    // Yahan aap jo bhi code run karna chahte hain, wo likhen
}

e.preventDefault();

// Get the input values
const username = nameInput.value.trim();
const message = messageInput.value.trim();

if (username && message) {
  // Create a new message bubble
  const messageBubble = document.createElement('div');
  messageBubble.className = 'bg-green-100 text-green-700 p-3 rounded-lg shadow-md w-fit max-w-xs';
  messageBubble.textContent = `${username}: ${message}`;

  // Append the message bubble to the message area
  messageArea.appendChild(messageBubble);

  // Clear the input field
  messageInput.value = '';

  // Scroll the message area to the bottom
  messageArea.scrollTo({
    top: messageArea.scrollHeight,
    behavior: 'smooth', // Smooth scrolling
  });
}
