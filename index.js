const express = require("express"); 
const cors = require('cors');
require('dotenv').config(); 
const app = express(); 
const port = process.env.PORT || 5000; 

// middleware : 
app.use(cors()); 
app.use(express.json());



// mongodb configuration is here to store data on mongo:

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4nkvsmn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//  database connection : 
async function run(){
      try{
         const tableDataCollection  = client.db('table').collection('tableData'); 

      // first table api is here: 
      app.get('/firstTableData', async(req, res) => { 
         const key = req.query.key; 
         const order = req.query.order === "true" ? 1 : -1; 
         let sorted = {_id: -1}; 
         if(key === "name"){
             sorted = {"person.name": order}
         }else if(key === 'city'){
            sorted = {city: order}; 
         }else if(key === 'email'){
            sorted = {email: order}; 
         }else if(key === 'joiningDate'){
            sorted = {joiningDate :order}
         }else if(key === 'role'){
            sorted = {role: order}
         }

         const query = {}; 
         const tableData = await tableDataCollection.find(query).sort(sorted).toArray(); 
         res.send(tableData); 
      })

      //second table api is here: 
      app.get('/secondTableData', async(req, res)=>{
         const key = req.query.key; 
         const order = req.query.order === "true" ? 1 : -1; 
         let sorted = {_id: -1}; 
         if(key === "name"){
             sorted = {"person.name": order}
         }

         const query = {}; 
         const tableData = await tableDataCollection.find(query).project({person: 1, email: 1, role: 1}).sort(sorted).toArray(); 
         res.send(tableData); 
      })


      // third table api is created here: 
      app.get('/thirdTableData', async(req,res)=>{
         const key = req.query.key; 
         const order = req.query.order === "true" ? 1 : -1; 
         const query = {}; 
         let sorted = {}; 
         if(key === 'joiningDate'){
            sorted = {joiningDate: order}; 
         }else if(key=== 'role'){
            sorted = {role: order}; 
         }

         const tableData = await tableDataCollection.find(query).project({email: 1, joiningDate: 1, role: 1}).sort(sorted).toArray(); 
         res.send(tableData);

      })



      //fourth table api is create here: 
      app.get('/fourthTableData' ,async(req,res)=>{
         const key = req.query.key; 
         const order = req.query.order === "true"  ? 1 : -1; 
         const query = {}; 
         let sorted = {}; 
         if(key ==="city"){
            sorted = {city: order}; 
         }else if(key === 'role'){
             sorted  = {role: order}; 
         }

         const tableData = await tableDataCollection.find(query).project({person:1, city:1, joiningDate:1, role:1}).sort(sorted).toArray(); 
         res.send(tableData); 
      })


      
      /*

      /* This api  i used for updated avatar image link: 
      app.patch('/firstTableData', async(req, res)=>{
         const query = {}; 
         const updatedDoc = {
            $set:{
               "person.avatar": 'https://i.ibb.co/gFywz4Y/unsplash-r-DEOVt-E7v-Os.png'
            }
         }
          const result = await tableDataCollection.updateMany(query, updatedDoc); 
          res.send(result);
      })

      */

      }finally{

      }
}


run().catch(err => console.log(err)); 



// main port or server home  message: 
app.get('/', (req, res)=>{
   res.send('table management server is running now: '); 
})

app.listen(port , ()=>{
   console.log(`server is running on  port : ${port}`); 
})