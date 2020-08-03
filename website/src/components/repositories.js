import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class Repositories extends Component {
  state = {
    repos: ""
  }

  async getDBRepos() {
    await axios.get("https://backend-dot-atlantean-stone-282412.wl.r.appspot.com/api/repos")
    .then(async res => {
      let reposDisplay = [];
      let loadRepos = () => {
        for(let repo of res.data) {
          reposDisplay.push(
            <tr key = {repo.id}>
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td><a href = {repo.url} target = '_blank' rel = 'noopener noreferrer'>{repo.url}</a></td>
            </tr>
          );
        }
      }
      await loadRepos()
      this.setState({
        repos: reposDisplay
      });
    });
  }  

  render() { 
    this.getDBRepos()

    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.state.repos}
          </tbody>
        </Table>
      </Container>
    );
  }
}
 
export default Repositories;
