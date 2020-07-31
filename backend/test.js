let axios = require('axios');

// const message = {
//     from: 'tarun.murugan5@gmail.com',
//     to: 'tarun.murugan24@gmail.com',
//     subject: 'test',
//     message: 'test'
// }

// axios.post('http://34.64.116.243:80/api/email', message)
//     .then(res => {
//         console.log(res.status, res.data);
//     })

axios.get('http://34.64.116.243:8080/api/repos')
    .then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err);
    })