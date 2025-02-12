import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Loading from './loading';

class Repositories extends Component {
  state = {
    repos: <tr></tr>,
    loading: true
  }

  async getDBRepos() {
    await axios.get("https://backend-dot-atlantean-stone-282412.wl.r.appspot.com/api/repos")
    .then(async res => {
      let reposDisplay = [];
      let loadRepos = () => {
        for(let repo of res.data) {
          reposDisplay.push(
            <tr key = {repo.id}>
              <td><a href = {repo.url} target = '_blank' rel = 'noopener noreferrer'>{repo.name}</a></td>
              <td>{repo.description}</td>
            </tr>
          );
        }
      }
      loadRepos()
      this.setState({
        repos: reposDisplay,
        loading: false
      });
    });
  }  



  componentDidMount() {
    this.getDBRepos();
  }

  render() { 
    if(this.state.loading) return <Loading />;

    return (
      <Container className="p-repo-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{width: '15%'}}>Name</th>
              <th style={{width: '50%'}}>Description</th>
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
