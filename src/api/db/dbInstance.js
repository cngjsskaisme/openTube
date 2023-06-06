import sqlite3 from "sqlite3"

const db = new sqlite3.Database('./videos.db', (err) => {
  console.log(err)
  if (err) { throw err }
})

export default db