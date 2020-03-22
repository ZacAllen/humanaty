import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends React.Component{
    onToken = (token, addresses) => {
        var obj = {token: token, addresses: addresses}
        axios.post('https://localhost:9000/receive-payment', obj);
    }

    render() {
        return (
            <StripeCheckout 
            stripeKey='pk_test_KsSBLHsah3N55vJsAQ7a8YDO00qx7rn3an'
            token={this.onToken}/>
        )
    }
}

export default Checkout;