<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSettingStore } from '../store/setting'
import _ from 'lodash'
import dayjs from '../tools/provideDayjs'
import videoThumbnailHoverClosure from '../tools/videoList/videoThumbnailHoverClosure'

const settingStore = useSettingStore()

const videoList = ref(null)
const videoDOMList = ref(null)

const videoSettings = reactive({
  player: {
    autoMuted: true,
    playRandomPoint: true
  },
  walk: {
    videoLengthThreshold: 0,
    videoListCount: 12
  }
})

const handleVideoThumbnailHover = videoThumbnailHoverClosure({ videoList })

onMounted(async () => {
  await loadVideo()
})
</script>

<template>
  <label for="settings-player-auto-muted">autoMute</label><input type="checkbox" v-model="videoSettings.player.autoMuted"
    id="settings-player-auto-muted"><br>
  <label for="settings-player-play-random-point">playRandomPoint</label><input type="checkbox"
    v-model="videoSettings.player.playRandomPoint" id="settings-player-play-random-point"><br>
  <label for="settings-walk-video-list-count">videoListCount</label><input type="number"
    v-model="videoSettings.walk.videoListCount" id="settings-walk-video-list-count"><br>
  <label for="settings-walk-video-length-threshold">walkVideoThreshold</label><input type="number"
    v-model="videoSettings.walk.videoLengthThreshold" id="settings-walk-video-length-threshold">
  <div id="main" style="width: 100%; margin-top: 20px; display: flex; justify-content: center;">
    <div style="max-width: 1400px; width: 90%; display: flex; flex-wrap: wrap; justify-content: center;">
      <div v-if="!videoList" v-for="_ in Array(videoSettings.walk.videoListCount)" class="video" style="width: 320px;">
        <div :style="{
          position: 'relative',
          width: '320px',
          height: '180px',
          backgroundImage: 'url(\'https://via.placeholder.com/320x180?text=\')',
          backgroundSize: 'cover',
          cursor: 'pointer',
          borderRadius: '0.8em'
        }" class="thumbnail">
        </div>
        <a style="
            width: 12em;
            word-wrap: break-all;
            font-weight: bold;
            font-size: 1.1em;
            height: 1em;
            border-radius: 0.2em;
            line-height: 1.2em;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 10px;
            background-color: #CCCCCC;
          ">
        </a>
      </div>
      <div v-else v-for="(entry, index) in videoList" ref="videoDOMList" class="video" style="width: 320px;">
        <router-link :to="`/watch/${entry.path}`">
          <div v-if="!entry.shouldHideThumbnail" :style="{
            position: 'relative',
            width: '320px',
            height: '180px',
            backgroundImage: videoList[index]?.thumbnail ?
              `url('${`data:image/png;base64,${videoList[index]?.thumbnail.replace(/(\r\n|\n|\r)/gm, '')}`}')` :
              'url(\'https://via.placeholder.com/320x180?text=Loading+Thumbnail...\')',
            backgroundSize: 'cover',
            cursor: 'pointer',
            borderRadius: entry.isThumbnailTransitionStarted ? 0 : '0.8em',
            opacity: entry.isThumbnailTransitionInTheMiddle ? 0 : 1,
            transition: entry.isThumbnailTransitionStarted ? 'border-radius 0.3s, opacity 0.1s' : null
          }" class="thumbnail" @pointerover="handleVideoThumbnailHover(entry, index)"
            @pointerleave="handleVideoThumbnailHover(entry, index, true)">
            <div style="
                position: absolute;
                bottom: 5px;
                right: 5px;
                background-color: rgba(0, 0, 0, 0.5);
                width: fit-content;
                padding: 4px 7px;
                border-radius: 3px;
                color: white;
                font-weight: bold;
              " :style="{
                opacity: entry.isThumbnailTransitionStarted ? 0 : 1,
                transition: entry.isThumbnailTransitionStarted ? 'all 0.3s' : null
              }">
              {{ dayjs.duration(entry.length * 1000).format(entry.length >= 3600 ? 'H:mm:ss' : 'm:ss') }}
            </div>
          </div>
          <video v-else style="cursor: pointer; background-color: black; width: 320px; height: 180px;" class="video-js"
            preload="auto" controls loop autoplay :muted="videoSettings.player.autoMuted"
            @pointerleave="handleVideoThumbnailHover(entry, index, true)">
            <source :src="`file://${entry.path}`">
            <!-- type="video/mp4" -->
          </video>
          <a style="
              width: 100%;
              word-wrap: break-all;
              font-weight: bold;
              font-size: 1.1em;
              height: 2.4em;
              line-height: 1.2em;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-top: 10px;
            ">
            {{ entry.title[entry.title.length - 1] }}
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>