const axios = require('axios');
const {MongoClient, connect} = require('mongodb');

async function main() {
  const url = "https://api.github.com/users/tarunm20/repos";
  const auth_token = process.env.GITHUB_AUTH_TOKEN;
  let params = {
    token: auth_token
  };

  //Getting all repositories from GitHub
  async function getGHRepos() {
    let repos = [];
    await axios.get(url, params)
    .then(res => {
      let data = res.data;
      let idCount = 0;
      for(let repo of data) {
        let repoData = {
          id: idCount,
          name: repo.name,
          description: repo.description,
          url: repo.html_url
        };
        repos.push(repoData);
        idCount++;
      }
    }).catch(err => {
      console.log("There was an error")
      console.log(err);
    });
    
    return repos;
  }

  const connectionString = process.env.MONGO_URI;
  const client = new MongoClient(connectionString, {useUnifiedTopology: true});

  //Adding all repositories needed to the MongoDB database
  async function addReposToDB(repos) {
    try {
      await client.db("tarunmurugan").collection("githubData").insertMany(repos);
      console.log("Repositories added: ", repos);
    }
    catch (e) {
      console.log(e);
    }
  }

  async function refreshDB(decision) {
    try {
      //Deletes all documents in MongoDB database
      async function purge() {
        await client.db("tarunmurugan").collection("githubData").deleteMany({ });
      }
      await purge();
      console.log("Purge complete");

      //Adds all current GitHub repositories to MongoDb database
      async function regen() {
        await getGHRepos()
          .then(async res => {
            await addReposToDB(res);
          })
      }
      await regen();
      console.log("Regen complete");
      
    }
    catch (e) {
      console.log(e);
    }
  }


  //Performs all necesary tasks to keep MongoDB database updated
  async function complete() {
    try {
      await client.connect();
      await refreshDB();
      console.log("Refresh function complete")
    }
    catch (e) {
      console.log("There was an error: ", e);
    }
    finally {
      await client.close();
    }
  }

  await complete();
}
module.exports = main;