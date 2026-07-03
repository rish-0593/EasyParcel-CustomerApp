import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Tabs, Tab, Button, Card, CardItem, Body, Icon } from "native-base";

const Home = ({navigation}) => {
    const gotoPage = (value) => {
        console.log(value);
        if(value == 'order'){
            navigation.navigate('Order')
        }

        if(value == 'details'){
            navigation.navigate('Details')
        }
    }
    return (
        <View style={styles.container}>
            <View style={{backgroundColor: '#fff'}} >
                <View style={{marginHorizontal: 25, marginVertical: 15, flexDirection: 'column'}}>
                    <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 20}}>Welcome! <Icon style={{fontSize: 20}} name='hand-left-outline' /></Text>
                    <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 20}}>Lorem Ispem</Text>
                </View>
            </View>

            <Tabs scrollWithoutAnimation={true} 
                tabBarUnderlineStyle={{ backgroundColor: '#1DDCAF'}}
                tabContainerStyle={{ elevation: 0 }}
            >
                <Tab heading="Active & Pending" 
                    tabStyle={{backgroundColor: '#fff'}} 
                    activeTabStyle={{backgroundColor: '#fff'}}
                    textStyle={{color: '#ABB2B9', fontFamily: 'Montserrat-Medium', fontSize: 15}}
                    activeTextStyle={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}} 
                    style={{ backgroundColor: "#F7F9F9"}}
                    >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ margin: 10}}>
                            <TouchableHighlight activeOpacity={0.8} underlayColor="#F7F9F9" onPress={() => gotoPage('details')}>
                                <Card style={{flex: 0, marginBottom: 12}}>
                                    <CardItem>
                                        <Body>
                                            <View style={{ flexDirection: 'row'}}>
                                                <View style={{ flex: 1, flexDirection: 'column'}}>
                                                    <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                                        Order Name or Number
                                                    </Text>

                                                    <View style={{ flexDirection: 'row'}}>
                                                        <Text style={{color: '#fff', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, backgroundColor: '#58D68D', paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Active</Text>
                                                        <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>5 Aug, 2021</Text>
                                                    </View>
                                                </View>

                                                <View style={{ marginTop: 15}}>
                                                    <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                                        <Icon style={{ color: '#24287B', fontSize: 25}} name="chevron-forward-sharp"/>
                                                    </Text>
                                                </View>
                                            </View>
                                        
                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                <View style={{ flex: 1, flexDirection: 'column', }}>
                                                    <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                    <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                                </View>

                                                <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                    <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                    <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                                </View>

                                                <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                    <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                    <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableHighlight>
                            
                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{color: '#fff', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, backgroundColor: '#58D68D', paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Active</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>5 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{borderWidth: 1, borderColor: '#F4D03F', color: '#F4D03F', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Pending</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>10 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{borderWidth: 1, borderColor: '#F4D03F', color: '#F4D03F', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Pending</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>10 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{borderWidth: 1, borderColor: '#F4D03F', color: '#F4D03F', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Pending</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>10 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <View style={{flex: 0, marginBottom: 65}}></View>
                        </View>
                    </ScrollView>
                </Tab>
                <Tab heading="Closed & Completed" 
                    tabStyle={{backgroundColor: '#fff'}} 
                    activeTabStyle={{backgroundColor: '#fff'}}
                    textStyle={{color: '#ABB2B9', fontFamily: 'Montserrat-Medium', fontSize: 15}}
                    activeTextStyle={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 15}} 
                    style={{ backgroundColor: "#F7F9F9"}}
                    >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ margin: 10}}>
                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{borderWidth: 1, borderColor: '#EC7063', color: '#EC7063', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Closed</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>5 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{borderWidth: 1, borderColor: '#58D68D', color: '#58D68D', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Completed</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>5 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{flex: 0, marginBottom: 12}}>
                                <CardItem>
                                    <Body>
                                        <Text style={{color: '#2d3057', fontFamily: 'Montserrat-Medium', fontSize: 16, marginBottom: 5}}>
                                            Order Name or Number
                                        </Text>
                                        <View style={{ flexDirection: 'row'}}>
                                            <Text style={{borderWidth: 1, borderColor: '#EC7063', color: '#EC7063', fontFamily: 'Montserrat-Medium', fontSize: 15, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>Closed</Text>
                                            <Text style={{borderWidth: 1, borderColor: '#979797', color: '#808B96', fontFamily: 'Montserrat-Medium', fontSize: 15, marginLeft: 10, marginBottom: 5, paddingLeft: 10, paddingBottom: 2, paddingTop: 1, paddingRight: 8, borderRadius: 3}}>10 Aug, 2021</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                            <View style={{ flex: 1, flexDirection: 'column', }}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Price</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Rs. 210</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Distance</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>30KM</Text>
                                            </View>

                                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'center'}}>
                                                <Text style={{ color: '#808B96', fontFamily: 'Montserrat-Medium'}}>Weight</Text>
                                                <Text style={{ color: '#2C2C2C', fontSize: 15, fontFamily: 'Montserrat-Medium'}}>Less than 20KG</Text>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>

                            <View style={{flex: 0, marginBottom: 65}}></View>
                        </View>
                    </ScrollView>
                </Tab>
            </Tabs>

            <View style={styles.bottom}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                    <View style={{ width: '100%', }}>
                        <Button block style={styles.button} onPress={() => gotoPage('order')}>
                            <Text style={styles.buttonText}>Create an order</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
	},
    bottom: {
		position: 'absolute',
		bottom: 0,
        width: '100%',
        backgroundColor: '#FBFCFC',
	},
    button: {
		backgroundColor: '#FBFCFC',
        borderColor: '#24287B',
        borderWidth: 1,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        paddingTop: 0,
        borderRadius: 5
	},
    buttonText: {
		color: '#24287B',
		fontFamily: 'Montserrat-Medium',
		fontSize: 17
	},
})

export default Home;