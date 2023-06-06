const getRandomVideoPathsFromDB = async ({ db, numberOfPaths }) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT path FROM videos ORDER BY RANDOM() LIMIT ?`, [numberOfPaths || 1], (err, rows) => {
      if (err) { reject(err) }
      resolve(rows)
    })
  })
}

export default getRandomVideoPathsFromDB