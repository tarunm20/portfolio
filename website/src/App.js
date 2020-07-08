import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav'

import HomePage from './pages/home';
import AboutPage from './pages/about';
import ProjectsPage from './pages/projects';
import ContactPage from './pages/contact';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Tarun Murugan',
      headerLinks: [
        {title: 'Home', path: '/'},
        {title: 'About', path: '/about'},
        {title: 'Projects', path: '/projects'},
        {title: 'Contact', path: '/contact'}
      ],
      home: {
        title: 'hello, check out my terrible ideas...',
        subTitle: 'ヘ( ^o^)ノ＼(^_^ )'
      },
      about: {
        title: 'a little bit about me',
        subTitle: '(；一_一)'
      },
      projects: {
        title: 'here is what I\'ve been working on',
        subTitle: '（っ＾▿＾）'
      },
      contact: {
        title: 'contact me',
        subTitle: '(._.)'
      }
    };
  }
  
  render() {
    return (
      <React.Fragment>
        <Router>
          <Container className = 'p-0' fluid = {true}>
            <NavBar className = 'bg-transparent variant-light' expand = 'md'>
              <NavBar.Brand>Tarun Murugan</NavBar.Brand>
              <NavBar.Toggle aria-controls = 'basic-navbar-nav' />
              <NavBar.Collapse id = 'basic-navbar-nav'>
                <Nav className = 'ml-auto'>
                  <Nav.Link href = '/'>Home</Nav.Link>
                  <Nav.Link href = '/about'>About Me</Nav.Link>
                  <Nav.Link href = '/projects'>Projects</Nav.Link>
                  <Nav.Link href = '/contact'>Contact</Nav.Link>
                </Nav>
              </NavBar.Collapse>
            </NavBar>
            <Switch>
              <Route path = '/' exact render = { () => <HomePage title = {this.state.home.title} subTitle = {this.state.home.subTitle} />} />
              <Route path = '/about' exact render = { () => <AboutPage title = {this.state.about.title} subTitle = {this.state.about.subTitle} />} />
              <Route path = '/projects' exact render = { () => <ProjectsPage title = {this.state.projects.title} subTitle = {this.state.projects.subTitle} />} />
              <Route path = '/contact' exact render = { () => <ContactPage title = {this.state.contact.title} subTitle = {this.state.contact.subTitle} /> } />
            </Switch>
          </Container>
        </Router>
      </React.Fragment>
    )
  }
  
}

export default App;
