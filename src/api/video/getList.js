import _ from "lodash"
import db from "../db/dbInstance"
import getRandomVideoPathsFromDB from "../tools/getRandomVideoPathsFromDB"
import getVideoLength from "../tools/getVideoLength"
import checkFileExist from "../tools/checkFileExist"
import getVideoThumbnailBase64 from "../tools/getVideoThumbnailBase64"
import checkIfSambaAddress from "../tools/checkIfSambaAddress"

const getList = async ({ numberOfPaths, videoLengthThreshold, verbose }) => {
  let paths = await getRandomVideoPathsFromDB({ db, numberOfPaths })
  
  const result = []

  let retryFetchCount = 0

  while (true) {
    retryFetchCount = 0

    for (let i = 0; i < paths.length; i++) {
      const curObject = paths[i]
      verbose && console.log('[getList] Current Video Entry : ', curObject)

      verbose && console.log('[getList] curPathSamba: ', checkIfSambaAddress(curObject.path))
      if (checkIfSambaAddress(curObject.path)) { continue }
      const doesFileExist = await checkFileExist(curObject.path)
      const isDuplicate = _.find(result, (prevEntry) => { return curObject.path === prevEntry.path })
      if (!doesFileExist || isDuplicate) { retryFetchCount += 1; continue}
      
      let currentVideoLength = 0
      try {
        currentVideoLength = parseFloat(await getVideoLength({ videoPath: curObject.path }))
      } catch (e) {
        currentVideoLength = 0
        verbose && console.error('[getList] during getVideoLength:', e)
      }

      if (videoLengthThreshold !== 0 && currentVideoLength < videoLengthThreshold) { retryFetchCount += 1; continue }

      result.push({
        title: curObject.path?.split('\\'),
        path: curObject.path,
        length: currentVideoLength
      })
    }

    if (result.length === numberOfPaths) { break }

    paths = await getRandomVideoPathsFromDB({ db, numberOfPaths: retryFetchCount })
  }

  verbose && console.log('[getList] Result : ', result)
  return result
}

export default getList