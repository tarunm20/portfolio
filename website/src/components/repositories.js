import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class Repositories extends Component {
  state = {
    repos: "SUCC"
  }

  async getDBRepos() {
    await axios.get("https://backend-dot-atlantean-stone-282412.wl.r.appspot.com/api/repos")
    .then(res => {
      this.setState({
        repos: res.data
      });
    });
  }  

  render() { 
    this.getDBRepos()

    let reposDisplay = [];
    for(let repo of this.state.repos) {
      reposDisplay.push(
        <tr key = {repo.id}>
          <td>{repo.name}</td>
          <td>{repo.description}</td>
          <td><a href = {repo.url} target = '_blank' rel = 'noopener noreferrer'>{repo.url}</a></td>
        </tr>
      );
    }

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
            {reposDisplay}
          </tbody>
        </Table>
      </Container>
    );
  }
}
 
export default Repositories;
