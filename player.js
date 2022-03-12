const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const range = document.getElementById('volume-control');



// Song titles
const songs = ['Call you mine', 'Dont let me down','Style', 'Young blood'];


// Keep track of song
let songIndex = 1;


// Initially load song details into DOM
loadSong(songs[songIndex]);


// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `images/${song}.jpg`;

}


// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play-circle');
  playBtn.querySelector('i.fas').classList.add('fa-pause-circle');
  audio.play();
}


// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play-circle');
  playBtn.querySelector('i.fas').classList.remove('fa-pause-circle');


  audio.pause();

}


// Previous song
function prevSong() {
  songIndex--;


  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }


  loadSong(songs[songIndex]);


  playSong();
}


// Next song
function nextSong() {
  songIndex++;


  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }


  loadSong(songs[songIndex]);


  playSong();
}


// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

}

//time stamps

function timestamps(e){
  const {duration, currentTime} = e.srcElement;
  let min_d = Math.floor(duration/60);
  let sec_d = Math.floor(duration%60);
  let min_c = Math.floor(currentTime/60);
  let sec_c = Math.floor(currentTime%60);

  document.getElementById('current-time').innerHTML = min_c +':'+ sec_c;

  if(duration){
    document.getElementById('total-time').innerHTML = min_d +':'+ sec_d;
  }
  if(sec_c < 10){
    document.getElementById('current-time').innerHTML = min_c +':'+ '0' + sec_c;
  }
  if(sec_d < 10){
    document.getElementById('total-time').innerHTML = min_d +':'+ '0'+ sec_d;
  }

}


// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

}




// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');


  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time/song update
audio.addEventListener('timeupdate', updateProgress);


// Click on progress bar
progressContainer.addEventListener('click', setProgress);


// Song ends
audio.addEventListener('ended', nextSong);


// Time of song
audio.addEventListener('timeupdate', timestamps);

//change volume
range.addEventListener("change", () =>{
  audio.volume=range.value/100;

})



