import React from 'react';
import Container from 'react-bootstrap/Container';
import Content from '../components/content';
import Hero from '../components/hero';
import Basket from '../components/basket';

function AboutPage(props) {

    return (
        <Container>
            <Hero title = {props.title} subTitle = {props.subTitle} />
            <Content />
            <Basket />
        </Container>
    );

}

export default AboutPage;