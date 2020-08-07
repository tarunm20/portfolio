import React from 'react';
import Container from 'react-bootstrap/Container';
import Content from '../components/content';
import Hero from '../components/hero';

function AboutPage(props) {

    return (
        <Container>
            <Hero title = {props.title} subTitle = {props.subTitle} />
            <Content />
        </Container>
    );

}

export default AboutPage;