import React from 'react';
import Containter from 'react-bootstrap/Container';

function Social(props) {

    return (
        <Containter className = 'a-social-container' >
            <a href = {props.link}>
                <img className = 'a-social-image' alt = 'social icon' src = {props.imgSrc} />
            </a>
        </Containter>
    );
}

 
export default Social;