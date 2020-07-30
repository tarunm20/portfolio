import React from 'react';
import Container from 'react-bootstrap/Container';

function Social(props) {

    return (
        <Container className = 'a-social-container' >
            <a href = {props.link} target = '_blank' rel = 'noopener noreferrer'>
                <img className = 'a-social-image' alt = 'social icon' src = {props.imgSrc} />
            </a>
        </Container>
    );
}

 
export default Social;