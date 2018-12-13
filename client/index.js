import Player from '@vimeo/player';
console.log('hello from webpack')

const playertwo = new Player('playertwo', {
  url: "https://vimeo.com/76979871",
  width: 640
})

playertwo.on('play', function () {
  console.log('player two played without scriptsrc!')
})



const activeCues = []

//i want to display current time in case the uer wants to know where he/she is. will probably have to throttle because the rate is too ridic
// const currentTime = playertwo.getCurrentTime()
// console.log(currentTime)
// const currentTimeDisplay = document.getElementById('cue-time-stamp')
// currentTimeDisplay.className = 'cue-time-stamp'
// currentTimeDisplay.innerHTML = currentTime


//we should be adding cue overlays to the video player here


document.getElementById('cue-form').addEventListener('submit', event => {
  event.preventDefault();
  const cueText = document.getElementById('cue-text').value
  console.log('cueText', cueText)
  const cueTime = document.getElementById('cue-time-stamp').value
  console.log('cueTime', cueTime)
  makeCue(cueText, cueTime)
})


//makes Cue object after submit button is clicked!
let cueCounter = 0
const makeCue = (cueText, cueTime) => {
  const removeButton = document.createElement('button')
  removeButton.className = 'remove-btn'
  removeButton.innerHTML = 'x'

  cueCounter++;
  const cueListItem = document.createElement('li')
  cueListItem.className = 'cue-list-item'
  cueListItem.id = cueCounter
  const newCueText = document.createElement('p')
  newCueText.innerHTML = cueText
  const newCueTime = document.createElement('p')
  newCueTime.innerHTML = `:${cueTime}secs `
  cueListItem.append(newCueTime, newCueText, removeButton)
  document.getElementById('cues-list').append(cueListItem)
  console.log('before push', activeCues)

  const newCue = {
    time: cueTime,
    data: {
      text: cueText
    },
    id: cueListItem.id
  }

  activeCues.push(newCue)
}
console.log('after push', activeCues)

//cue object looks like this:
// {
//   "time": 15,
//   "data": {
//       "customKey": "customValue"
//   },
//   "id": "09ecf4e4-b587-42cf-ad9f-e666b679c9ab"
// }


// An interface for the user to add Cues at certain timestamps.
//     - Should also list the Cues that have been added and allow them to be deleted.
// - While playing the video surface the Cues at the correct times and hide after a duration.
// - A Cue only needs to contain a string.
// - The messages should be displayed as an overlay on the player itself.
// - Only use vanilla javascript and please write all your own CSS.
// Avoid using cue point related player API methods (`addCuePoint`, `removeCuePoint`, `getCuePoints`).


//you could do an ajax call into the vimeo api - maybe api by video id??
// you would need a separate cues db for persistence
// const ajax = async () => {
//   try {
//     const result = await fetch('/api');
//     const data = await result.json();
//     console.log(data);
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

// ajax();

