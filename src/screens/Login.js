import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Form, Item, Button } from "native-base";
import TextInputMask from 'react-native-text-input-mask';

const Login = ({ navigation }) => {
  const changeScreen = () => {
    navigation.navigate('Register')
  }

  const goToPage = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.middle}>
        <Text style={styles.textContainer}>App Name!</Text>

        <View style={styles.loginForm}>
          <Text style={[styles.textContainer, styles.loginText]}>Log in</Text>

          <Form style={styles.mainForm}>
            <Item style={styles.formItems}>
              <TextInputMask
                placeholder="Phone"
                keyboardType='numeric'
                mask={"+91 [00000] [00000]"}
                style={styles.input}/>
            </Item>

            <Item style={styles.formItems}>
              <TextInputMask
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}/>
            </Item>

            <View style={styles.loginButton}>
              <Button block style={styles.button} onPress={() => goToPage()}>
                <Text style={styles.buttonText}>Submit</Text>
              </Button>
            </View>
          </Form>
        </View>

        <Text style={[styles.textContainer, styles.registerMsg]}>Don't have an account?</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => changeScreen()}>
          <Text style={[styles.textContainer, styles.registerText]}>Register Here!</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.bottom}></View>
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  top: {
    position: 'relative',
    backgroundColor: '#1BBC9B',
    paddingHorizontal: 12.7,
    height: '100%'
  },

  middle: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingHorizontal: 26.3
  },

  textContainer: {
    fontFamily: 'Montserrat-Bold',
    color: '#fcfdff',
    fontSize: 24,
    position: 'relative',
    top: '20%',
    alignSelf: 'center',
    marginBottom: 30
  },

  loginForm: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    top: '20%',
    paddingBottom: 40,
    borderRadius: 10
  },

  loginText: {
    top: 0,
    color: '#2d3057',
    marginTop: 20,
    marginBottom: 10
  },

  mainForm: {

  },

  formItems: {
    marginTop: 15,
    borderBottomColor: '#2d3057',
    marginHorizontal: 15,
  },

  input: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    width: '100%'
  },

  loginButton: {
    padding: 30.8,
    borderRadius: 10
  },

  button: {
    backgroundColor: '#1DDCAF'
  },

  buttonText: {
    color: '#2d3057',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16
  },

  registerMsg: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    marginTop: 30,
    marginBottom: 10
  },
  
  registerText: {
    fontSize: 15,
    color: '#2d3057'
  },

  buttonContainer: {
    position: 'relative',
    top: '18.5%',
  },

  bottom: {
    position: 'relative',
    height: '100%',
    paddingHorizontal: 12.7,
    backgroundColor: '#1BBC9B'
  }
});

export default Login;