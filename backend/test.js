let axios = require('Axios');

const message = {
    from: 'tarun.murugan5@gmail.com',
    to: 'tarun.murugan24@gmail.com',
    subject: 'test',
    message: 'test'
}

axios.post('http://34.64.116.243/api/email', message)
    .then(res => {
        console.log(res.status, res.data);
    })