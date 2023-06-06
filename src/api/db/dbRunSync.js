const dbRunSync = (dbObject, query, preparedStatementArrays) => {
  return new Promise (resolve => {
    dbObject.run(query, preparedStatementArrays, function(err, row) {
      if (err) {
        resolve(false)
        return console.log(err.message);
      }
      resolve(row)
      // console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  })
}

export default dbRunSync