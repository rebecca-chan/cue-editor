// An interface for the user to add Cues at certain timestamps.
//     - Should also list the Cues that have been added and allow them to be deleted.
// - While playing the video surface the Cues at the correct times and hide after a duration.
// - A Cue only needs to contain a string.
// - The messages should be displayed as an overlay on the player itself.
// - Only use vanilla javascript and please write all your own CSS.
// Avoid using cue point related player API methods (`addCuePoint`, `removeCuePoint`, `getCuePoints`).
//YOU CAN USE events:
// cueChange
// {
//   cues: [
//       {
//           html: "<i>Here at Vimeo, there's always <br>one thing on our minds:</i>",
//           text: "<i>Here at Vimeo, there's always ↵one thing on our minds:</i>"
//       }
//   ],
//   kind: "captions",
//   label: "English CC",
//   language: "en"
// }


// cuepoint
// {
//     time: 15,
//     data: {
//         customKey: 'customValue'
//     },
//     id: "40f5722b-09aa-4060-a887-3c81aaa37cce"
// }


//Try an analagous first step. Any time a little x is clicked, simply log the name of the cue item.


//we should be creating cues here onto the DOM as divs
//we get the value of the input the user is typing from the input form
const cueText = document.getElementById('cue-text')
const cueTextId = cueText.value
console.log(cueTextId)

//then we create a div onto the DOM createElementById, which also includes the delete button


//we need to create a delete button onto the dom, separately


//push all this to a cueArray = []

//cue object looks like this:
// {
//   "time": 15,
//   "data": {
//       "customKey": "customValue"
//   },
//   "id": "09ecf4e4-b587-42cf-ad9f-e666b679c9ab"
// }

// play
// {
//   duration: 61.857
//   percent: 0
//   seconds: 0
// }

export default buildCue;
