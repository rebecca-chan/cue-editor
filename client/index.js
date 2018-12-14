import Player from '@vimeo/player';

const playertwo = new Player('playertwo', {
  url: "https://vimeo.com/76979871",
})

playertwo.on('timeupdate', async function () {
  const currentTime = await this.getCurrentTime();
  const formattedTime = Math.round(currentTime)
  document.getElementById('current').innerHTML = `Current Time In Seconds: ${formattedTime}`

  function displayCues(activeCuesList) {
    activeCuesList.forEach(function (cue) {
      if (Number(cue.time) === ~~(currentTime)) {
        document.getElementById('cue-overlay-text').innerHTML = cue.data.text
      }
      if (currentTime - cue.time > 5) {
        document.getElementById('cue-overlay-text').innerHTML = ''
      }
    })
  }
  displayCues(activeCues)
})

//activeCues gets populated by form with cue objects
let activeCues = []

//adds event listener to cue submit Form
document.getElementById('cue-form').addEventListener('submit', event => {
  event.preventDefault();
  let cueText = document.getElementById('cue-text').value
  let cueTime = document.getElementById('cue-time-stamp').value
  makeCue(cueText, cueTime)


  //reset form
  document.getElementById('cue-text').value = ''
  document.getElementById('cue-time-stamp').value = ''
})


//define makeCue function
let cueCounter = 0
const makeCue = (cueText, cueTime) => {
  //create removeButton
  const removeButton = document.createElement('button')
  removeButton.className = 'remove-btn'
  removeButton.innerHTML = '✕'

  //create cue list item with id
  cueCounter++;
  const cueListItem = document.createElement('div')
  cueListItem.className = 'cue-list-item'
  cueListItem.id = cueCounter

  //create text inside cue list item
  const newCueText = document.createElement('span')
  newCueText.innerHTML = cueText
  newCueText.className = 'text'
  //adds time-stamp inside cue list item
  const newCueTime = document.createElement('span')
  newCueTime.className = 'time'
  newCueTime.innerHTML = `${formatTime(cueTime)} `

  //formats time appearance into hh:mm:ss in cues list
  function formatTime(time) {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  // appends text, time-stamp, and removeButton in list item
  cueListItem.append(newCueText, newCueTime, removeButton)
  document.getElementById('cues-list').append(cueListItem)

  //creates cue object for Player to read
  const newCue = {
    time: cueTime,
    data: {
      text: cueText
    },
    id: cueListItem.id
  }

  //adds cue object to activeCues array
  activeCues.push(newCue)

  //add removeButton Listener, removes event listener, and then removes it from the DOM and our activeCues array
  removeButton.addEventListener('click', function remove() {
    removeButton.removeEventListener('click', remove)
    activeCues = activeCues.filter(selected => selected.id !== cueListItem.id)
    cueListItem.remove();
  })
}



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

