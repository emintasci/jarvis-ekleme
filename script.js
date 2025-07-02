const correctPassword = "Emin.1073.";

let customCommands = JSON.parse(localStorage.getItem("ai_commands")) || [];

// Giriş kontrolü
function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === correctPassword) {
    document.getElementById("login").style.display = "none";
    document.getElementById("jarvis").style.display = "block";
  } else {
    document.getElementById("loginStatus").innerText = "Hatalı şifre!";
  }
}

// Sesli komut
function startListening() {
  const resultBox = document.getElementById("result");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "tr-TR";
  recognition.start();

  recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    resultBox.innerText = handleCommand(command);
  };

  recognition.onerror = function(event) {
    resultBox.innerText = "Dinleme hatası: " + event.error;
  };
}

// Komut paneli işlemleri
function addCommand() {
  const input = document.getElementById("commandInput").value.trim();
  if (input === "") return;
  customCommands.push(input);
  localStorage.setItem("ai_commands", JSON.stringify(customCommands));
  document.getElementById("commandInput").value = "";
  renderCommands();
}

function clearCommands() {
  customCommands = [];
  localStorage.removeItem("ai_commands");
  renderCommands();
}

function renderCommands() {
  const list = document.getElementById("commandList");
  list.innerHTML = "";
  customCommands.forEach(cmd => {
    const li = document.createElement("li");
    li.textContent = cmd;
    list.appendChild(li);
  });
}

// Komutlara göre yanıt üretme
function handleCommand(command) {
  // Yapay zeka gelişme komutları
  for (let i = 0; i < customCommands.length; i++) {
    if (command.includes("geliş") || command.includes("öğren")) {
      return `Tamam Stark, "${customCommands[i]}" konusunda gelişmeye başlıyorum.`;
    }
  }

  // Sabit komutlar
  if (command.includes("selam")) {
    return "Merhaba Stark, seni bekliyordum.";
  } else if (command.includes("saat")) {
    const now = new Date();
    return "Şu an saat " + now.getHours() + ":" + now.getMinutes();
  } else if (command.includes("gün") || command.includes("tarih")) {
    const now = new Date();
    return "Bugün " + now.toLocaleDateString("tr-TR", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  } else {
    return "Bu komutu anlayamadım.";
  }
}

// Sayfa açılınca komutları listele
window.onload = renderCommands;
