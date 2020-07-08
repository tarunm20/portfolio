import React from 'react';
import {useSpring, animated} from 'react-spring';

function CardInfo(props){
    function checkLink(link) {
        if(link.length === 0) {
            return <p>Project in progress...</p>;
        }
        else {
            return <a href = {link} target = '_blank' rel = 'noopener noreferrer'>Check it out</a>;
        }
    }

    const style = useSpring({opacity: 1, from: {opacity: 0}});

    return (
        <animated.div className = 'p-card-info' style = { style }>
            <p className = 'p-card-title'> {props.title} </p>
            <p className = 'p-card-sub-title'> {props.subTitle} </p>
            { checkLink(props.link) }
        </animated.div>
    );
}

export default CardInfo;