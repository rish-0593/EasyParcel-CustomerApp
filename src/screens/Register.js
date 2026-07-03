import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Form, Item, Button } from "native-base";
import TextInputMask from 'react-native-text-input-mask';

const Register = ({ navigation }) => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const changeScreen = () => {
    navigation.navigate('Login')
  }

  const enterMobile = (formatted, extracted) => {
    console.log(formatted, extracted);
  }

  const onPressStep1 = (step) => {
    if(step == 'next'){
      setStep1(false);
      setStep2(true);
    }
    
    if(step == 'back'){
      setStep1(true);
      setStep2(false);
      setStep3(false);
    }
  }

  const onPressStep2 = () => {
    setStep2(false);
    setStep3(true);
  }

  const onPressSubmit = () => {
    // this is final step
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.middle}>
        <Text style={styles.textContainer}>App Name!</Text>

        <View style={styles.registerForm}>
          <Text style={[styles.textContainer, styles.registerText]}>Register</Text>

          <Form style={styles.mainForm}>
            {
              step1 && 
              <Item style={styles.formItems}>
                <TextInputMask
                  placeholder="Mobile No"
                  keyboardType='numeric'
                  onChangeText={(formatted, extracted) => enterMobile(formatted, extracted)}
                  mask={"+91 [00000] [00000]"}
                  style={styles.input}/>
              </Item>
            }

            {
              step2 && 
              <Item style={styles.formItems}>
                <TextInputMask
                  placeholder="Enter OTP"
                  keyboardType='numeric'
                  mask={"    [0]       [0]       [0]       [0]"}
                  style={styles.input}/>
              </Item>
            }
            
            {
              step3 && 
              <Item style={styles.formItems}>
                <TextInputMask
                  placeholder="Set a password"
                  secureTextEntry={true}
                  style={styles.input}/>
              </Item>
            }

            <View style={styles.registerButton}>
              {
                step1 && 
                <Button block style={styles.button} onPress={() => onPressStep1('next')}>
                  <Text style={styles.buttonText}>Next</Text>
                </Button>
              }

              {
                step2 && 
                <Fragment>
                  <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ width: '50%', borderRightWidth: 5, borderRightColor: '#fff' }}>
                      <Button block iconLeft style={styles.button} onPress={() => onPressStep1('back')}>
                        <Text style={styles.buttonText}>Back</Text>
                      </Button>
                    </View>
                    
                    <View style={{ width: '50%', borderLeftWidth: 5, borderLeftColor: '#fff' }}>
                      <Button block style={styles.button} onPress={() => onPressStep2()}>
                        <Text style={styles.buttonText}>Next</Text>
                      </Button>
                    </View>
                  </View>
                </Fragment>
              }

              {
                step3 && 
                <Fragment>
                  <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ width: '50%', borderRightWidth: 5, borderRightColor: '#fff' }}>
                      <Button block iconLeft style={styles.button} onPress={() => onPressStep1('back')}>
                        <Text style={styles.buttonText}>Back</Text>
                      </Button>
                    </View>
                    
                    <View style={{ width: '50%', borderLeftWidth: 5, borderLeftColor: '#fff' }}>
                      <Button block style={styles.button} onPress={() => onPressSubmit()}>
                        <Text style={styles.buttonText}>Submit</Text>
                      </Button>
                    </View>
                  </View>
                </Fragment>
              }
              
            </View>
          </Form>
        </View>

        <Text style={[styles.textContainer, styles.loginMsg]}>Already have an account?</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => changeScreen()}>
          <Text style={[styles.textContainer, styles.loginText]}>Login Here!</Text>
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
    marginBottom: 50
  },

  registerForm: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    top: '20%',
    paddingBottom: 40,
    borderRadius: 10
  },

  registerText: {
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

  registerButton: {
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

  loginMsg: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    marginTop: 30,
    marginBottom: 10
  },
  
  loginText: {
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

export default Register;