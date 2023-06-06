import Ffmpeg from "fluent-ffmpeg"
import stream from 'stream'

// const getVideoThumbnailBase64 = async ({ videoPath, startingPoint = 0 }) => {
//   return new Promise((resolve, reject) => {
//     const randomTime = Math.floor(Math.random() * startingPoint)
//     const bufferStream = new stream.PassThrough()
//     let data = []

//     bufferStream.on('data', chunk => {
//       data.push(chunk)
//     })

//     bufferStream.on('end', () => {
//       resolve(Buffer.concat(data).toString('base64'))
//     })

//     Ffmpeg(videoPath)
//       .outputOptions([
//         '-ss', randomTime,
//         '-vframes', '1',
//         '-s', '1280x720',
//         '-f', 'image2'
//       ])
//       .pipe(bufferStream)
//       .on('error', err => {
//         reject(err)
//       })
//   })
// }

const getVideoThumbnailBase64 = ({ videoPath, startingPoint = 0 }) => {
  return new Promise((resolve, reject) => {
    let screenshotBuffer = Buffer.from([]);
    try {
      Ffmpeg(videoPath)
        .on('end', () => {
          console.log('?')
          resolve(screenshotBuffer)
        })
        .on('error', err => reject(err))
        .screenshots({
          timestamps: ['00:00:05.000'],
          folder: '',
          filename: ''
        })
        .pipe()
        .on('data', chunk => {
          console.log('?')
          screenshotBuffer = Buffer.concat([screenshotBuffer, chunk]);
        });
    } catch (e) {
      console.log(e)
    }
  });
}


export default getVideoThumbnailBase64