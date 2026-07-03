import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from "native-base";

const Stepper = ({step1, step2, step3}) => {
    return (
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {
            step1 &&
            <>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.activeIcon} />
                    <Text style={[styles.text, styles.activeText]}></Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', }}>
                    <Icon name='checkmark-circle' style={styles.inactiveIcon} />
                    <Text style={[styles.text, styles.inactiveText]}></Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.inactiveIcon} />
                    <Text style={[styles.text, styles.inactiveText]}></Text>
                </View>
                
                <Icon name='md-stop-circle' style={styles.inactiveIcon} />
            </>
        }

        {
            step2 &&
            <>  
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.activeIcon} />
                    <Text style={[styles.text, styles.activeText]}></Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', }}>
                    <Icon name='checkmark-circle' style={styles.activeIcon} />
                    <Text style={[styles.text, styles.activeText]}></Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.inactiveIcon} />
                    <Text style={[styles.text, styles.inactiveText]}></Text>
                </View>
                
                <Icon name='md-stop-circle' style={styles.inactiveIcon} />
            </>
        }
        
        {
            step3 &&
            <>  
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.activeIcon} />
                    <Text style={[styles.text, styles.activeText]}></Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.activeIcon} />
                    <Text style={[styles.text, styles.activeText]}></Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name='checkmark-circle' style={styles.activeIcon} />
                    <Text style={[styles.text, styles.activeText]}></Text>
                </View>
                
                <Icon name='md-stop-circle' style={styles.inactiveIcon} />
            </>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    activeIcon: {
		color: '#1DDCAF'
	},

    inactiveIcon: {
		color: '#ABB2B9'
	},

    text: {
        flex: 1,
        height: 3,
        position: 'relative',
        marginTop: 12
	},

    activeText: {
		backgroundColor: '#1DDCAF'
	},

    inactiveText: {
		backgroundColor: '#ABB2B9'
	},
})

export default Stepper;