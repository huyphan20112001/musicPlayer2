const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $(".control-song__title h3");
const ctrlImg = $(".control-song__img img");
const playBtn = $(".play-btn");
const nextBtn = $(".next-btn");
const prevBtn = $(".prev-btn");
const progress = $("#progress");
const cd = $(".song-img");
const randomBtn = $(".random-btn");
const repeatBtn = $(".repeat-btn");
const song = $(".song");
const topPlaylist = $(".top");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isHere: false,
  songs: [
    {
      name: "Xuan Thi",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/xuanthi.mp3",
      image: "./assets/img/xuanthi.jpg",
      minute: "05:46",
    },
    {
      name: "Anh ay co ay",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/anhaycoay.mp3",
      image: "https://i.ytimg.com/vi/mNVCH_ssQcs/maxresdefault.jpg",
      minute: "06:20",
    },
    {
      name: "Co chang trai viet len cay",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/cctvlc.mp3",
      image: "https://i.ytimg.com/vi/0VC6euBtKkk/maxresdefault.jpg",
      minute: "05:41",
    },
    {
      name: "Chi con nhung mua nho",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/chiconnhungmuanho.mp3",
      image: "https://i.ytimg.com/vi/-7aTRKPdtXM/maxresdefault.jpg",
      minute: "05:04",
    },
    {
      name: "Co gai den tu hom qua",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/cogaidetuhomqua.m4a",
      image: "https://i.ytimg.com/vi/1VcvcVgyuW4/maxresdefault.jpg",
      minute: "06:51",
    },
    {
      name: "Con nguyen vet thuong xau",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/connguyenvetthuongsau.mp4",
      image: "https://i.ytimg.com/vi/k9ymMuvuH70/sddefault.jpg",
      minute: "07:53",
    },
    {
      name: "Nguoi tinh mua dong",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/nguoitinhmuadong.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/playlist/share/2019/01/11/c/1/1/7/1547175019821.jpg",
      minute: "04:16",
    },
    {
      name: "Nham mat thay mua he",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/nhammatthaymuahe.m4a",
      image: "https://i.ytimg.com/vi/KFldBN4QRl4/mqdefault.jpg",
      minute: "04:20",
    },
    {
      name: "Thang 4 la loi noi doi cua em",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/thang4llndce.mp3",
      image: "https://i.ytimg.com/vi/UCXao7aTDQM/maxresdefault.jpg",
      minute: "05:49",
    },
    {
      name: "Thang may em nho anh",
      singer: "Ha Anh Tuan",
      path: "./assets/songs/thangmayena.mp3",
      image: "./assets/img/thangmay.jpg",
      minute: "05:00",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index == this.currentIndex ? "active" : ""
            } " data-index=${index}>
              <div class="song-serial">
                <span>${index + 1}</span>
              </div>
              <div class="song-add">
                <i class="fa-solid fa-plus"></i>
              </div>
              <div class="song-img">
                <img src="${song.image}" alt="" />
              </div>
              <div class="song-info">
                <div class="song-name">
                  <span>${song.name}</span>
                </div>
                <div class="song-year">
                  <span>2022</span>
                </div>
              </div>
              <div class="song-time">
                <span>${song.minute}</span>
              </div>
              <div class="song-option">
                <i class="fa-solid fa-ellipsis-vertical option-icon"></i>
              </div>
            </div>
            `;
    });
    $(".top").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cd.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  handleEvent: function () {
    const _this = this;

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      _this.render();
      audio.play();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.classList.add("playing");
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.classList.remove("playing");
    };
    audio.ontimeupdate = function () {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercent;
    };
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    topPlaylist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode) {
        console.log(songNode.dataset.index);
        _this.currentIndex = songNode.dataset.index;
        _this.loadCurrentSong();
        _this.render();
        audio.play();
      }
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.songs.length + 1);
    } while (this.currentIndex === randomIndex);
    this.currentIndex = randomIndex;
    this.loadCurrentSong();
  },
  start: function () {
    //   Dinh nghia cac thuoc tinh cho Object
    this.defineProperties();
    // Xu ly
    this.handleEvent();
    // Tai thong tin bai hat dau tien vao UI khi chay ung dung
    this.loadCurrentSong();
    // Render playlist
    this.render();
  },
};

app.start();
