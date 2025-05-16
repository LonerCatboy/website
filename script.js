const sounds = {
  nya: new Audio("resources/sounds/effects/nya.mp3"),
  click: new Audio("resources/sounds/effects/minecraft-click.mp3"),
  hit: new Audio("resources/sounds/effects/minecraft-hit.mp3"),
  mario64: new Audio("resources/sounds/effects/enter-painting.mp3"),
  explosion: new Audio("resources/sounds/effects/explosion.wav")
};

function makeSound(name) {
  const sound = sounds[name];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  } else {
    console.warn(`Sound "${name}" not found.`);
  }
}

function makeEffect(name) {
  const sound = sounds[name];
  if (sound) {
    const audio = new Audio(sound.src);
    audio.play();
  } else {
    console.warn(`Sound "${name}" not found.`);
  }
}

function toggleTheme() {
  makeSound('click');

  const themes = ['mint', 'desert', 'feminine']; 
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  
  const currentIndex = themes.indexOf(currentTheme);

  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];

  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  showThemeToast(nextTheme);
}

function showThemeToast(themeName) {
  const toast = document.createElement('div');
  toast.className = 'theme-toast';
  toast.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  toast.addEventListener('animationend', () => {
    toast.remove();
  });
}

window.onload = () => openTab('tab4');

(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  else{
    document.documentElement.setAttribute('data-theme', 'mint');
  }
})();

function openTab(tabId) {
  makeSound('click');
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  document.getElementById(tabId).style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {




  const quotes = [
    { text: "Wanna be my player 2?", weight: 2 },
    { text: "NIS2 Compliant!", weight: 2 },
    { text: "*blushes*", weight: 2 },
    { text: "Creepers gonna creep", weight: 1 },
    { text: "Who is lonely!?", weight: 1 },
    { text: "Under construction!", weight: 1 },
    { text: "Turn off before 12/12/99!", weight: 2 },
    { text: "Meow :3", weight: 1 },
    { text: "Stop refreshing!", weight: 0.5 },
    { text: "So gonna marry me?", weight: 0.1 },
    { text: "Not a loser's page!", weight: 1 },
    { text: "Stay a while, stay forever!", weight: 1 },
    { text: "Nya nya <3!", weight: 0.5 },
    { text: "M-master!", weight: 1 },
    { text: "Cwute!!", weight: 1 },
    { text: "You'll be the one?", weight: 1 },
    { text: "Khaaaaaaaaaan!", weight: 1 },
    { text: "Wonderfully misanthrope!", weight: 0.1 },
    { text: "Feeling lucky?", weight: 1 },
    { text: "Developed on company time!", weight: 1 },
    { text: "Cringetastic!", weight: 2 },
    { text: "A green flag!", weight: 1 },
    { text: "Not a red flag!", weight: 1 },
    { text: "Yaaah!", weight: 1 },
    { text: "Adopt me!", weight: 1 },
    { text: "Since 1859!", weight: 1 },
    { text: "Free Sardinia!", weight: 1 },
    { text: "Not so sad!", weight: 1 },
    { text: "As seen on TV!", weight: 2 },
    { text: "UwU what's this?", weight: 2 },
    { text: "I miss you.", weight: 0.01 }
  ];

  function weightedRandom(choices) {
    const totalWeight = choices.reduce((sum, q) => sum + q.weight, 0);
    let r = Math.random() * totalWeight;
    for (const choice of choices) {
      if (r < choice.weight) return choice;
      r -= choice.weight;
    }
  }



  const selected = weightedRandom(quotes);
  const quoteBox = document.getElementById("quote-box");
  if (quoteBox && selected) {
    quoteBox.textContent = selected.text;
  }
});

