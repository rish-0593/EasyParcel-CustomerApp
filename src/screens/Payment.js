import React, {Component} from 'react';
import {View,Text,Button} from 'react-native'; 
import RNUpiPayment from 'react-native-upi-pay';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
 
/*
    npm install react-native-upi-pay
    react-native link
*/
 
export default class App extends Component{
    constructor(props){
        super();
        this.state={
            Status:"", 
            txnId:"",
            GOOGLE_PAY:'GOOGLE_PAY',
            PHONEPE:'PHONEPE',
            PAYTM:'PAYTM',
            message:"",
            order_id: null,
        }
    }
    render(){
        // that=this;
        function floo(paymentApp){
            RNUpiPayment.initializePayment({
                vpa: 'rish05@ybl',  		//your upi address like 12345464896@okhdfcbank
                payeeName: ' abc',   			// payee name 
                amount: '1',				//amount
                transactionNote:'Testing Upi',		//note of transaction
                transactionRef: 'aasf-332-aoei-fn'	//some refs to aknowledge the transaction
            },successCallback,failureCallback);
        }
        function failureCallback(data){
            console.log(data)
            // in case no action taken
            // if (data['status']=="FAILURE"){
            //     that.setState({Status:"FAILURE"})
            //     that.setState({message:data['message']});
            // }
            // // in case of googlePay
            // else if (data['Status']=="FAILURE"){
            //     that.setState({Status:"FAILURE"})
            //     that.setState({message:"app closed without doing payment"});;
            // }
            // // in case of phonepe
            // else if (data['Status']=="Failed"){
            //     that.setState({Status:"FAILURE"});
            //     that.setState({message:"app closed without doing payment"});
            // }
            // // in case of phonepe
            // else if(data['Status']=="Submitted"){
            //     that.setState({Status:"FAILURE"});
            //     that.setState({message:"transaction done but pending"});
            // }
            // // any other case than above mentioned
            // else{
            //     that.setState({Status:"FAILURE"});
            //     that.setState({message:data[Status]});
            // }
        }
        function successCallback(data){
            //
            console.log(data);
            // that.setState({Status:"SUCCESS"});
            // that.setState({txnId:data['txnId']});
            // that.setState({message:"Succccessfull payment"});
        }

        async function razorpay(order_id) {
            const url = 'http://192.168.29.58:8080/MY/razorpay-php/create.php?amount='+100;
            const result = await axios.get(url);
            var data = result.data;
            console.log(data.order_id)
            authorizePayment(data.order_id);
        }

        function authorizePayment(order_id) {
            var options = {
                description: 'City Delivery',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_5uu7HeuIQ9ftAW',
                amount: '5000',
                name: 'Acme Corp',
                order_id: order_id,   //Replace this with an order_id created using Orders API.
                prefill: {
                  email: 'rishabh@example.com',
                  contact: '8299598978',
                  name: 'Rishabh'
                },
                theme: {color: '#53a20e'}
            }
            RazorpayCheckout.open(options).then((data) => {
                // handle success
                capturePayment(data.razorpay_payment_id);
                alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
        }

        async function capturePayment(id) {
            const url = 'http://192.168.29.58:8080/MY/razorpay-php/capture.php?id='+id+'&amount='+100;
            const result = await axios.get(url);
            var data = result.data;
            console.log(data)
        }
        return (
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
        <View style={{flexDirection:'row',padding:5}}>
            <Button
            title="Google pay"
            onPress={() => {floo(this.state.GOOGLE_PAY)}}
            />
 
            <Button
            title="Phone pe"
            onPress={() => {floo(this.state.PHONEPE)}}
            />
            <Button
            title="PAYTM"
            onPress={() => {floo(this.state.PAYTM)}}
            />

            <Button
                title="Razorpay"
                onPress={() => {razorpay(this.state.order_id)}}
            />
        </View>
 
        <Text>{this.state.Status+" "+this.state.txnId}</Text>
        <Text>{this.state.message}</Text>
        </View>
        );
    }
}