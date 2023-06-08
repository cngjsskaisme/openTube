import _ from 'lodash'

export default async ({ videoList }) => {
  videoList.value = null

  videoList.value = _.map(await window.api.video.getList({
    numberOfPaths: videoSettings.walk.videoListCount,
    verbose: false,
    videoLengthThreshold: videoSettings.walk.videoLengthThreshold
  }), (element) => {
    element.thumbnail = null
    element.shouldHideThumbnail = false
    element.isThumbnailTransitionStarted = false
    element.isThumbnailTransitionInTheMiddle = false
    element.videoPlayer = null
    return element
  })
  _.forEach(videoList.value, async (element, index) => {
    try {
      videoList.value[index].thumbnail = await window.api.video.getVideoThumbnailBase64({
        videoPath: element.path,
        startingPoint: Math.floor(Math.random() * parseFloat(element.length)) || 0
      })
    } catch (e) {

    }
  })
}