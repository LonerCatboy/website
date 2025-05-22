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
    { text: "Wanna be my player 2?", weight: 0.1 },
    { text: "NIS2 Compliant!", weight: 2 },
    { text: "*blushes*", weight: 2 },
    { text: "Who is lonely!?", weight: 1 },
    { text: "Under construction!", weight: 2 },
    { text: "Turn off before 12/12/99!", weight: 2 },
    { text: "Meow :3", weight: 1 },
    { text: "Stop refreshing!", weight: 0.5 },
    { text: "So gonna marry me?", weight: 0.1 },
    { text: "Not a loser's page!", weight: 1 },
    { text: "Stay a while, stay forever!", weight: 1 },
    { text: "Nya nya <3!", weight: 0.05 },
    { text: "M-master!", weight: 1 },
    { text: "Cwute!!", weight: 1 },
    { text: "Work in progress!", weight: 1 },
    { text: "The cutest webpage!", weight: 1 },
    { text: "Feeling lucky?", weight: 1 },
    { text: "Developed on company time!", weight: 1 },
    { text: "Cringetastic!", weight: 0.2 },
    { text: "A green flag!", weight: 0.05 },
    { text: "Not a red flag!", weight: 0.1 },
    { text: "Yaaah!", weight: 1 },
    { text: "Adopt me!", weight: 0.01 },
    { text: "Since 1859!", weight: 1 },
    { text: "Free Sardinia!", weight: 1 },
    { text: "Not so sad huh!", weight: 1 },
    { text: "As seen on TV!", weight: 2 },
    { text: "UwU what's this?", weight: 2 },
    { text: "Welcome to heaven!", weight: 1 },
    { text: "Welcome to hell!", weight: 0.1 },
    { text: "Yay, HTML!", weight: 1 },
    { text: "We're on the internet!", weight: 2 },
    { text: "Hey, what are you exactly looking for here?", weight: 0 },
    { text: "Sort of works on mobile too!", weight: 2 },
    { text: "In color!", weight: 1 }
  ];

    const header_rdtx = [
    { text: "Huh, it's nice to have you there!", weight: 2 },
    { text: "The best website ever (or not)", weight: 2 },
    { text: "My personal website", weight: 2 },
    { text: "Welcome here teeheee~~", weight: 1 },
    { text: "Bruh", weight: 1 },
    { text: "Meow meow meow meow", weight: 2 },
    { text: "Broooo what're ya doing here!?", weight: 0.5 },
    { text: "Have a look around", weight: 1 },
    { text: "Random_Subtitle.txt", weight: 1 },
    { text: "Flashy, isn't it?", weight: 2 },
    { text: "Look at you! You look hella fine!", weight: 1 },
    { text: "What a nice visitor we have here!", weight: 1 },
    { text: "Thanks for visiting", weight: 1 },
    { text: "Tsk! Who are you and why are you here!?", weight: 0.5 },
    { text: "www.loner.it", weight: 1 },
    { text: "Whatever you're thinking, yeah, it isn't false", weight: 1 },
    { text: "You're kinda having fun refreshing the page aren't ya?", weight: 0.3 },
    { text: "Wow you are indeed really going deeper here, but that's kinda it, like, you can know me, like irl", weight: 0 },
    { text: "The coolest website ever (or not?)", weight: 0.1 },
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
  const selected2 = weightedRandom(header_rdtx);
  const quoteBox = document.getElementById("quote-box");
  if (quoteBox && selected) {
    quoteBox.textContent = selected.text;
  }
  const headerSubtitle = document.getElementById("subtitle");
  if (headerSubtitle && selected2) {
    headerSubtitle.textContent = selected2.text;
  }
});

