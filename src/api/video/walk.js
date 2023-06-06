// Please write me a nodejs code that recursively walk through the folders and save the paths of the video files into the sqlite.
import fs from 'original-fs'
import path from 'path'
import sqlite3 from 'sqlite3'
import dbRunSync from '../db/dbRunSync'

// Function to recursively walk through the folders and save the paths of the video files into the SQLite database
function walk({ dbObject, dir, initRemove }) {
  return new Promise(resolve => {
    const initProcedure = async (dbObject) => {
      if (initRemove) {
        // Drop Table before walk
        await dbRunSync(dbObject, `DROP TABLE IF EXISTS videos`)
        resolve(true)
      }
    
      // Create a table to store the video file paths
      await dbRunSync(dbObject, `CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL
      )`);
    }

    initProcedure(dbObject).then(() => {
      const files = fs.readdirSync(dir)
      console.log(`[info] reading at ${dir}`)
      files.forEach(async file => {
        let filePath = path.join(dir, file);
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
          await walk({ dbObject, dir: filePath, initRemove: false });
        } else if (stats.isFile()) {
          // Check if the file is a video file
          let ext = path.extname(file).toLowerCase();
          if (ext === '.mp4' || ext === '.avi' || ext === '.mov' || ext === '.wmv') {
            // Save the file path into the SQLite database
            await dbRunSync(dbObject, `INSERT INTO videos(path) VALUES(?)`, filePath)
          }
        }
      })
      resolve(true)
    })
  })
}

module.exports = walk