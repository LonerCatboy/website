
const videoIds = [
    { id: "8kBlKM71pjc", title: "Cozy Animal Crossing music" },
    { id: "AMcVJmb5mvk", title: "90s Japanese Lofi Hiphop" },
    { id: "hp-LPRbozoU", title: "Time" },
    { id: "oNXzMBA9VU4", title: "Windows XP Set Up" },
    { id: "6bGivPNjbrw", title: "Yuri!!! on Ice Opening" },

];

let currentVideo = 0;
let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "30",
        width: "30",
        videoId: videoIds[currentVideo].id,
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0
        },
        events: {
            onReady: () => {
                player.setVolume(50);
                updateVideoTitle();
            },
            onStateChange: (event) => {
                isPlaying = event.data === YT.PlayerState.PLAYING;
            }
        }
    });
}

function changeVideo(direction) {
    currentVideo = (currentVideo + direction + videoIds.length) % videoIds.length;
    player.loadVideoById(videoIds[currentVideo].id);
    isPlaying = true;
    updateVideoTitle();
}

function playVideo() {
    if (player && player.playVideo) player.playVideo();
    isPlaying = true;
}

function pauseVideo() {
    if (player && player.pauseVideo) player.pauseVideo();
    isPlaying = false;
}

function stopVideo() {
    if (player && player.stopVideo) player.stopVideo();
    isPlaying = false;
}

function setVolume(value) {
    if (player && player.setVolume) {
        player.setVolume(parseInt(value));
    }
}

function updateVideoTitle() {
    const titleLink = document.getElementById("video-title");
    const current = videoIds[currentVideo];
    titleLink.textContent = current.title;
    titleLink.href = `https://www.youtube.com/watch?v=${current.id}`;
}

let isLarge = false;

function toggleVideoSize() {
    if (!player) return;

    isLarge = !isLarge;

    const newWidth = isLarge ? 320 : 30;
    const newHeight = isLarge ? 160 : 30;


    player.setSize(newWidth, newHeight);

    const elementsToToggle = document.querySelectorAll('.wa-hide-on-big');
    elementsToToggle.forEach(el => {
        el.style.display = isLarge ? 'none' : '';
    });
}


// Drag & Drop
const winamp = document.getElementById("winamp-player");
const titleBar = document.getElementById("title-bar");

let offsetX, offsetY, isDragging = false;

titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - winamp.offsetLeft;
    offsetY = e.clientY - winamp.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        winamp.style.left = (e.clientX - offsetX) + "px";
        winamp.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

titleBar.addEventListener("mouseenter", () => {
    titleBar.style.cursor = "move";
});

titleBar.addEventListener("mouseleave", () => {
    titleBar.style.cursor = "default";
});
