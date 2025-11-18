// Key used for storing chat messages in localStorage
const STORAGE_KEY = "friendchat-messages-v1";

const friend1NameInput = document.getElementById("friend1Name");
const friend2NameInput = document.getElementById("friend2Name");
const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const friend1SenderBtn = document.getElementById("friend1Sender");
const friend2SenderBtn = document.getElementById("friend2Sender");
const clearChatBtn = document.getElementById("clearChat");

let currentSender = "friend1";
let messages = [];

// ----- Storage helpers -----
function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    messages = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Failed to parse stored messages, resetting.", e);
    messages = [];
  }
}

function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// ----- UI helpers -----
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getFriendNames() {
  const friend1 = friend1NameInput.value.trim() || "Friend 1";
  const friend2 = friend2NameInput.value.trim() || "Friend 2";
  return { friend1, friend2 };
}

function renderMessages() {
  const { friend1, friend2 } = getFriendNames();
  chatWindow.innerHTML = "";

  messages.forEach((msg) => {
    const container = document.createElement("div");
    container.className = `message ${msg.sender}`;

    const meta = document.createElement("span");
    meta.className = "meta";

    const senderName =
      msg.sender === "friend1"
        ? msg.friend1Name || friend1
        : msg.friend2Name || friend2;

    meta.textContent = `${senderName} • ${formatTime(msg.timestamp)}`;

    const textDiv = document.createElement("div");
    textDiv.textContent = msg.text;

    container.appendChild(meta);
    container.appendChild(textDiv);
    chatWindow.appendChild(container);
  });

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateSenderButtonLabels() {
  const { friend1, friend2 } = getFriendNames();
  friend1SenderBtn.textContent = friend1 || "Friend 1";
  friend2SenderBtn.textContent = friend2 || "Friend 2";
}

// ----- Event handlers -----
function handleSend() {
  const text = messageInput.value.trim();
  if (!text) return;

  const { friend1, friend2 } = getFriendNames();

  const newMessage = {
    sender: currentSender, // "friend1" or "friend2"
    friend1Name: friend1,
    friend2Name: friend2,
    text,
    timestamp: Date.now(),
  };

  messages.push(newMessage);
  saveMessages();
  renderMessages();

  messageInput.value = "";
  messageInput.focus();
}

friend1SenderBtn.addEventListener("click", () => {
  currentSender = "friend1";
  friend1SenderBtn.classList.add("active");
  friend2SenderBtn.classList.remove("active");
});

friend2SenderBtn.addEventListener("click", () => {
  currentSender = "friend2";
  friend2SenderBtn.classList.add("active");
  friend1SenderBtn.classList.remove("active");
});

sendButton.addEventListener("click", handleSend);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

clearChatBtn.addEventListener("click", () => {
  if (confirm("Clear all chat messages in this browser?")) {
    messages = [];
    saveMessages();
    renderMessages();
  }
});

// Update labels when names change
friend1NameInput.addEventListener("input", () => {
  updateSenderButtonLabels();
  renderMessages(); // refresh labels in bubbles
});

friend2NameInput.addEventListener("input", () => {
  updateSenderButtonLabels();
  renderMessages();
});

// ----- Initial load -----
loadMessages();
updateSenderButtonLabels();
renderMessages();
