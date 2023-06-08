import _ from 'lodash'
import { defineStore } from "pinia"

export const useSettingStore = defineStore('setting', {
  state: () => ({
    setting: {
      video: {
        lengthThreshold: 0,
        list: {
          thumbnailAutoMuted: true,
          thumbnailPlayingDebounceTime: 1,
          thumbnailPlayRandomPoint: true,
          listVideosCount: 12,
          listCrawlDefaultPaths: [],
          listCrawlExceptionPaths: [],
        },
        playlist: {
          lastAddedPlaylist: ''
        },
        view: {
          keymap: {
            volumeUp: 38,
            volumenDown: 40,
            playPauseKey: 32,
            playForward: 37,
            playBackward: 39,
            playRandom: 90,
            addToPlaylist: 88
          },
          playbackSeekTime: 10,
          playRandomDebounceTime: 1
        }
      }
    }
  }),
  actions: {
    setSetting(settingObject) {
      this.setting = _.merge(this.setting, settingObject)
    }
  }
})