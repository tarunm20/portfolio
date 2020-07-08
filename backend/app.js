let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let sendGrid = require('@sendGrid/mail');

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API Status: Running');
});

app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey('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');
    const msg = {
        to: 'tarun.murugan24@gmail.com',
        from: 'tarun.murugan24@gmail.com',
        subject: 'Portfolio Contact',
        text: req.body.email + '\n' + '\n' + req.body.message
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });