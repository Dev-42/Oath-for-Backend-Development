const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express()

const clientId = "b94ecf6c13b6fc4732cc"
const client_secret = "2ab1c1c496095ba4c81891438812da46f6ed528d"

app.use(express.json())

// end points

app.get('/' , async(req,res) => {
    res.send("Homepage")
})

app.get('/login' , async(req,res) => {
    res.sendFile(__dirname + "/index.html")
    console.log(__dirname)
})

app.get('/auth/github' , async(req,res) => {
    const {code} = req.query
    const access_token = await fetch("https://github.com/login/oauth/access_token", {
        method : "POST",
        headers : {
            Accept: "application/json",
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            clientId,
            client_secret,
            code
        })
    }). then((res) => res.json())
    console.log(access_token)
    res.send("Post authentication page")
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})