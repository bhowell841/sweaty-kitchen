
//  External modules & global variables/settings
//  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


//  modules & variables
const express = require('express')
const path = require('path')
const PORT = 12532
const app = express()
//  settings
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//  variables
const R = {
    tables: {1:'',2:'',3:'',4:'',5:''},
    wait: [],
    accepted: 0
}


//  Server stuff
//  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

//  listening
app.get('/:route',(req,res)=>{
    const route = req.params.route
    // send appropriate webpage back
    if (route.startsWith('api')) {
        // they want the reservation object
        res.json(R)
    } else {
        // sends back the appropriate html file
        res.sendFile(path.join(__dirname, route + '.html'))
    }
})

//  posting
app.post('/',(req,res)=>{
    // data should be a reservation object
    const data = req.body
    console.log('Received ' + data)
    let status = {stat:false}
    for (let i in R.tables) {
        if (R.tables[i] === '' && status.stat === false) {
            R.tables[i] = data
            status.stat = true
        }
    }
    if (status.stat === false) {
        R.wait.push(data)
    }
    // send complete json back
    res.json(status)
})

//  listen last
app.listen(PORT,()=>{console.log('Server listening on port ' + PORT)})
