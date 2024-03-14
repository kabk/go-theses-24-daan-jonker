const mijnSrubber = (container) => {
  // Globale variabele om afspelen video te beperken tot binnen de timeline
  let insideTimeline = false;

  // slider
  // var timelineContainer = document.querySelector(".container")
  var timelineContainer = container
  // var container = document.querySelector('.container');
  container.querySelector('.slider').addEventListener('input', (e) => {
    container.style.setProperty('--position', `${e.target.value}%`);
    console.log(`${e.target.value}%`)
  })


  // Timeline
  var videoContainer = document.querySelector(".video-container")
  var video = document.querySelector("video")
  // timelineContainer.addEventListener("mousedown", toggleScrubbing)
  // document.addEventListener("mouseup", e => {
  //   if (isScrubbing) toggleScrubbing(e)
  // })

  // Video alleen afspelen wanneer muis binnen de timeline én tijdens mousedown
  timelineContainer.addEventListener("mousedown", () => insideTimeline = true)
  timelineContainer.addEventListener("mouseup", () => insideTimeline = false)
  timelineContainer.addEventListener("mousemove", e => toggleScrubbing(e))


  function toggleScrubbing(e) {
    var rect = timelineContainer.getBoundingClientRect()
    var percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    isScrubbing = (e.buttons & 1) === 1
    videoContainer.classList.toggle("scrubbing", isScrubbing)
    if (insideTimeline) {
      //   wasPaused = video.paused
      //   video.pause()
      // } else {
      video.currentTime = percent * video.duration
      //   if (!wasPaused) video.play()
    }

    handleTimelineUpdate(e)
  }

  function handleTimelineUpdate(e) {
    var rect = timelineContainer.getBoundingClientRect()
    var percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    // var previewImgNumber = Math.max(
    //   1,
    //   Math.floor((percent * video.duration) / 10)
    // )
    // previewImg.src = previewImgSrc
    timelineContainer.style.setProperty("--preview-position", percent)

    if (isScrubbing) {
      // e.preventDefault()
      // thumbnailImg.src = previewImgSrc
      timelineContainer.style.setProperty("--progress-position", percent)
    }
  }


}

// Verzamel alls sliders in één array
let mijnSliders = document.querySelectorAll('.container');

// Voor elke item in de verzamelde slidersarray, pas de functie toe
window.addEventListener('DOMContentLoaded', () => [...mijnSliders].forEach(item => mijnSrubber(item)))


