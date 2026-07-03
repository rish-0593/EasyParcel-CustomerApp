import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Badge, Button, Input, Item, Icon } from "native-base";
import io from "socket.io-client";

const socket = io('https://server-c005.herokuapp.com', {transports: ['websocket', 'polling', 'flashsocket']});

const Chat = ({navigation}) => {
    const scrollViewRef = useRef();
    const[message, setMessage] = useState('');
    const[lists, setList] = useState([]);

    useEffect(() => {
        socket.on('message', ({message}) => {
            var temp = lists;
            temp.push({ message });
            setList([...temp]);
        })
    }, [socket]);

    const sendMessage = (message) => {
        if(message != ''){
            // var msg = lists;
            // msg = msg.concat(message)
            // setList(msg);

            socket.emit('message', {message});

            setMessage('');
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
            >
                <View style={{alignSelf: "center"}}>
                    <Badge style={{ backgroundColor: '#E5E7E9', margin: 5}}>
                        <Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>03-08-2021</Text>
                    </Badge>
                </View>

                <View style={{ margin: 5, marginLeft: 10, alignItems: 'flex-start', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomLeftRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                <View style={{ margin: 5, marginRight: 10, alignItems: 'flex-end', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomRightRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                <View style={{ margin: 5, marginRight: 10, alignItems: 'flex-end', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomRightRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                <View style={{alignSelf: "center"}}>
                    <Badge style={{ backgroundColor: '#E5E7E9', margin: 5}}>
                        <Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>03-08-2021</Text>
                    </Badge>
                </View>

                <View style={{ margin: 5, marginLeft: 10, alignItems: 'flex-start', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomLeftRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                <View style={{ margin: 5, marginRight: 10, alignItems: 'flex-end', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomRightRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                <View style={{ margin: 5, marginLeft: 10, alignItems: 'flex-start', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomLeftRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                <View style={{ margin: 5, marginRight: 10, alignItems: 'flex-end', }}>
                    <View style={{ backgroundColor: '#fff',  width: '80%', elevation: 3, borderRadius: 10, borderBottomRightRadius: 0, padding: 10}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                    </View>
                </View>

                {
                    lists && lists.map((v, i) =>
                        <View style={{ margin: 5, marginRight: 10, alignItems: 'flex-end', }} key={i}>
                            <View style={{ backgroundColor: '#fff',  maxWidth: '80%', elevation: 3, borderRadius: 10, borderBottomRightRadius: 0, padding: 10}}>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 15, color: '#283747'}}>{v.message}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#808B96', marginTop: 2, marginBottom: -3, textAlign: 'right'}}>02:51 PM</Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>

            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 4, marginHorizontal: 2, }}>
                <Item style={styles.formItems} regular>
                    <Input
                        placeholder="Type a message"
                        style={styles.input}
                        value={message}
                        onChangeText={value => setMessage(value)}
                    />
				</Item>
                <Button style={styles.button} onPress={() => sendMessage(message)}>
                    <Icon name='send' style={{ fontSize: 25, marginLeft: 15, marginRight: 0 }}/>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
        backgroundColor: '#D1F2EB'
	},

    formItems: {
		backgroundColor: '#fff',
		borderColor: '#E5E7E9',
		borderRadius: 50,
		height: 50,
		paddingLeft: 10,
        flex: 1,
	},

    button: {
		backgroundColor: '#1DDCAF',
        marginLeft: 0,
        height: 50,
        width: 50,
        borderRadius: 100,
        padding: 0,
	},

    input: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 17,
		width: '100%',
	},
})

export default Chat;