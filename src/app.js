"use strict";
let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
song.onloadedmetadata = function () {
    progress.max = song.duration.toString();
    progress.value = song.currentTime.toString();
};
function updateProgress() {
    if (song && progress) {
        progress.value = song.currentTime.toString();
        if (!song.paused && !song.ended) {
            requestAnimationFrame(updateProgress);
        }
    }
}
function playPause() {
    if (ctrlIcon.classList.contains("bx-pause")) {
        song.pause();
        ctrlIcon.classList.remove("bx-pause");
        ctrlIcon.classList.add("bx-play");
    }
    else {
        song.play().then(() => {
            ctrlIcon.classList.add("bx-pause");
            ctrlIcon.classList.remove("bx-play");
            updateProgress();
        }).catch(error => {
            console.error('Error al reproducir la canción:', error);
        });
    }
}
progress.oninput = function () {
    song.currentTime = parseFloat(progress.value);
    if (song.paused) {
        ctrlIcon.classList.add("bx-play");
        ctrlIcon.classList.remove("bx-pause");
    }
    else {
        ctrlIcon.classList.add("bx-pause");
        ctrlIcon.classList.remove("bx-play");
    }
};
song.onended = function () {
    ctrlIcon.classList.remove("bx-pause");
    ctrlIcon.classList.add("bx-play");
    progress.value = '0';
    updateProgress();
};
