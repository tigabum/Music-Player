const audioplay = document.querySelector("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.querySelector("img");
const progress = document.getElementById("progress");
const current = document.getElementById("current-time");
const dur = document.getElementById("duration")
const progressWrapper= document.getElementById("progress-wrapper");


isPlaying = false;

let songs = [
    {
        name:"beki",
        artist:"Beki's song",
        title:"Beki"
    },{
        name:"biruk",
        artist:"biruk's song",
        title:"Biruk"
    },
    {
        name:"dani",
        artist:"Dan's song",
        title:"Dani"
    },
    {
        name:"salem",
        artist:"Salem's choir singer",
        title:"Salem"
    }
]

function playAudio(){
    isPlaying = true;
    audioplay.play();
    play.classList.replace("fa-play", "fa-pause");
    play.setAttribute("title","Pause")

}
function pauseAudio(){
    isPlaying = false
    audioplay.pause();
    play.classList.replace("fa-pause", "fa-play")
    play.setAttribute("title","Play")

}
// setSong(songs[currentSong]);

let currentSong = 0;
function prevSong(){
        currentSong--;
        if(currentSong<0){
            currentSong = songs.length-1;
        }
        console.log(currentSong);
        setSong(songs[currentSong]);
        playAudio();
}
function nextSong(){
    currentSong++;
    if(currentSong== songs.length){
        currentSong=0;
    }
    console.log(currentSong);
    setSong(songs[currentSong]);
    playAudio();
}
setSong(songs[currentSong]);
function setSong(song){
    audioplay.src= `music/${song.name}.mp3`;
    title.textContent = song.title;
    artist.textContent = song.artist;
    image.src = `img/${song.name}.jpg`;
}
function progressBarHandler(e){
    const{currentTime, duration} = e.srcElement;
    // console.log(currentTime, duration);
    let progressPercent = (currentTime/duration)*100;
    // console.log(progressPercent);
    if(isPlaying){
        progress.style.width = `${progressPercent}%`;
    }
    const DuarationMinute = Math.floor(duration/60);
    // console.log(DuarationMinute);
    let DurationSecond = Math.floor(duration % 60);
    // console.log(DurationSecond);
    if(DurationSecond<10){
        DurationSecond= `0${DurationSecond}`;
    }
    if(DuarationMinute){
        dur.textContent = `${DuarationMinute}:${DurationSecond}`;
    }
    
    let CurrentMinute = Math.floor(currentTime/60);
    let CurrentSecond = Math.floor(currentTime %60);
    // console.log(CurrentMinute);
    // console.log(CurrentSecond);
    if(CurrentSecond<10){
        CurrentSecond = `0${CurrentSecond}`;
    }
    if(CurrentSecond){
        current.textContent = `${CurrentMinute}:${CurrentSecond}`
    }


}
function setProgressWrapper(e){
    // console.log(e);
    const width = this.clientWidth;
    const {duration} = audioplay;
    const clickedPlace = e.offsetX;
    audioplay.currentTime = (clickedPlace/width)*duration;
}

play.addEventListener("click",()=>( isPlaying?pauseAudio():playAudio()));
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
audioplay.addEventListener("timeupdate", progressBarHandler);
audioplay.addEventListener("ended", nextSong);
progressWrapper.addEventListener("click",setProgressWrapper);



