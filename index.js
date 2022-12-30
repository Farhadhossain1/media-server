const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jk1g0md.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const mediaCollection = client.db('mediaInformation').collection('addMessages');
        const myAllInformation = client.db('mediaInformation').collection('myInformations');


        app.get('/myInformations',  async (req, res) => {
            const query = {};
            const allInfo = await myAllInformation.find(query).toArray();
            res.send(allInfo);
        })
        app.get('/addMessages',  async (req, res) => {
            const query = {};
            const allInfo = await mediaCollection.find(query).toArray();
            res.send(allInfo);
        })

        app.post('/addMessages', async (req, res) => {
            const info = req.body;
            const result = await mediaCollection.insertOne(info);
            res.send(result);
        });


        // app.post('/myInformations', async (req, res) => {
        //     const info = req.body;
        //     const result = await myAllInformation.insertOne(info);
        //     res.send(result);
        // });

    }
    finally{

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('doctors portal server is running');
})

app.listen(port, () => console.log(`Doctors porfthtal running on ${port}`))