const songs = [
  { title: "SoundHelix 1", artist: "Artist 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "SoundHelix 2", artist: "Artist 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "SoundHelix 3", artist: "Artist 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];
const audio = document.getElementById('audio'), titleEl = document.getElementById('title'), artistEl = document.getElementById('artist'), playBtn = document.getElementById('play'), progress = document.getElementById('progress'), curr = document.getElementById('curr'), dur = document.getElementById('dur'), volume = document.getElementById('volume'), playlistEl = document.getElementById('playlist');
let idx = 0, isPlaying = false;

function loadSong(i) { idx = i; audio.src = songs[i].src; titleEl.textContent = songs[i].title; artistEl.textContent = songs[i].artist; document.querySelectorAll('#playlist li').forEach((li, j) => li.classList.toggle('active', j === i)); }
function playSong() { audio.play(); isPlaying = true; playBtn.textContent = '⏸'; }
function pauseSong() { audio.pause(); isPlaying = false; playBtn.textContent = '▶'; }

songs.forEach((s, i) => { const li = document.createElement('li'); li.textContent = `${s.title} - ${s.artist}`; li.onclick = () => { loadSong(i); playSong(); }; playlistEl.appendChild(li); });
loadSong(0);

playBtn.onclick = () => isPlaying ? pauseSong() : playSong();
document.getElementById('prev').onclick = () => { idx = (idx - 1 + songs.length) % songs.length; loadSong(idx); playSong(); };
document.getElementById('next').onclick = () => { idx = (idx + 1) % songs.length; loadSong(idx); playSong(); };
audio.ontimeupdate = () => { progress.value = (audio.currentTime / audio.duration) * 100 || 0; curr.textContent = `${Math.floor(audio.currentTime / 60)}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')}`; };
audio.onloadedmetadata = () => { dur.textContent = `${Math.floor(audio.duration / 60)}:${String(Math.floor(audio.duration % 60)).padStart(2, '0')}`; };
progress.oninput = () => audio.currentTime = (progress.value / 100) * audio.duration;
volume.oninput = () => audio.volume = volume.value;
audio.onended = () => { if (document.getElementById('autoplay').checked) { document.getElementById('next').click(); } else { pauseSong(); } };
audio.volume = 0.7;