const $ = document

const audioElem = $.querySelector('audio')
const btnNextMusicElem = $.querySelector('.next-music')
const btnPlayAndPauseMusicElem = $.querySelector('.play-pause-music')
const iconPlayAndPauseMusicElem = $.querySelector('.icon-play-pause')
const btnPreviousMusicElem = $.querySelector('.previous-music')
const photoMusicElem = $.querySelector('.image-music')
const nameWorkMusicElem = $.querySelector('.name-work')
const singerNameMusicElem = $.querySelector('.singer-name')
const currentTimeMusicElem = $.querySelector('.current-time-music')
const totalTimeMusicElem = $.querySelector('.total-time-music')
const btnPlayPauseMusicElem = $.querySelector('.play-pause-music')
const rangeMusicTimeElem = $.querySelector('#range-music-time')


let musicsInfosArray = [
    { id: 1, title: 'Sefareshi', singerName: 'Yas', srcMusic: './music/Sefareshi.mp3', imgMusic: './image/yas-sefareshi.jpg', durationTime: 337 },
    { id: 2, title: 'Naadideh', singerName: 'Bahram', srcMusic: './music/02 Naadideh.mp3', imgMusic: './image/bahram-naadideh.jpg', durationTime: 236 },
    { id: 3, title: 'Band Naaf Ta Khatte Saaf', singerName: 'Yas', srcMusic: './music/Band Naaf Ta Khatte Saaf.mp3', imgMusic: './image/Yas-Bande-Naaf-Ta-Khate-Saaf.jpg', durationTime: 321 },
    { id: 4, title: 'Lose Your Self', singerName: 'Eminem', srcMusic: './music/eminem_lose_yourself.mp3', imgMusic: './image/eminem-lose-your-self.jpg', durationTime: 326 },
    { id: 5, title: 'Barcode', singerName: 'Yas', srcMusic: './music/Barcode.mp3', imgMusic: './image/Yas-Barcode.jpg', durationTime: 204 },
]
let musicIndex = 0
let mainMusicIndex = 0
let durationTimeMainMusic = null
let currentTimeMainMusic = null
let mainMusic = null


btnNextMusicElem.addEventListener('click', () => {
    showCurrentTimeMusicInDom()
    nextMusicHandler()
    iconPlayAndPauseMusicElem.setAttribute('src', './image/icons/pause.svg')
    audioElem.play()

})

btnPlayAndPauseMusicElem.addEventListener('click', () => {
    showCurrentTimeMusicInDom()
    playOrPauseMusicHandler()
})

$.addEventListener('keyup', e => {
    if (e.keyCode === 32) {
        showCurrentTimeMusicInDom()
        playOrPauseMusicHandler()
    }
})

btnPreviousMusicElem.addEventListener('click', () => {
    showCurrentTimeMusicInDom()
    prevMusicHandler()
    iconPlayAndPauseMusicElem.setAttribute('src', './image/icons/pause.svg')
    audioElem.play()

})

function nextMusicHandler() {
    if (musicIndex < 4) {
        musicIndex++
    } else {
        musicIndex = 0
    }

    durationTimeMainMusic = musicsInfosArray[musicIndex].durationTime

    let durationMinutesMusic = Math.floor(durationTimeMainMusic / 60);
    let durationSecondsMusic = Math.floor(durationTimeMainMusic % 60);

    if (durationMinutesMusic < 10) {
        totalTimeMusicElem.innerHTML = '0' + durationMinutesMusic + ':' + durationSecondsMusic

    } else {
        totalTimeMusicElem.innerHTML = durationMinutesMusic + ':' + durationSecondsMusic
    }

    if (durationSecondsMusic < 10) {
        totalTimeMusicElem.innerHTML = `${durationMinutesMusic}:0${durationSecondsMusic}`
    }

    showMusicInfosInDom()
}

function prevMusicHandler() {
    if (musicIndex <= 0) {
        musicIndex = musicsInfosArray.length - 1
    } else {
        musicIndex--
    }

    durationTimeMainMusic = musicsInfosArray[musicIndex].durationTime

    let durationMinutesMusic = Math.floor(durationTimeMainMusic / 60);
    let durationSecondsMusic = Math.floor(durationTimeMainMusic % 60);

    if (durationMinutesMusic < 10) {
        totalTimeMusicElem.innerHTML = '0' + durationMinutesMusic + ':' + durationSecondsMusic

    } else {
        totalTimeMusicElem.innerHTML = durationMinutesMusic + ':' + durationSecondsMusic
    }

    if (durationSecondsMusic < 10) {
        totalTimeMusicElem.innerHTML = `${durationMinutesMusic}:0${durationSecondsMusic}`
    }

    showMusicInfosInDom()
}

function playOrPauseMusicHandler() {
    if (iconPlayAndPauseMusicElem.getAttribute('src') === './image/icons/play.svg') {
        iconPlayAndPauseMusicElem.setAttribute('src', './image/icons/pause.svg')
        audioElem.play()

    } else {
        iconPlayAndPauseMusicElem.setAttribute('src', './image/icons/play.svg')
        audioElem.pause()
    }
}

function showMusicInfosInDom() {
    mainMusicIndex = musicsInfosArray[musicIndex]

    $.body.style.backgroundImage = `url("${mainMusicIndex.imgMusic}")`
    photoMusicElem.setAttribute('src', `${mainMusicIndex.imgMusic}`)
    nameWorkMusicElem.innerHTML = mainMusicIndex.title
    singerNameMusicElem.innerHTML = mainMusicIndex.singerName
    audioElem.setAttribute('src', `${mainMusicIndex.srcMusic}`)
    return audioElem.setAttribute('src', `${mainMusicIndex.srcMusic}`)
}

function showCurrentTimeMusicInDom() {
    setInterval(function () {
        currentTimeMainMusic = Math.floor(audioElem.currentTime)
        durationTimeMainMusic = Math.trunc(audioElem.duration)

        let currentMinutesMusic = Math.floor(currentTimeMainMusic / 60);
        let currentSecondsMusic = Math.floor(currentTimeMainMusic % 60);

        rangeMusicTimeElem.max = durationTimeMainMusic
        rangeMusicTimeElem.value = currentTimeMainMusic

        if (currentMinutesMusic < 10) {
            if (currentSecondsMusic > 60) {
                currentTimeMusicElem.innerHTML = `0${currentMinutesMusic}:` + currentSecondsMusic
            }
            if (currentSecondsMusic < 10) {
                currentSecondsMusic = currentSecondsMusic.toString().padStart(2, '0');
                currentTimeMusicElem.innerHTML = currentSecondsMusic
                currentTimeMusicElem.innerHTML = `0${currentMinutesMusic}:` + currentSecondsMusic
            }
            if (currentSecondsMusic < 60) {
                currentTimeMusicElem.innerHTML = `0${currentMinutesMusic}:` + currentSecondsMusic
            }
        }
        if (currentTimeMainMusic === durationTimeMainMusic) {
            currentTimeMusicElem.innerHTML = '00:00'
            currentTimeMainMusic = 0
            iconPlayAndPauseMusicElem.setAttribute('src', './image/icons/play.svg')
            rangeMusicTimeElem.max = 0
            rangeMusicTimeElem.value = 0
        }
    }, 1000)
}

window.addEventListener('load', () => {
    showCurrentTimeMusicInDom()
})