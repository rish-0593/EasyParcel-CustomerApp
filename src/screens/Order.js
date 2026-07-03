import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Form, Input, Item, Button, Radio, Badge, Card, CardItem, Left, Body, Textarea, Icon } from "native-base";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Stepper from "../components/order/Stepper";

import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Order = ({navigation}) => {
	const screenWidth = Dimensions.get("window").width;

	const [step1, setStep1] = useState(true);
	const [step2, setStep2] = useState(false);
	const [step3, setStep3] = useState(false);
	const [step4, setStep4] = useState(false);

	const [orderType, setOrderType] = useState('normal'); // 1. Normal, 2. Scheduled
	const [date, setDate] = useState(new Date());
  	const [showDate, setShowDate] = useState(false);
  	const [showTime, setShowTime] = useState(false);

	const [courrierType, setCourrierType] = useState(null); // 1. pickup, 2. buy
	const [courrierName, setCourrierName] = useState(null); // 1. Pickup & Drop, 2. Flat Buy
	const [courrierModal, setCourrierModal] = useState(false);

  	const [weight, setWeight] = useState(null);
  	const [item, setItem] = useState(null);
	
	let pickUpRef = useRef(null);
	const [pickUpAddress, setPickUpAddress] = useState('');
	const [pickUpLatitude, setPickUpLatitude] = useState(0.0);
	const [pickUpLongitude, setPickUpLongitude] = useState(0.0);

	let dropUpRef = useRef(null);
	const [dropUpAddress, setDropUpAddress] = useState('');
	const [dropUpLatitude, setDropUpLatitude] = useState(0.0);
	const [dropUpLongitude, setDropUpLongitude] = useState(0.0);
	
	const [latitudeSW, setLatitudeSW] = useState(0.0);
	const [longitudeSW, setLongitudeSW] = useState(0.0);
	const [latitudeNE, setLatitudeNE] = useState(0.0);
	const [longitudeNE, setLongitudeNE] = useState(0.0);

	const [pickUpModalVisible, setPickUpModalVisible] = useState(false);
	const [dropUpModalVisible, setDropUpModalVisible] = useState(false);

	const onPressStep1 = (step) => {
		if(step == 'next'){
			setStep1(false);
			setStep2(true);
			setStep3(false);
			setStep4(false);
		}
		  
		if(step == 'back'){
			setStep1(true);
			setStep2(false);
			setStep3(false);
			setStep4(false);
		}
	}

	const onPressStep2 = (step) => {
		if(step == 'next'){
			setStep1(false);
			setStep2(false);
			setStep3(true);
			setStep4(false);
		}
		  
		if(step == 'back'){
			setStep1(false);
			setStep2(true);
			setStep3(false);
			setStep4(false);
		}
	}

	const onPressStep3 = () => {
		setStep1(false);
		setStep2(false);
		setStep3(false);
		setStep4(true);
	}

	const onPressStep4 = () => {
		// setStep1(true);
		// setStep2(false);
		// setStep3(false);
		// setStep4(false);
		navigation.navigate('Payment')
	}

	const onPressOrderType = (type) => {
		setOrderType(type);
		if(type == 'scheduled'){
			setShowDate(true);
		}
	}

  	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDate(Platform.OS === 'ios');
		setDate(currentDate);
		console.log('date', moment(currentDate).format('lll'));
		setShowTime(true);
  	};

  	const onChangeTime = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowTime(Platform.OS === 'ios');
		setDate(currentDate);
  	};

	const courrierTypeModal = () => {
		setCourrierModal(true)
	}

	const onPressCourrierType = (type, name) => {
		setCourrierType(type);
		setCourrierName(name);
	}

	const onPressWeight = (w) => {
		setWeight(w);
	}

	const onPressItem = (i) => {
		setItem(i);
	}

	useEffect(() => {
        Geolocation.getCurrentPosition((position) => {
			var lat = parseFloat(position.coords.latitude)
			var lng = parseFloat(position.coords.longitude)
			
			setPickUpLatitude(lat);
			setPickUpLongitude(lng);

			setDropUpLatitude(lat);
			setDropUpLongitude(lng);
		  },
		  (error) => console.log(JSON.stringify(error)),
		  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    },[]);

	const openSearchModalPickUp = () => {
		RNGooglePlaces.openAutocompleteModal({
            initialQuery: pickUpAddress,
			// locationRestriction: {
            //     latitudeSW: latitudeSW, 
            //     longitudeSW: longitudeSW, 
            //     latitudeNE: latitudeNE, 
            //     longitudeNE: longitudeNE
            // },
            country: 'IN',
            type: 'establishment'
        }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport'])
		.then((place) => {
			setPickUpAddress(place.name);

			setPickUpLatitude(place.location.latitude);
			setPickUpLongitude(place.location.longitude);

			console.log('hit', place.location);

			pickUpRef.current.animateCamera({
				center: {latitude: place.location.latitude, longitude: place.location.longitude}
			})

			// setLatitudeSW(place.viewport.latitudeSW);
			// setLongitudeSW(place.viewport.longitudeSW);
			// setLatitudeNE(place.viewport.latitudeNE);
			// setLongitudeNE(place.viewport.longitudeNE);
		})
		.catch(error => console.log(error.message));  // error is a Javascript Error object
	}

	const onRegionChangePickUp = (e) => {
		fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + e.latitude + ',' + e.longitude + '&key=KEY')
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log('ADDRESS1 !! => ' + responseJson.results[0].address_components);
            // console.log('ADDRESS2 !! => ' + JSON.stringify(responseJson.results[0]));

			if(responseJson.results[0]){
				setPickUpAddress(responseJson.results[0].formatted_address);

				setPickUpLatitude(responseJson.results[0].geometry.location.lat);
				setPickUpLongitude(responseJson.results[0].geometry.location.lng);

				computeDistance(responseJson.results[0].geometry.location.lat, responseJson.results[0].geometry.location.lng, dropUpLatitude, dropUpLongitude);
			}
		})
	}

	const openSearchModalDropUp = () => {
		RNGooglePlaces.openAutocompleteModal({
            initialQuery: dropUpAddress,
			// locationRestriction: {
            //     latitudeSW: latitudeSW, 
            //     longitudeSW: longitudeSW, 
            //     latitudeNE: latitudeNE, 
            //     longitudeNE: longitudeNE
            // },
            country: 'IN',
            type: 'establishment'
        }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport'])
		.then((place) => {
			setDropUpAddress(place.name);

			setDropUpLatitude(place.location.latitude);
			setDropUpLongitude(place.location.longitude);

			dropUpRef.current.animateCamera({
				center: {latitude: place.location.latitude, longitude: place.location.longitude}
			})

			// setLatitudeSW(place.viewport.latitudeSW);
			// setLongitudeSW(place.viewport.longitudeSW);
			// setLatitudeNE(place.viewport.latitudeNE);
			// setLongitudeNE(place.viewport.longitudeNE);
		})
		.catch(error => console.log(error.message));  // error is a Javascript Error object
	}

	const onRegionChangeDropUp = (e) => {
		fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + e.latitude + ',' + e.longitude + '&key=KEY')
        .then((response) => response.json())
        .then((responseJson) => {
			if(responseJson.results[0]){
				setDropUpAddress(responseJson.results[0].formatted_address);

				setDropUpLatitude(responseJson.results[0].geometry.location.lat);
				setDropUpLongitude(responseJson.results[0].geometry.location.lng);

				computeDistance(pickUpLatitude, pickUpLongitude, responseJson.results[0].geometry.location.lat, responseJson.results[0].geometry.location.lng);
			}
		})
	}

	const computeDistance = (pickUplat, pickUplng, dropUpLat, dropUpLng) => {
		if(pickUplat != dropUpLat && pickUplng != dropUpLng){
			fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + pickUplat + ',' + pickUplng + '&destinations=side_of_road:' + dropUpLat + ',' + dropUpLng + '&key=KEY')
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson.rows[0].elements[0].distance){
					console.log('distance', responseJson.rows[0].elements[0].distance.value);
				}
			})
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Stepper step1={step1} step2={step2} step3={step3}/>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.middle}>
				
					{
						step1 &&
						<>
							<Text style={styles.orderText}>Fill Your Order Details</Text>
							<Text style={styles.orderMsg}>Please fill the basic details to create order.</Text>
						</>
					}

					{
						step2 &&
						<>
							<Text style={styles.orderText}>Choose Your Pickup Point</Text>
							<Text style={styles.orderMsg}>Please fill the basic details of pickup point.</Text>
						</>
					}

					{
						step3 &&
						<>
							<Text style={styles.orderText}>Choose Your Delivery Point</Text>
							<Text style={styles.orderMsg}>Please fill the basic details of delivery point.</Text>
						</>
					}

					<Form style={styles.mainForm}>
						{
							step1 &&
							<>
								<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
									<View style={{ width: '48%', marginRight: '2%' }}>
										<Item style={styles.formItems} regular onPress={() => onPressOrderType('normal')}>
											<Radio 
												color={"#f0ad4e"}
												selectedColor={"#5cb85c"}
												selected={orderType == 'normal' ? true : false}
												onPress={() => onPressOrderType('normal')}
											/>
											<View>
												<Text style={{fontFamily: 'Montserrat-Bold', color: '#2d3057', marginLeft: 5, fontSize: 15}}>Normal</Text>
												<Text style={{fontFamily: 'Montserrat-Medium', color: '#2d3057', marginLeft: 3, fontSize: 10}}> {moment().format("lll")} </Text>
											</View>
										</Item>
									</View>

									<View style={{ width: '48%', marginLeft: '2%' }}>
										<Item style={styles.formItems} regular onPress={() => onPressOrderType('scheduled')}>
											<Radio 
												color={"#f0ad4e"}
												selectedColor={"#5cb85c"}
												selected={orderType == 'scheduled' ? true : false}
												onPress={() => onPressOrderType('scheduled')}
											/>
											<View>
												<Text style={{fontFamily: 'Montserrat-Bold', color: '#2d3057', marginLeft: 5, fontSize: 15}}>Scheduled</Text>
												<Text style={{fontFamily: 'Montserrat-Medium', color: '#2d3057', marginLeft: 3, fontSize: 10}}> {moment(date).format("lll")} </Text>
											</View>
											
										</Item>

										{showDate && (
											<DateTimePicker
												testID="datePicker"
												value={date}
												mode="date"
												is24Hour={false}
												display="spinner"
												onChange={onChangeDate}
												disabled={true}
												// timeZoneOffsetInMinutes={-330}
											/>
										)}
										{showTime && (
											<DateTimePicker
												testID="timePicker"
												value={date}
												mode="time"
												is24Hour={false}
												display="spinner"
												onChange={onChangeTime}
												disabled={true}
												// timeZoneOffsetInMinutes={-330}
											/>
										)}
									</View>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Courrier type</Text>
									<Item style={styles.formItems} regular>
										<Button block style={{ width: '100%', flexDirection: 'row'}} onPress={() => courrierTypeModal()} transparent>
											<Text numberOfLines={1} ellipsizeMode='tail' style={[styles.buttonText, { marginTop: -4, paddingHorizontal: 8, color: '#515A5A', flex: 1, width: 0, flexGrow: 1 }]}>
												{
													courrierName 
													? courrierName 
													: 'Courrier type'
												}
											</Text>
										</Button>
									</Item>
									<Modal
											animationType="fade"
											transparent={true}
											visible={courrierModal}
											onRequestClose={() => {
												setCourrierModal(!courrierModal);
											}}
										>
											<View style={{height: '100%',marginTop: 'auto',backgroundColor:'#00000087'}}>
												<TouchableOpacity onPress={() => setCourrierModal(false)} style={{flex: 3}}></TouchableOpacity>
												
												<View style={{flex: 1, backgroundColor:'#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
													<View style={{alignSelf: "center", margin: 20}}>
														<Text style={{ backgroundColor: '#e6e9f1', width: 80, height: 5, borderRadius: 10 }}></Text>
													</View>
													<View style={{flexDirection: 'column', marginHorizontal: 30}}>
														<View style={{flexDirection: 'row', marginTop: 10}}>
															<Item style={{ borderColor: '#fff', }} regular onPress={() => onPressCourrierType('pickup', 'Pickup & Drop')}>
																<Radio 
																	color={"#f0ad4e"}
																	selectedColor={"#5cb85c"}
																	selected={courrierType == 'pickup' ? true : false}
																	onPress={() => onPressCourrierType('pickup', 'Pickup & Drop')}
																/>
																<Text style={{fontFamily: 'Montserrat-Bold', color: '#2d3057', marginLeft: 5, fontSize: 15}}>Pickup & Drop</Text>
															</Item>
														</View>
														<View style={{flexDirection: 'row', marginTop: 15}}>
															<Item style={{ borderColor: '#fff', }} regular onPress={() => onPressCourrierType('buy', 'Flat Buy')}>
																<Radio 
																	color={"#f0ad4e"}
																	selectedColor={"#5cb85c"}
																	selected={courrierType == 'buy' ? true : false}
																	onPress={() => onPressCourrierType('buy', 'Flat Buy')}
																/>
																<Text style={{fontFamily: 'Montserrat-Bold', color: '#2d3057', marginLeft: 5, fontSize: 15}}>Flat Buy</Text>
															</Item>
														</View>
													</View>
												</View>
												<Button block style={styles.button} onPress={() => setCourrierModal(false)}>
													<Text style={styles.buttonText}>Close</Text>
												</Button>
											</View>
										</Modal>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Order Weight</Text>

									<View style={{flexDirection: "row", flexWrap: "wrap" }} >
										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressWeight(1)}>
												<Badge style={{ backgroundColor: (weight == 1 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Up to 1KG</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressWeight(5)}>
												<Badge style={{ backgroundColor: (weight == 5 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Up to 5KG</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressWeight(10)}>
												<Badge style={{ backgroundColor: (weight == 10 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Up to 10KG</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressWeight(15)}>
												<Badge style={{ backgroundColor: (weight == 15 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Up to 15KG</Text>
												</Badge>
											</Item>
										</View>
										
										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressWeight(20)}>
												<Badge style={{ backgroundColor: (weight == 20 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Up to 20KG</Text>
												</Badge>
											</Item>
										</View>
									</View>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Order Item</Text>

									<View style={{flexDirection: "row", flexWrap: "wrap" }} >
										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressItem(1)}>
												<Badge style={{ backgroundColor: (item == 1 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Food</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressItem(2)}>
												<Badge style={{ backgroundColor: (item == 2 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Groceries</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressItem(3)}>
												<Badge style={{ backgroundColor: (item == 3 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Documents</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressItem(4)}>
												<Badge style={{ backgroundColor: (item == 4 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Cloth</Text>
												</Badge>
											</Item>
										</View>
										
										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressItem(5)}>
												<Badge style={{ backgroundColor: (item == 5 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Flowers</Text>
												</Badge>
											</Item>
										</View>

										<View style={{alignSelf: "flex-start"}}>
											<Item style={{ borderColor: '#fff', marginLeft: 0 }} onPress={() => onPressItem(6)}>
												<Badge style={{ backgroundColor: (item == 6 ? '#5cb85c' : '#E5E7E9'), margin: 5, marginLeft: 0 }}>
													<Text style={{ color: '#2d3057', fontFamily: 'Montserrat-Medium', paddingHorizontal: 5 }}>Other</Text>
												</Badge>
											</Item>
										</View>
									</View>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Phone Number</Text>
									<Item style={styles.formItems} regular>
										<Input
											placeholder="Phone"
											style={styles.input}/>
									</Item>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Order Value</Text>
									<Item style={styles.formItems} regular>
										<Input
											placeholder="Order Value"
											style={styles.input}/>
									</Item>
								</View>

								<View style={{ marginTop: 20, marginBottom: 50, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Upload Photo (Optional)</Text>
									<Item style={styles.formItems} regular>
										<Input
											placeholder="Choose File"
											disabled
											style={styles.input}/>
										<Icon name='cloud-upload-outline' />
									</Item>
								</View>
							</>
						}
						
						{
							step2 &&
							<>
								<View style={{ marginTop: 0, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Address</Text>
									<Item style={styles.formItems} regular>
										<Button block style={{ width: '100%', flexDirection: 'row'}} onPress={() => setPickUpModalVisible(true)} transparent iconRight>
											<Text numberOfLines={1} ellipsizeMode='tail' style={[styles.buttonText, { marginTop: -4, paddingHorizontal: 8, color: '#515A5A', flex: 1, width: 0, flexGrow: 1 }]}>
												{
													pickUpAddress 
													? pickUpAddress 
													: 'Address'
												}
											</Text>
											<Icon name='location-outline' />
										</Button>

										<Modal
											animationType="slide"
											visible={pickUpModalVisible}
											onRequestClose={() => {
												setPickUpModalVisible(!pickUpModalVisible);
											}}
										>
											<View style={styles.centeredView}>
												<View style={styles.modalView}>
													<View style={{ marginHorizontal: 10 }}>
														<Button block style={{ elevation: 10, width: '100%', height: 48, marginTop: 10, position: 'absolute', zIndex: 1, backgroundColor: '#fff'}} onPress={() => openSearchModalPickUp()} transparent iconRight>
															<Text numberOfLines={1} ellipsizeMode='tail' style={[styles.buttonText, { marginTop: -4, paddingHorizontal: 15, color: '#515A5A', flex: 1 }]}>
																{
																	pickUpAddress 
																	? pickUpAddress 
																	: 'Address'
																}
															</Text>
															<Icon name='location-outline' />
														</Button>
													</View>

													<View style={{flex: 1}}>
														<Icon name="location" 
															style={{ 
																zIndex: 3,
																position: 'absolute',
																marginTop: -52,
																marginLeft: -27,
																left: '50%',
																top: '50%',
																fontSize: 40,
																color: '#FF5733'
															}}
														/>
														
														<MapView
															ref={pickUpRef} 
															provider={PROVIDER_GOOGLE} // remove if not using Google Maps 
															style={{ width: screenWidth, height: 100, flex: 1, }} 
															showsUserLocation={true} 
															zoomEnabled={true} 
															zoomControlEnabled={true} 
															onRegionChangeComplete={(e) => onRegionChangePickUp(e) }
															initialRegion={{  
																latitude: pickUpLatitude,   
																longitude: pickUpLongitude,  
																latitudeDelta: 0.0922,  
																longitudeDelta: 0.0421,  
															}}>  
															
																	{/* <Marker 
																		coordinate={{ latitude: latitude, longitude: longitude }} 
																	/> */}
														</MapView>
													</View>

													<View>
														<Button block style={styles.button} onPress={() => setPickUpModalVisible(!pickUpModalVisible)}>
															<Text style={styles.buttonText}>Choose</Text>
														</Button>
													</View>
												</View>
											</View>
										</Modal>
									</Item>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Full Address</Text>
									<View style={styles.formItemsTextAreaAddress}>
										<Textarea
											placeholder="Full Address"
											numberOfLines={80}
											style={styles.textareaAddress}
										/>
									</View>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Phone</Text>
									<Item style={styles.formItems} regular>
										<Input
											placeholder="Phone"
											style={styles.input}/>
									</Item>
								</View>

								<View style={{ marginTop: 20, marginBottom: 50, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Comment</Text>
									<View style={styles.formItemsTextArea}>
										<Textarea
											placeholder="Comment"
											numberOfLines={125}
											style={styles.textarea}
										/>
									</View>
								</View>
							</>
						}

						{
							step3 &&
							<>
								<View style={{ marginTop: 0, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Address</Text>
									<Item style={styles.formItems} regular>
										<Button block style={{ width: '100%', flexDirection: 'row'}} onPress={() => setDropUpModalVisible(true)} transparent iconRight>
											<Text numberOfLines={1} ellipsizeMode='tail' style={[styles.buttonText, { marginTop: -4, paddingHorizontal: 8, color: '#515A5A', flex: 1, width: 0, flexGrow: 1 }]}>
												{
													dropUpAddress 
													? dropUpAddress 
													: 'Address'
												}
											</Text>
											<Icon name='location-outline' />
										</Button>

										<Modal
											animationType="slide"
											visible={dropUpModalVisible}
											onRequestClose={() => {
												setDropUpModalVisible(!dropUpModalVisible);
											}}
										>
											<View style={styles.centeredView}>
												<View style={styles.modalView}>
													<View style={{ marginHorizontal: 10 }}>
														<Button block style={{ elevation: 10, width: '100%', height: 48, marginTop: 10, position: 'absolute', zIndex: 1, backgroundColor: '#fff'}} onPress={() => openSearchModalDropUp()} transparent iconRight>
															<Text numberOfLines={1} ellipsizeMode='tail' style={[styles.buttonText, { marginTop: -4, paddingHorizontal: 15, color: '#515A5A', flex: 1 }]}>
																{
																	dropUpAddress 
																	? dropUpAddress 
																	: 'Address'
																}
															</Text>
															<Icon name='location-outline' />
														</Button>
													</View>

													<View style={{flex: 1}}>
														<Icon name="location" 
															style={{ 
																zIndex: 3,
																position: 'absolute',
																marginTop: -52,
																marginLeft: -27,
																left: '50%',
																top: '50%',
																fontSize: 40,
																color: '#FF5733'
															}}
														/>
														
														<MapView
															ref={dropUpRef} 
															provider={PROVIDER_GOOGLE} // remove if not using Google Maps 
															style={{ width: screenWidth, height: 100, flex: 1, }} 
															showsUserLocation={true} 
															zoomEnabled={true} 
															zoomControlEnabled={true} 
															onRegionChangeComplete={(e) => onRegionChangeDropUp(e) }
															initialRegion={{  
																latitude: dropUpLatitude,   
																longitude: dropUpLongitude,  
																latitudeDelta: 0.0922,  
																longitudeDelta: 0.0421,  
															}}>  
															
																	{/* <Marker 
																		coordinate={{ latitude: latitude, longitude: longitude }} 
																	/> */}
														</MapView>
													</View>

													<View>
														<Button block style={styles.button} onPress={() => setDropUpModalVisible(!dropUpModalVisible)}>
															<Text style={styles.buttonText}>Choose</Text>
														</Button>
													</View>
												</View>
											</View>
										</Modal>
									</Item>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Full Address</Text>
									<View style={styles.formItemsTextAreaAddress}>
										<Textarea
											placeholder="Full Address"
											numberOfLines={80}
											style={styles.textareaAddress}
										/>
									</View>
								</View>

								<View style={{ marginTop: 20, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Phone</Text>
									<Item style={styles.formItems} regular>
										<Input
											placeholder="Phone"
											style={styles.input}/>
									</Item>
								</View>

								<View style={{ marginTop: 20, marginBottom: 50, width: '100%' }}>
									<Text style={{color: '#2d3057', fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5,}}>Comment</Text>
									<View style={styles.formItemsTextArea}>
										<Textarea
											placeholder="Comment"
											numberOfLines={125}
											style={styles.textarea}
										/>
									</View>
								</View>
							</>
						}
					</Form>

					{
						step4 &&
						<View style={{ marginTop: -50 }}>
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

							<Card style={{flex: 0, marginBottom: 50}}>
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
						</View>
					}
				</View>
				<View style={styles.bottom}>
					<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
						{
							step1 &&
							<View style={{ width: '100%' }}>
								<Button block style={styles.button} onPress={() => onPressStep1('next')}>
									<Text style={styles.buttonText}>Next</Text>
								</Button>
							</View>
						}

						{
							step2 &&
							<>
								<View style={{ width: '48%', marginRight: '2%' }}>
									<Button block iconLeft style={styles.button} onPress={() => onPressStep1('back')}>
										<Text style={styles.buttonText}>Back</Text>
									</Button>
								</View>
								<View style={{ width: '48%', marginRight: '2%' }}>
									<Button block style={styles.button} onPress={() => onPressStep2('next')}>
										<Text style={styles.buttonText}>Next</Text>
									</Button>
								</View>
							</>
						}

						{
							step3 &&
							<>
								<View style={{ width: '48%', marginRight: '2%' }}>
									<Button block iconLeft style={styles.button} onPress={() => onPressStep2('back')}>
										<Text style={styles.buttonText}>Back</Text>
									</Button>
								</View>
								<View style={{ width: '48%', marginRight: '2%' }}>
									<Button block style={styles.button} onPress={() => onPressStep3()}>
										<Text style={styles.buttonText}>Preview</Text>
									</Button>
								</View>
							</>
						}

						{
							step4 &&
							<View style={{ width: '100%' }}>
								<Button block style={styles.button} onPress={() => onPressStep4()}>
									<Text style={styles.buttonText}>Submit</Text>
								</Button>
							</View>
						}
						
					</View>
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

	top: {
		paddingHorizontal: 15,
		marginBottom: 3,
		marginTop: -5
	},

	middle: {
		width: '100%',
		height: '100%',
		flex: 1,
		// zIndex: 2,
		backgroundColor: 'transparent',
		paddingHorizontal: 10,
		marginVertical: 10
	},

	orderText: {
		fontSize: 18,
		fontFamily: 'Montserrat-Bold',
	},

	orderMsg: {
		fontSize: 13,
		fontFamily: 'Montserrat-Medium',
		color: '#85929E'
	},

	mainForm: {
		marginTop: 20,
	},

	formItems: {
		backgroundColor: '#E5E7E9',
		borderColor: '#E5E7E9',
		borderRadius: 5,
		height: 45,
		paddingLeft: 10,
	},

	formItemsTextArea: {
		backgroundColor: '#E5E7E9',
		borderColor: '#E5E7E9',
		borderRadius: 5,
		height: 125,
		paddingLeft: 10,
	},

	formItemsTextAreaAddress: {
		backgroundColor: '#E5E7E9',
		borderColor: '#E5E7E9',
		borderRadius: 5,
		height: 80,
		paddingLeft: 10,
	},

	input: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		width: '100%',
	},

	textarea: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		width: '100%',
		height: 125
	},

	textareaAddress: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 15,
		width: '100%',
		height: 80
	},

	bottom: {
		paddingHorizontal: 16,
		position: 'absolute',
		bottom: 0
	},

	button: {
		backgroundColor: '#1DDCAF'
	},
	
	buttonText: {
		color: '#2d3057',
		fontFamily: 'Montserrat-Medium',
		fontSize: 16
	},

	centeredView: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},

	modalView: {
		flex: 1,
		backgroundColor: "white",
		flexDirection: 'column'
	},
})

export default Order;