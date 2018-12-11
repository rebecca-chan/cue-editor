import Player from '@vimeo/player';


const playertwo = new Player('playertwo', {
  url: "https://vimeo.com/76979871",
  width: 640
})

playertwo.on('play', function () {
  console.log('player two played!')
})


// An interface for the user to add Cues at certain timestamps.
//     - Should also list the Cues that have been added and allow them to be deleted.
// - While playing the video surface the Cues at the correct times and hide after a duration.
// - A Cue only needs to contain a string.
// - The messages should be displayed as an overlay on the player itself.
// - Only use vanilla javascript and please write all your own CSS.
//ajx
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
