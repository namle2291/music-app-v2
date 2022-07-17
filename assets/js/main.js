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
    path: "./assets/songs/ctcht.mp3",
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
];
let song_art = document.querySelector(".song-art-item");
let song_name = document.querySelector(".song-info h4");
let song_author = document.querySelector(".song-info h5");
let song_minutes = document.querySelector(".song-minutes");
let song_seconds = document.querySelector(".song-seconds");
let song_range = document.querySelector(".song-range-item");

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
  audio.src = firstSong.path;
}

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
  };
  audio.onpause = () => {
    song_art.classList.add("pause");
    play_btn.children[0].setAttribute("class", "fas fa-play-circle");
    isPlaying = true;
  };
  let cc = 0;
  // Phát bài trước đó
  prev_btn.onclick = () => {
    index--;
    if (index < 0) {
      index = songs.length - 1;
    }
    song_art.setAttribute("src", songs[index].art);
    song_name.innerHTML = songs[index].name;
    song_author.innerHTML = songs[index].author;
    audio.src = songs[index].path;
    audio.play();
  };
  //   Phát bài tiếp theo
  next_btn.onclick = () => {
    index++;
    if (index >= songs.length) {
      index = 0;
    }
    song_art.setAttribute("src", songs[index].art);
    song_name.innerHTML = songs[index].name;
    song_author.innerHTML = songs[index].author;
    audio.src = songs[index].path;
    audio.play();
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
      loop_btn.style.color = "black";
    }
  };
  song_range.onchange = (e) => {
    let tongsogiay = Math.floor(audio.duration);
    console.log(tongsogiay);
  };
}

function handlePlay(id) {
  if (id != undefined) {
    index = id;
    song_art.setAttribute("src", songs[id].art);
    song_name.innerHTML = songs[id].name;
    song_author.innerHTML = songs[id].author;
    audio.src = songs[id].path;
    audio.play();
  }
}

renderFirstSong();
renderList();
handleEvents();
handlePlay();
