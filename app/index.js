const express = require('express')
const app = express()
const mysql = require('mysql')

const port = 8080

// handle requests to the home page
app.get('/', (request, response) => {
  listDatabases(response)
})

// start the webserver
app.listen(port, () => {
  console.log('Running on port ' + port)
})

function listDatabases(response) {
  // Connect to MySQL using the connection details provided in environment
  // variables from docker
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  })

  connection.connect()

  // run the query
  connection.query('SHOW DATABASES', (err, rows, fields) => {
    if (err) {
      console.log(err)
    }
    connection.end()

    // return the list of databases, and output
    let databases = []
    rows.forEach((row) => {
      databases.push(row['Database'])
    })

    response.send(databases)
  })
}
