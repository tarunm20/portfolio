import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 


function Hero(props) {

    return (
        <Jumbotron className = 'bg-transparent jumbotron-fluid'>
            <Container fluid = {true}>
                <Row className = 'justify-content-center'>
                    <Col md = {20}>
                        { props.title && <h1 className = 'display-3'>{ props.title }</h1> }
                        
                    </Col>
                </Row>
                <Row className = 'justify-content-center'>
                    <Col md = {20}>
                        { props.subTitle && <h3 className = 'display-4 font-weight-light'>{ props.subTitle }</h3> }
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default Hero;