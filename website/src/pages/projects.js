import React from 'react';
import Container from 'react-bootstrap/Container';

import Hero from '../components/hero';
import Repositories from '../components/repositories';



function ProjectsPage(props) {
    return (
        <Container className = 'p-container'>
            <Hero title = { props.title } subTitle = { props.subTitle }/>
            <Repositories />
        </Container>
    )
}

export default ProjectsPage;