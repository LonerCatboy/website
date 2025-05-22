
const videoIds = [
    { id: "8kBlKM71pjc", title: "Cozy Animal Crossing music" },
    { id: "qKEL3E05-nw", title: "City Pop Playlist" },
    { id: "AMcVJmb5mvk", title: "90s Japanese Lofi Hiphop" },
    { id: "-EsLS2v886w", title: "Japanese RnB"},
    { id: "hp-LPRbozoU", title: "Time" },
    { id: "oNXzMBA9VU4", title: "Windows XP Set Up" },
];

let currentVideo = 0;
let player;
let isPlaying = false;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}


function onYouTubeIframeAPIReady() {

    const lastVideoId = getCookie("yt_last_video");
    const index = videoIds.findIndex(v => v.id === lastVideoId);
    currentVideo = index !== -1 ? index : 0;

    const savedTime = loadSeekFromCookie(videoIds[currentVideo].id);

    player = new YT.Player("player", {
        height: "30",
        width: "30",
        videoId: videoIds[currentVideo].id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0
        },
        events: {
            onReady: () => {
                player.setVolume(50);
                updateVideoTitle();

                const savedTime = loadSeekFromCookie(videoIds[currentVideo].id);
                if (savedTime > 0) {
                    player.seekTo(savedTime, true);
                }

                startUpdatingSeek();
            },
            onStateChange: (event) => {
                isPlaying = event.data === YT.PlayerState.PLAYING;
            }
        }
    });
}

function changeVideo(direction) {
    currentVideo = (currentVideo + direction + videoIds.length) % videoIds.length;
    const nextVideoId = videoIds[currentVideo].id;
    const savedTime = loadSeekFromCookie(nextVideoId);

    document.cookie = `yt_last_video=${videoIds[currentVideo].id}; path=/; max-age=31536000`;


    player.loadVideoById({ videoId: nextVideoId, startSeconds: savedTime });
    isPlaying = true;
    updateVideoTitle();
}

function playVideo() {
    if (player && player.playVideo) {
        player.playVideo();
        startUpdatingSeek();
    }
    isPlaying = true;
}

function pauseVideo() {
    if (player && player.pauseVideo) {
        player.pauseVideo();
        stopUpdatingSeek();
    }
    isPlaying = false;
}

function stopVideo() {
    if (player && player.stopVideo) {
        player.stopVideo();
        stopUpdatingSeek();
    }
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

const seekSlider = document.getElementById("seek-slider");
let seekUpdateInterval;

// Update seek slider when video is playing
function startUpdatingSeek() {
    seekUpdateInterval = setInterval(() => {
        if (player && player.getCurrentTime && player.getDuration) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            if (!isNaN(duration) && duration > 0) {
                const percent = (currentTime / duration) * 100;
                seekSlider.value = percent;
                // Save the current time to a cookie every 2 seconds
                if (Math.floor(currentTime) % 2 === 0) {
                    saveSeekToCookie(videoIds[currentVideo].id, currentTime);
                }
            }
        }
    }, 1000);
}


function stopUpdatingSeek() {
    clearInterval(seekUpdateInterval);
}

// Manual video seek
seekSlider.addEventListener("input", () => {
    if (player && player.seekTo && player.getDuration) {
        const duration = player.getDuration();
        const targetTime = (seekSlider.value / 100) * duration;
        player.seekTo(targetTime, true);
        saveSeekToCookie(videoIds[currentVideo].id, targetTime);
    }
});

// Cookie helpers
function saveSeekToCookie(videoId, time) {
    document.cookie = `yt_seek_${videoId}=${Math.floor(time)}; path=/; max-age=604800`; // 7 days
}

function loadSeekFromCookie(videoId) {
    const match = document.cookie.match(new RegExp('(^| )yt_seek_' + videoId + '=([^;]+)'));
    return match ? parseInt(match[2]) : 0;
}

