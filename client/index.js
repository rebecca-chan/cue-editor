import Player from '@vimeo/player';
console.log('hello from webpack')

const playertwo = new Player('playertwo', {
  url: "https://vimeo.com/76979871",
  width: 640
})

playertwo.on('play', function () {
  console.log('player two played')
})

playertwo.on('timeupdate', async function () {
  const currentTime = await this.getCurrentTime();
  // function formatTime(time) {
  //   var hrs = ~~(time / 3600);
  //   var mins = ~~((time % 3600) / 60);
  //   var secs = ~~time % 60;
  //   var ret = "";
  //   if (hrs > 0) {
  //     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  //   }
  //   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  //   ret += "" + secs;
  //   return ret;
  // }
  // const formattedTime = formatTime(currentTime)
  const formattedTime = Math.round(currentTime)
  document.getElementById('current').innerHTML = `Current Time In Seconds: ${formattedTime}`

  function displayCues(list) {
    // console.log('cuepoints activeCuesList', list)
    list.forEach(function (cue) {
      if (Number(cue.time) === Math.round(currentTime)) {
        document.getElementById('cue-overlay-text').innerHTML = cue.data.text
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
  console.log('cueText', cueText)
  let cueTime = document.getElementById('cue-time-stamp').value
  console.log('cueTime', cueTime)
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
  removeButton.innerHTML = 'x'

  //create cue list item with id
  cueCounter++;
  const cueListItem = document.createElement('li')
  cueListItem.className = 'cue-list-item'
  cueListItem.id = cueCounter

  //create text inside cue list item
  const newCueText = document.createElement('span')
  newCueText.innerHTML = cueText
  //adds time-stamp inside cue list item
  const newCueTime = document.createElement('span')
  newCueTime.innerHTML = `:${cueTime}secs `

  //appends text, time-stamp, and removeButton in list item
  cueListItem.append(newCueTime, newCueText, removeButton)
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

  //add removeButton Listener
  removeButton.addEventListener('click', function remove() {
    //remove event listener
    removeButton.removeEventListener('click', remove)
    //remove cue from list
    activeCues = activeCues.filter(selected => selected.id !== cueListItem.id)
    //remove cue from the DOM
    cueListItem.remove();
  })

}
console.log('after push', activeCues)



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

