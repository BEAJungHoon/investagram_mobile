import React from "react";
import { StyleSheet, Button, Text, View, KeyboardAvoidingView, Image, TextInput } from "react-native";
import IconTextInput from "../components/IconTextInput";
import Joi from 'joi-browser';
import DeviceStorage from '../services/deviceStorage';

class SignInScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password_login: ''
			// email: '123@123.1',
			// password_login: '123',
		}
	}

	schema = {
		email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	}

	onChangeText = (key, val) => {
		this.setState({ [key]: val })
	}

	// signUp = async () => {
	// 	this.props.navigation.navigate("SignUpScreen");
	// }

	signIn = async () => {
		const { password_login, email } = this.state;

		if (!email) {
			alert('Email is empty.'); return;
		}

		if (!password_login) {
			alert('Password is empty.'); return;
		}

		const validateError = Joi.validate({ email }, this.schema);
		if (validateError.error !== null) {
			alert(validateError.error.details[0].message); return;
		}
		
		fetch('http://localhost:8080/api/auth', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password_login })
		})
			.then(response => response.json())
			.then(data => {
				if(data.success) {
					console.log(data.token);
					//토큰 저장
					DeviceStorage.DeviceStorage.setJwt(data.token);
					
					// 메인 페이지로 이동
					this.props.navigation.navigate("Home")
				} else {
					alert(data.error);}
				}
			)
			.catch(err => console.log(err));
	}

	render() {
		return (

			<View style={styles.container}>
				<View style={styles.header}/>
				<Image source={require('../')}/>
				<View style={styles.title}>
					
					<Text style={{fontSize:35,paddingBottom:20, color: '#333333'}}>Investagram</Text>
					<View style={{width:"100%",
									borderBottomWidth:0.5,
									borderColor:'#444',
									paddingBottom: 20}} />
				</View>

				<View stlye={styles.content}>
					<View style={styles.signin_view}>
							<TextInput style={styles.input}
										iconName={"ios-mail"}
										placeholder='Email'
										autoCapitalize='none'
										placeholderTextColor='gray'
										onChangeText={val => this.onChangeText('email', val)}
										value={this.state.email}/>
					</View>
				</View>

				<View stlye={styles.content}>
					<View style={styles.signin_view}>
							<TextInput style={styles.input}
										iconName={"ios-lock"}
										placeholder='Password'
										autoCapitalize="none"
										placeholderTextColor='gray'
										secureTextEntry={true}
										onChangeText={val => this.onChangeText('password_login', val)}
										value={this.state.password_login}/>
					</View>
				</View>

				<Button title='로그인'
						onPress={this.signIn}/>
				<Button title='회원가입' 
						onPress={this.props.navigation.navigate("SignUpScreen")}/>
						{/* // onPress={this.signUp}/> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		borderColor: '#aaa',
		width: '95%',
		height: 50,
		borderWidth: 1,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	signin_view: {
		flexDirection:'row',
		alignItems:'center',
		paddingBottom: 10
	}
})

export default SignInScreen;

