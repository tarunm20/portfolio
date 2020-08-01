import React, {Component} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Axios from 'axios';

import Hero from '../components/hero';


class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            disabled: false,
            emailSent: null
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            disabled: true,
        });

        Axios.post('https://backend-dot-atlantean-stone-282412.wl.r.appspot.com/api/email', this.state)
            .then(res => {
                if(res.data.success) {
                    this.setState({
                        disabled: false,
                        emailSent: true
                    });
                }
                else {
                    this.setState({
                        disabled: false,
                        emailSent: false
                    });
                }
            })
            .catch(err => {
                this.setState({
                    disabled: false,
                    emailSent: false
                });
            })
    }
   
    render() {
        return (
            <Container>
                <Hero title = {this.props.title} subTitle = {this.props.subTitle} />
                <Form className = 'c-form-container' onSubmit = {this.handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor = 'full-name'>Full Name</Form.Label>
                        <Form.Control id = 'full-name' name = 'name' type = 'text' value = {this.state.name} onChange = {this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor = 'email'>Email Address</Form.Label>
                        <Form.Control id = 'email' name = 'email' type = 'email' value = {this.state.email} placeholder = 'enter email' onChange = {this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor = 'message'>Message</Form.Label>
                        <Form.Control id = 'message' name = 'message' as = 'textarea' rows = {3} value = {this.state.message} placeholder = 'enter message' onChange = {this.handleChange} />
                    </Form.Group>
                    <Button className = 'd-inline-block' variant="primary" type="submit" disabled = {this.state.disabled}>
                        Submit
                    </Button>
                    {this.state.emailSent === true && <p className = 'd-inline c-success-msg'>Email Sent</p>}
                    {this.state.emailSent === false && <p className = 'd-inline c-error-msg'>Email Not Sent</p>}
                </Form>
            </Container>
        );
    }
}
 
export default ContactPage;
