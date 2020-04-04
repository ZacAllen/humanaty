import React, {Component} from 'react';

import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

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
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: this.props.name_on_card,
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
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
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}