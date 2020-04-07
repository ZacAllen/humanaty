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
    const {stripe, elements} = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    var payment_obj = {amount: 1099};

    console.log(payment_obj);
    const result = await Axios.post('http://localhost:9000/test-payment', payment_obj);

    var client_secret = result.data.client_secret;

    const confirmation = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'test name',
        },
      }
    });

    console.log(confirmation);

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
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
        </label>
        <label className="inputheader">Name on Card</label>
        <div className="input-box">
          <input
            type="text"
            name="name-on-card"
            className="zip-input"
            class="form-control"
            value={this.state.name_on_card}
            onChange={this.handleChange}/>
        </div>
        <button 
          disabled={!this.props.stripe}
          className="paynowbutton"
          >Pay Now</button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm stripe={stripe} elements={elements}/>
      )}
    </ElementsConsumer>
  );
}