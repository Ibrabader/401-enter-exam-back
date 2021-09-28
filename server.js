const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const axios = require('axios')
const mongoose = require("mongoose");
app.use(express.json());
mongoose.connect(process.env.REACT_APP_MONGO);

const DataFruits = new mongoose.Schema ({
    name:{type:String},
    image : {type:String},
    price : {type:String},

})

const fruitsModel = mongoose.model('fruits',DataFruits)

function getAllData(req,res){

    axios.get('https://fruit-api-301.herokuapp.com/getFruit').then(element=>{

    res.json(element.data.fruits)
    })
}

app.get('/alldata',getAllData)


function addToFav(req,res){
const {name,image,price} = req.body;
const newDataFruits = new fruitsModel ({
    name:name,
    image:image,
    price:price
})
newDataFruits.save();
res.json(newDataFruits)

}


app.post('/favdata',addToFav)

function deleteFun (req,res){
    const fruits_Id = req.params.id;
    fruitsModel.deleteOne({_id:fruits_Id},(err,deletedData)=>{
        res.json(deletedData)
    })
}


function getFav (req,res){
    fruitsModel.find({},(err,data)=> res.json(data))
}
app.get('/favdata',getFav)
app.delete('/favdata/:id',deleteFun);

function updateFun(req,res){

    const fruits_Id = req.params.id;
    const {name,image,price} = req.body;
    fruitsModel.findByIdAndUpdate({_id:fruits_Id},{name,image,price},{new : true},(err,updatedData)=>{
        res.json(updatedData)
    })
}

app.put('/favdata/:id',updateFun)


app.get('/',
 function (req, res) { 
  res.send('Hello World') 
})
 
app.listen(3001) 