import React, { Component } from 'react';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            about: 'Once again, I\'m Tarun. I currently live in India but will move to the US. I\'m the type of person who would spend days working on a problem till I have figured it out. The reason I persue computer science is because it helps me develop my ideas into products that other poeple can use. ',
            education: 'I have completed my school education at the American International School in Chennai and will attend the University of California San Diego in the Fall of 2021.',
            experience: 'I have worked with Python, Java, Javascript, HTML, and CSS. The frameworks and modules I have worked with include Django, React, Express, TensorFlow, and Node.',
            current: 'I\'m currently working on two projects: aReminder and LanChat.'
        }
    }
    render() { 
        return (
            <React.Fragment>
                <p> {this.state.about} </p>
                <p> {this.state.education} </p>
                <p> {this.state.experience} </p>
                <p> {this.state.current} </p>
            </React.Fragment>
        );
    }
}
 
export default Content;