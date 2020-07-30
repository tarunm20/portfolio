const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');
const MongoClient = require('mongodb').MongoClient;
const restoreDB = require('./jobs/github');

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Managing GET requests

//Checking API status
app.get('/api', (req, res, next) => {
    res.send('API Status: Running');
});

//Sending MongoDB githubData collection information
app.get('/api/repos', async (req, res, next) => {
    const connectionString = "mongodb+srv://mtarun:mtarun@cluster0.ttdxg.gcp.mongodb.net/tarunmurugan?retryWrites=true&w=majority";
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    let repos = await client.db("tarunmurugan").collection("githubData").find().toArray();
    res.send(repos);
    await client.close();
});

//Updating MongoDB db with cron job
app.get('/api/jobs/githubData', async (req, res, next) => {
    await restoreDB();
    res.send("Update complete")
});


//Managing POST requests

//Sending email with sendgrid
app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey('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');
    const msg = {
        to: 'tarun.murugan24@gmail.com',
        from: 'tarun.murugan24@gmail.com',
        subject: 'Portfolio Contact: ' + req.body.email,
        text: req.body.message
    };

    sendGrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            })
        })
        .catch(err => {
            console.log('error: ', err);
            res.status(401).json({
                success: false
            })
        });
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });