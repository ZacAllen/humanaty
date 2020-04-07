import React, {Component} from 'react';

import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';

import './CardSectionStyles.css'

import Axios from 'axios';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name_on_card: ''
    }
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    //retrieve props
    const{stripe, elements, guest_num, cost} = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    //Create a payment object to send to the server, send it to the server
    var payment_obj = {amount: guest_num * cost, guest_num: guest_num, cost: cost};
    const result = await Axios.post('http://localhost:9000/test-payment', payment_obj);

    //retrieve the client secret for the payment and wait for the Stripe API to confirm it
    var client_secret = result.data.client_secret;
    const confirmation = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'test name',
        },
      }
    });

    //verify that the payment completed properly
    if (confirmation.paymentIntent && confirmation.paymentIntent.status === 'succeeded') {
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
            Card Details
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
        </label>
        <div>
          <label className="inputheader">Name on Card</label>
          <div className="input-box">
            <input
            type="text"
            name="name-on-card"
            className="zip-input"
            class="form-control"
            defaultvalue={this.state.name_on_card}
            onChange={this.handleChange}/>
          </div>
        </div>
        <button 
          disabled={!this.props.stripe}
          className="paynowbutton"
          >Pay Now</button>
      </form>
    );
  }
}

export default CheckoutForm;