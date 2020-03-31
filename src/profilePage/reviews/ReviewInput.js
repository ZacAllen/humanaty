import React, { Component, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BeautyStars from 'beauty-stars';
import './Reviews.css';
import axios from 'axios';

class ReviewInput extends React.Component {

    state = {showing: false, value: 0}

    render() {
        const {showing} = this.state;
        return (
            <div class="review-input-container">
                <div class = "review-input-button">
                    {/* Later, replace onclick with a method that includes user checking etc */}
                    <Button variant="primary" id = "reviewButton" onClick={() => this.setState({showing : true})}> 
                    Leave a Review
                    </Button>
                </div>
                {showing
                    ?<div>
                        <div>
                            
                        </div>
                        <BeautyStars value = {this.state.value} onChange={value => this.setState({value})}>
                
                        </BeautyStars>
                        <Form>
                        <Form.Control type = "text"/>    
                        </Form>
                        <Button variant = "secondary" onClick={() => this.setState({showing: !showing, value: 0})}>
                            Cancel
                        </Button>
                    </div>
                    :null
                }
                
            </div>
      );
    }

}

export default ReviewInput;


