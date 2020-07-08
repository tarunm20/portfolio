import React from 'react';
import Container from 'react-bootstrap/Container';

import Hero from '../components/hero';
import Carousel from '../components/carousel';

function ProjectsPage(props) {

    return (
        <Container className = 'p-container'>
            <Hero title = { props.title } subTitle = { props.subTitle }/>
            <Carousel />
        </Container>
    )

}

export default ProjectsPage;