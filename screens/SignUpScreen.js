import React from "react";
import { StyleSheet, Button, Text, View, KeyboardAvoidingView, Image, TextInput } from "react-native";
import IconTextInput from "../components/IconTextInput";
import RoundButton from "../components/RoundButton";
import Joi from 'joi-browser';

class SignupScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			nickname: '',
			email: '',
			password: '',
			password_re: ''
		}
	}

	schema = {
		email: Joi.string().email({ minDomainAtoms: 2 }).required(),
		password: Joi.string().required().min(3).label('password'),
	}

	  onChangeText = (key, val) => {
		this.setState({ [key]: val })
	  }
	  
	  signUp = async () => {
		const {nickname, password, password_re, email} = this.state;
		if(!nickname) {
			alert('Nickname is empty.'); 
			return;
		}

		if(!email) {
			alert('Email is empty.');
			return;
		}

		if(!password) {
			alert('Password is empty.'); 
			return;
		}

		if(!password_re) {
			alert('Repeat password is empty.');
			return;
		}

		const validateError = Joi.validate({email, password}, this.schema);

		if(validateError.error !== null) {
			alert(validateError.error.details[0].message); 
			return;
		}

		if(password !== password_re) {
			alert('Passwords do not match.'); 
			return;
		}

		fetch('http://localhost:8080/api/users', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({email, password, nickname})
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(err => console.log(err));

		// try {
		//   // here place your signup logic
		//   console.log('successfully signed up!: ', success)
		// } catch (err) {
		//   console.log('error signing up: ', err)
		// }
	  }

  render() {
    return (
		<View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Nickname'
          autoCapitalize="none"
          placeholderTextColor='white'
		  onChangeText={val => this.onChangeText('nickname', val)}
		  value={this.state.nickname}
        />
		<TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
		  onChangeText={val => this.onChangeText('email', val)}
		  value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
		  onChangeText={val => this.onChangeText('password', val)}
		  value={this.state.password}
        />
		<TextInput
          style={styles.input}
          placeholder='Repeat password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
		  onChangeText={val => this.onChangeText('password_re', val)}
		  value={this.state.password_re}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	input: {
	  width: 350,
	  height: 55,
	  backgroundColor: 'gray',
	  margin: 10,
	  padding: 8,
	  color: 'white',
	  borderRadius: 14,
	  fontSize: 18,
	  fontWeight: '500',
	},
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center'
	}
  })

export default SignupScreen;

