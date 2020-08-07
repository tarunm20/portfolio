import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class Repositories extends Component {
  state = {
    repos: <tr></tr>
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
              <td><a href = {repo.url} target = '_blank' rel = 'noopener noreferrer'>Link</a></td>
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

  componentDidMount() {
    this.getDBRepos();
  }

  render() { 
    return (
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{width: '15%'}}>Name</th>
              <th style={{width: '50%'}}>Description</th>
              <th style={{width: '10%'}}>Link</th>
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
