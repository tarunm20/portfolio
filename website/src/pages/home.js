import React from 'react';
import Hero from '../components/hero';
import Carousel from '../components/carousel';

function HomePage(props) {

    return (
        <React.Fragment>
            <Hero title = { props.title } subTitle = { props.subTitle } />
            <Carousel />
        </React.Fragment>

    )

}

export default HomePage;