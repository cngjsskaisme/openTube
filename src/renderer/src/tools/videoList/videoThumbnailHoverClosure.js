import _ from 'lodash'

export default ({ videoList }) => {
  let registeredCallback = []
  return (videoEntry, index, clearEvent) => {
    videoList.value[index].isThumbnailTransitionStarted = true

    if (clearEvent) {
      _.forEach(registeredCallback, (element) => clearTimeout(element))
      registeredCallback = []
      videoList.value[index].shouldHideThumbnail = false
      videoList.value[index].isThumbnailTransitionStarted = false
      videoList.value[index].isThumbnailTransitionInTheMiddle = false
      return
    }

    if (registeredCallback?.length > 0) {
      _.forEach(registeredCallback, (element) => clearTimeout(element));
      registeredCallback = [];
      return
    }

    registeredCallback.push(setTimeout(() => {
      videoList.value = _.map(videoList.value, (element, innerIndex) => {
        element.isThumbnailTransitionStarted = (innerIndex === index)

        /* Thumbnail Transition Middle (Player Appears & Thumbnail Disappears) */
        registeredCallback.push(setTimeout(() => {
          element.isThumbnailTransitionInTheMiddle = (innerIndex === index)
        }, 80))

        /* Thumbnail Hide */
        registeredCallback.push(setTimeout(() => {
          element.shouldHideThumbnail = (innerIndex === index)
          if (videoSettings.player.playRandomPoint) {
            const currentVideoTag = videoDOMList.value[index].querySelector('video')
            currentVideoTag.currentTime = Math.floor(Math.random() * element.length)
          }
        }, 200))

        return element
      })
    }, 500))
  }
}