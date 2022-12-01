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
         

      app.get('/tableData', async(req, res) => { 
         const query = {}; 
         const tableData = await tableDataCollection.find(query).toArray(); 
         res.send(tableData); 
      })
         

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