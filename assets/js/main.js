const songs = [
  {
    id: 1,
    name: "Có Chắc Yêu Là Đây",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/ccyld1.m4a",
    art: "./assets/images/ccyld1.jpg",
  },
  {
    id: 2,
    name: "Có Chắc Yêu Là Đây - Onionn Remix",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/ccyld.mp3",
    art: "./assets/images/ccyld.jpg",
  },
  {
    id: 3,
    name: "Cơn Mưa Ngang Qua - Disco Ver",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/cmnq.mp3",
    art: "./assets/images/cmnq.png",
  },
  {
    id: 4,
    name: "Chúng Ta Của Hiện Tại",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/ctcht.m4a",
    art: "./assets/images/ctcht.jpg",
  },
  {
    id: 5,
    name: "Em Của Ngày Hôm Qua",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/ecnhq.mp3",
    art: "./assets/images/ecnhq.png",
  },
  {
    id: 6,
    name: "Muộn Rồi Mà Sao Còn",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/mrmsc.mp3",
    art: "./assets/images/mrmsc.jpg",
  },
  {
    id: 7,
    name: "You Of Yesterday",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/yoy.mp3",
    art: "./assets/images/yoy.jpg",
  },
  {
    id: 8,
    name: "Một Năm Mới Bình An",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/mnmba.mp3",
    art: "./assets/images/mnmba.jpg",
  },
  {
    id: 9,
    name: "Âm Thầm Bên Em",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/atbe.mp3",
    art: "./assets/images/atbe.jpg",
  },
  {
    id: 10,
    name: "There's No One At All",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/noaa.mp3",
    art: "./assets/images/noaa.jpg",
  },
  {
    id: 11,
    name: "Cơn mưa xa dần",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/cmxd.mp3",
    art: "./assets/images/cmxd.jpg",
  },
  {
    id: 12,
    name: "Nắng ấm ngang qua",
    author: "Sơn Tùng MTP",
    path: "./assets/songs/nanq.mp3",
    art: "./assets/images/cmxd.jpg",
  },
];
let song_art = document.querySelector(".song-art-item");
let song_name = document.querySelector(".song-info h4");
let song_author = document.querySelector(".song-info h5");
let song_minutes = document.querySelector(".song-minutes");
let song_seconds = document.querySelector(".song-seconds");
let song_range = document.querySelector(".song-range-item");
let text_animation = document.querySelector(".text-animation");
let duration_time = document.querySelector(".durationTime");
let current_time = document.querySelector(".currentTime");
let volume = document.querySelector('.song-volume-input');

let prev_btn = document.querySelector(".prev-btn");
let play_btn = document.querySelector(".play-btn");
let next_btn = document.querySelector(".next-btn");
let loop_btn = document.querySelector(".loop-btn");
let random_btn = document.querySelector(".random-btn");

let audio = document.querySelector("audio");
let list_music = document.querySelector(".list-music");

function renderList() {
  let html = songs.map((e) => {
    return `
      <label for="list-input" class="list-item" onclick="handlePlay(${
        e.id - 1
      })" key="${e.id}">
              <div class="list-avatar">
                  <img class="list-avatar-item"
                  src="${e.art}" alt="">
              </div>
              <div class="list-info">
              <h5>${e.name}</h5>
                  <h6>${e.author}</h6>
                  </div>
      </label>
      `;
  });
  list_music.innerHTML = html.join(" ");
}

var index = 0;
let isPlaying = true;
let isLoop = true;
let firstSong = songs[index];

function renderFirstSong() {
  song_art.setAttribute("src", firstSong.art);
  song_name.innerHTML = firstSong.name;
  song_author.innerHTML = firstSong.author;
  text_animation.innerHTML = firstSong.name;
  audio.src = firstSong.path;
}

displayTimer();
let timer = setInterval(() => {
  displayTimer();
  if (audio.ended) {
    nextSong();
  }
}, 1000);
function handleEvents() {
  // Nút Play
  play_btn.onclick = () => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  audio.onplay = () => {
    song_art.classList.remove("pause");
    song_art.classList.add("play");
    play_btn.children[0].setAttribute("class", "fas fa-pause-circle");
    isPlaying = false;
    timer = setInterval(displayTimer, 1000);
  };
  audio.onpause = () => {
    song_art.classList.add("pause");
    play_btn.children[0].setAttribute("class", "fas fa-play-circle");
    isPlaying = true;
    clearInterval(timer);
  };
  let cc = 0;
  // Phát bài trước đó
  prev_btn.onclick = () => {
    prevSong();
  };
  //   Phát bài tiếp theo
  next_btn.onclick = () => {
    nextSong();
  };
  // Nút lặp lại
  loop_btn.onclick = () => {
    if (isLoop) {
      audio.loop = true;
      isLoop = false;
      loop_btn.style.color = "crimson";
    } else {
      audio.loop = false;
      isLoop = true;
      loop_btn.style.color = "white";
    }
  };
  song_range.onchange = (e) => {
    audio.currentTime = e.target.value;
    // audio.play();
  };
  // Thay đổi âm lượng
  volume.onchange = (e)=>{
    let currentVolume = e.target.value / 100;
    audio.volume = currentVolume;
    console.log(currentVolume);
  }
}

function handlePlay(id) {
  if (id != undefined) {
    index = id;
    song_art.setAttribute("src", songs[id].art);
    song_name.innerHTML = songs[id].name;
    song_author.innerHTML = songs[id].author;
    audio.src = songs[id].path;
    text_animation.innerHTML = songs[id].name;
    audio.play();
  }
}
function prevSong() {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }
  song_art.setAttribute("src", songs[index].art);
  song_name.innerHTML = songs[index].name;
  song_author.innerHTML = songs[index].author;
  audio.src = songs[index].path;
  text_animation.innerHTML = songs[index].name;
  audio.play();
}
function nextSong() {
  index++;
  if (index >= songs.length) {
    index = 0;
  }
  song_art.setAttribute("src", songs[index].art);
  song_name.innerHTML = songs[index].name;
  song_author.innerHTML = songs[index].author;
  audio.src = songs[index].path;
  text_animation.innerHTML = songs[index].name;
  audio.play();
}

function displayTimer() {
  const { duration, currentTime } = audio;
  song_range.max = duration;
  song_range.value = currentTime;
  current_time.innerHTML = formatTimeer(currentTime);
  if (!duration) {
    duration_time.innerHTML = "00:00";
  } else {
    duration_time.innerHTML = formatTimeer(duration);
  }
}

function formatTimeer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

renderFirstSong();
renderList();
handleEvents();
handlePlay();