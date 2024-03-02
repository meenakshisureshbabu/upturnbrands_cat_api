const catrouter = require('express').Router();
const axios = require('axios')

let catfactdata = [];


catrouter.get("/random",(req,res) => {
    axios.get("https://catfact.ninja/fact")
    .then((response) => {
        //console.log(response.data)
        catfactdata.push(response.data.fact)
        res.json(response.data.fact)
    })
    .catch(function(error) {
        console.log(error)
    })
})


module.exports = catrouter

