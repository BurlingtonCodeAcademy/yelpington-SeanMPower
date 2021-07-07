const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')
const public = path.resolve('./public')


app.use(express.static(public))

app.listen(port, () => console.log(`Example app listening on port: ${port}`))

app.get('/restaurant', (req, res) => {
    res.sendFile(public + '/restaurant.html')
})

app.get('/', (req, res) => {
    res.sendFile(public + '/index.html')
})

app.get('*', (req, res) => {
    res.sendFile(public + '/404.html')
})


