import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';

import ExchangeService from '../services/ExchangeService';
import ApiDataService from '../services/apiDataService';
import OrderService from '../services/orderService';
import Joi from 'joi-browser';
import Rule from '../components/common/validateRule.customOrder';
import MarketsService from '../services/marketsService';
import AccountService from '../services/accountService';

class ServiceListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			exchange: 'UPbit',
			market: 'BTC-ETH',
			type: 'Stoploss',
			triggerPrice_text: '0.001',
			orderPrice_text: '0.0009',
			quantity_text: '100',
			errors: {},
            defaultMarkets: {},
            rule: Rule
			// triggerPrice_down: ''
		}
	}

	schema = {
        exchange: Joi.string().required(),
        market: Joi.string().required(),
        type: Joi.string().required(),
        stop: Joi.number().required().min(0),
        buy: Joi.number().required().min(0),
        sell: Joi.number().required().min(0),
        triggerPrice: Joi.number().required().min(0),
        orderPrice: Joi.number().required().min(0),
        quantity: Joi.number().required().min(0)
    }

	handleChangeText = name => (value, index, data) => {
		this.setState({[name]: value})
	}

	// handlePress1 = (name, exchange, price) => () => {
	// 	ExchangeService.getTicker(exchange, price, () => {
	// 		const {data} = this.state;
	// 		const {exchange} = data;
	// 		if(!data[name]) {
	// 			return;
	// 		}
	// 		if(data[name] === '0.01') {
	// 			return;
	// 		}
	// 		let price = Number(data[name]);

	// 		for(let i=10; i>0; i--) {
	// 			price = ExchangeService.tickDown(exchange, price);
	// 			console.log(i, price);
	// 		}
	// 		data[name] = price.toString();
	// 		this.setState({data});
	// 	});
    // }

	handlePress2 = (name, exchange, market)  => () => {
		ExchangeService.getTicker(exchange, market, (err, res) => {
			if(err) {
				alert(err);
			} else {
				// const state = this.state;
				// state[name] = res;
				this.setState({[name]: res.toString()}, () => console.log(this.state));
			}
		});
	}
	
	doSubmit = () => {
		// 어떤함수로 요청을 보낼까? ApiDataService.getApiData() 
		// 그 함수에 필요한 인자? {exchange, quantity}
		// 응답 형태 ?  OrderService.postOrder().json()
		console.log('doSubmit start....');
		
		ApiDataService.getApiData((err, sets) => {
			console.log('err:', err);
			console.log('sets:', sets);
			if(err) {
				// console.log('ApiDataService.getApiData:err', err);
				// return;
			}
			console.log('ee');
			const {exchange, quantity} = this.state;

			console.log('sets:', sets);

			if(sets.length === 0) {
				console.log('empty sets');	
				// return;

				//******* DEBUG */
				sets = [{exchange: 'upbit', apiKey: 'thisisakey', apiSecret: 'thisisasecret'}];
				//******* DEBUG */
			}
			if(sets.filter(set => set.exchange === exchange.toLowerCase()).length === 0) {
				console.log('------------' + exchange + '------------');
				// return;
			}

			if(quantity && quantity === 0 ) {
				console.log('------------' + quantity + '------------');
				// return;
			}

			console.log('Post order ready!');

			const order = this.state;
			order.type = order.type.toLowerCase();

			OrderService.postOrder(this.state, (err, response) => {
				if(err && Object.keys(err).length > 0) throw err;
                console.log('OrderService.postOrder.response:', response);
                if(response.success) {
                    alert(response.message);
                    // window.location = "/";
                } else {
                    alert(response.error);
                }
			});
		});
	}

  render() {
	  const {exchange, market, type, triggerPrice_text, orderPrice_text, quantity_text} = this.state;
		// let data = [[ "A", "B", "C", "D", "E" ]];
		let exchange_name = [{value: 'UPbit'}, {value: 'Bithumb'}, {value: 'CoinOne'}, {value: 'BitMAX'}, {value: 'Apple'}];
		let market_name = [{value: 'BTC-ETH'}, {value: 'BTC-XRP'}, {value: 'ETH-LTC'}, {value: 'ETH-XRP'}, {value: 'KRW-BTC'}, {value: 'KRW-EOS'}];
		let type_name = [{value: 'Position entry'}, {value: 'Stoploss'}];
		
      return (
		<View style={styles.container}>
			
			<Dropdown label='Exchange' 
						data={exchange_name}
						onChangeText={this.handleChangeText('exchange')}
						value={exchange}/>
			<Dropdown label='Market'
						data={market_name}
						onChangeText={this.handleChangeText('market')}
						value={market}/>
			<Dropdown label='Type'
						data={type_name}
						onChangeText={this.handleChangeText('type')}
						value={type}/>

			<Text>Trigger Price</Text>
			<View style={styles.customOrder_view}>
				<TextInput style={{height: 40, width: '50%', borderWidth: 1, borderColor: 'gray'}}
						onChangeText={(text) => this.setState({triggerPrice_text: text})}
						autoCapitalize="none"
						value={triggerPrice_text}>
				</TextInput>
					<TouchableOpacity onPress={this.handlePress2('triggerPrice_text', exchange, market)}>
						<Text style={{height: 40, borderWidth: 1}}>Current Price</Text>
					</TouchableOpacity>
			</View>

			<Text>Order Price</Text>
			<View style={styles.customOrder_view}>
				<TextInput style={{height: 40, width: '50%', borderWidth: 1, borderColor: 'gray'}}
						onChangeText={(text) => this.setState({orderPrice_text: text})}
						autoCapitalize="none"
						value={orderPrice_text}>
				</TextInput>
					<TouchableOpacity onPress={this.handlePress2('orderPrice_text', exchange, market)}>
						<Text style={{height: 40, borderWidth: 1}}>Current Price</Text>
					</TouchableOpacity>
			</View>			

			<Text>Quantity Price</Text>
			<View style={styles.customOrder_view}>
				<TextInput style={{height: 40, width: '94%', borderWidth: 1, borderColor: 'gray'}}
						onChangeText={(text) => this.setState({quantity_text: text})}
						autoCapitalize="none"
						value={quantity_text}>
				</TextInput>
				<TouchableOpacity >
					<Text style={{height: 40, borderWidth: 1}}>ALL</Text>
				</TouchableOpacity>
			</View>		

			<View style={styles.submit_view}>
				<TouchableOpacity style={{height: 40, width: '27%' ,borderWidth: 1}}
						onPress={this.doSubmit}>
					<Text>Submit Order</Text>
				</TouchableOpacity>
			</View>

		</View>
					
					
	  );
	}
}
const styles = StyleSheet.create ({
	container: {
		flex: 1,
	},
	customOrder_view: {
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	submit_view: {
		alignItems: 'center'
	}
});

export default ServiceListScreen;
