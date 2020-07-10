import React from 'react';

import CardInfo from '../components/cardInfo';

function Card(props) {

    return (
        <div className = 'd-inline-block p-card' onClick = {(e) => props.click(props.item, e)}>
            <img className = 'p-card-image' alt = {props.item.alt} src = {props.item.imgSrc} />
            { props.item.selected && <CardInfo title = {props.item.title} subTitle = {props.item.subTitle} link = {props.item.link} /> }
        </div>
    );
}

 
export default Card;