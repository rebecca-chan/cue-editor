import Player from '@vimeo/player';

//Create instance of Vimeo Player
const player = new Player('player', {
  url: "https://vimeo.com/76979871",
})

//Adds timeupdate listener
player.on('timeupdate', async function () {

  //Display current time in seconds
  const currentTime = await this.getCurrentTime();
  const formattedTime = ~~(currentTime)
  document.getElementById('current').innerHTML = `Current Time In Seconds: ${formattedTime}`

  //Displays cue overlay if a cue time matches player current time
  function displayCues(activeCuesList) {
    activeCuesList.forEach(function (cue) {
      if (Number(cue.time) === ~~(currentTime)) {
        document.getElementById('cue-overlay-text').innerHTML = cue.data.text
      }
      //Cue disappears after 5 seconds
      if (currentTime - cue.time > 5) {
        document.getElementById('cue-overlay-text').innerHTML = ''
      }
    })
  }
  displayCues(activeCues)
})

//Active Cues array to store all our cue instances
let activeCues = []

//Add event listener and makeCue function to Add Cue button
document.getElementById('cue-form').addEventListener('submit', event => {
  event.preventDefault();
  let cueTextEl = document.getElementById('cue-text')
  let cueText = cueTextEl.value
  let cueTime = document.getElementById('cue-time-stamp').value
  makeCue(cueText, cueTime)

  //Resets form to be blank and places cursor back into form
  document.getElementById('cue-text').value = ''
  document.getElementById('cue-time-stamp').value = ''
  cueTextEl.focus()
})


//Let's make a cue!
let cueCounter = 0
const makeCue = (cueText, cueTime) => {
  //First create a remove button for that recently made cue
  const removeButton = document.createElement('button')
  removeButton.className = 'remove-btn'
  removeButton.innerHTML = '✕'

  //Create a Cue List Item with a unique ID
  cueCounter++;
  const cueListItem = document.createElement('div')
  cueListItem.className = 'cue-list-item'
  cueListItem.id = cueCounter

  //Add input text to this Cue List Item
  const newCueText = document.createElement('span')
  newCueText.innerHTML = cueText
  newCueText.className = 'text'
  //Add input time-stamp to Cue List Item
  const newCueTime = document.createElement('span')
  newCueTime.className = 'time'
  newCueTime.innerHTML = `${formatTime(cueTime)} `

  //Format time-stamp appearance into hh:mm:ss
  function formatTime(time) {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;
    let newTime = "";
    if (hrs > 0) {
      newTime += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    newTime += "" + mins + ":" + (secs < 10 ? "0" : "");
    newTime += "" + secs;
    return newTime;
  }

  // Appends child text, time-stamp, and removeButton to list item
  cueListItem.append(newCueText, newCueTime, removeButton)
  document.getElementById('cues-list').append(cueListItem)

  //Define cue object for Player to read
  const newCue = {
    time: cueTime,
    data: { text: cueText },
    id: cueListItem.id
  }

  //Add recently created cue object to activeCues array
  activeCues.push(newCue)

  //Add remove button listener for click, once clicked - removes event listener, and then removes it from the DOM and our activeCues array
  removeButton.addEventListener('click', function remove() {
    removeButton.removeEventListener('click', remove)
    activeCues = activeCues.filter(selected => selected.id !== cueListItem.id)
    cueListItem.remove();
  })
}

//Change Video
document.getElementById('search').addEventListener('click', event => {
  //get input Id from the DOM
  const newVideoEl = document.getElementById('video-url-changer')
  const newVideoId = newVideoEl.value
  const currentVideo = document.getElementById('player')

  //set data-vimeo-url attribute to new URL and load new video
  currentVideo.setAttribute('data-vimeo-url', `https://vimeo.com/${newVideoId}`)
  player.url = `https://vimeo.com/${newVideoId}`
  player.loadVideo(newVideoId)

  //Housekeeping - remove all objects from activeCues array and remove them from the DOM
  activeCues = []
  const removeCueItems = (cues) => [...cues].forEach(cue => cue.remove())
  removeCueItems(document.querySelectorAll(".cue-list-item"))

  //Clear cue overlay in case one is displayed while video is switching
  document.getElementById('cue-overlay-text').innerHTML = ''
})

