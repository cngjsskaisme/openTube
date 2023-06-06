import fs from 'fs'

async function checkFileExist(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true
  } catch {
    return false
  }
}

export default checkFileExist