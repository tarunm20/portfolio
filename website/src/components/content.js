import React, { Component } from 'react';

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            about: 'Once again, I\'m Tarun. I currently live in India but will move to the US.',
            education: 'I have completed my school education at the American International School in Chennai and will attend the University of California San Diego in the Fall of 2021.',
            experience: 'I am fluent in Python, Java, Javascript, HTML, and CSS. The frameworks and modules I have worked with include Django, React.js, Express.js, TensorFlow, and Node.js.',
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