import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            description: '', 
            amount: 0,
            currency: 'usd',
            quantity: 0
        };
    }

    onToken = (token, addresses) => {
        var obj = {token: token, addresses: addresses, amount: this.props.location.state.amount}
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

/*Live Key: 'pk_live_gEj0YgPj0aTtBcjKY3Gp9JnC008ooqLhlH'*/

export default Checkout;