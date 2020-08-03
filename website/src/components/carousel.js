import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Card from '../components/card';
import anime from '../assets/images/anime.webp';
import list from '../assets/images/list.webp'


class Carousel extends Component {
    constructor(props){
        super(props);
        this.state = { 
            items: [
                {
                    id: 0,
                    title: 'aReminder',
                    subTitle: 'Watch your favorite anime as soon as it\'s released.',
                    imgSrc: anime,
                    link: '',
                    selected: false,
                    alt: 'Naruto Wallpaper 4k Minimalist @labourenergy.org'
                },
                {
                    id: 1,
                    title: 'MyList',
                    subTitle: 'Stay productive with a simple to-do list.',
                    imgSrc: list,
                    link: '',
                    selected: false,
                    alt: ''
                },
            ]
        }
    }

    eventCardClick(id, card) {
        let items = [...this.state.items];
        
        items[id].selected = items[id].selected ? false : true;
        items.forEach(item => {
            if(item.id !== id) {
                item.selected = false;
            }
        });
        this.setState({
            items
        });
    }

    makeItems = items => {
        return items.map(item => {
            return <Card item = {item} click = {( e => this.eventCardClick(item.id, e))} key = {item.id}  />
        });
    }
    
    render() { 
        return (
            <Container>
                <Row className = 'justify-content-around'>
                    {this.makeItems(this.state.items)}
                </Row>
            </Container>
        );
    }
}
 
export default Carousel;