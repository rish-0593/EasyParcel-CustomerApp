import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, CardItem, Body, Button } from "native-base";

const Details = ({navigation}) => {
    const gotoPage = (value) => {
        if(value == 'chat'){
            navigation.navigate('Chat')
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Body>
                            <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: -10}}>Your Order Details :</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>Order Type:
                                <Text style={{color: '#2d3057'}}> Normal</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Order Weight:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> Up to 5KG</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Order Item:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> Food</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Phone:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> 1234567890</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Order Value:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> 500RS</Text>
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                <Card style={{flex: 0}}>
                    <CardItem>
                        <Body>
                            <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: -10}}>Your Pickup Point :</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>Pickup Address:
                                <Text style={{color: '#2d3057'}}> Lorem ipsum, or lipsum as it is sometimes known.</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Pickup Phone:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> 1234567890</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Comment:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</Text>
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                <Card style={{flex: 0, marginBottom: 10}}>
                    <CardItem>
                        <Body>
                            <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: -10}}>Your Delivery Point :</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>Delivery Address:
                                <Text style={{color: '#2d3057'}}> Lorem ipsum, or lipsum as it is sometimes known.</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Delivery Phone:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> 1234567890</Text>
                            </Text>
                            <Text style={{color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5}}>Comment:
                                <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}}> Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</Text>
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                <View style={{ width: '100%' }}>
                    {/* <Button block style={styles.button} onPress={() => gotoPage('chat')}>
                        <Text style={styles.buttonText}>Cancel Order</Text>
                    </Button> */}

                    <Button block style={styles.button} onPress={() => gotoPage('chat')}>
                        <Text style={styles.buttonText}>Chat Now</Text>
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
        margin: 10
	},

	button: {
		// backgroundColor: '#E74C3C'
        backgroundColor: '#1DDCAF',
	},
	
	buttonText: {
		color: '#fff',
		fontFamily: 'Montserrat-Medium',
		fontSize: 17
	},
})

export default Details;