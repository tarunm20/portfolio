import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Social from '../components/social';
import github from '../assets/icons/github.png';
import instagram from '../assets/icons/instagram.png';

class Basket extends Component {

    constructor(props){
        super(props);
        this.state = {
            icons: [
                {
                    id: 0,
                    imgSrc: github,
                    link: 'https://github.com/tarunm20'
                },
                {
                    id: 1,
                    imgSrc: instagram,
                    link: 'https://www.youtube.com/watch?v=COMaG7pObgE'
                }
            ]
        };
    }

    makeIcons = icons => {
        return icons.map(icon => {
            return (
                <Col md = 'auto'>
                    <Social imgSrc = {icon.imgSrc} link = {icon.link} key = {icon.id}/>
                </Col>
            );
        });
    }

    render(){
        return (
            <Container className = 'a-basket-container'>
                <Row className = 'justify-content-center'>
                    { this.makeIcons(this.state.icons) }
                </Row>
            </Container>
        );
    }
}

 
export default Basket;