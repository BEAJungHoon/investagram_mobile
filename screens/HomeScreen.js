import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Tab
} from "react-native";
import Promise from "promise";

import subscribeWS from "../scripts/myWebsocket";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      dataSource: [],
      // curTime: null
    };
  }

  componentDidMount() {
    var ws = new WebSocket("wss://api.upbit.com/websocket/v1");
    
    // console.log('HomeScreen');
    return fetch("https://api.upbit.com/v1/market/all")
      .then(response => response.json())
      .then(responseJson => {
        return new Promise((resolve, reject) => {
          let marketArray = [];
          responseJson.forEach(element => {
            marketArray.push(element.market);
          });
          marketArray.sort();

          let marketToIndex = [];
          for (let i = 0; i < marketArray.length; i++) {
            marketToIndex[marketArray[i]] = i;
          }
          console.log("marketArray.length:", marketArray.length);
          console.log("marketArray", marketArray);

          // console.log('marketToIndex[\'KRW-BTC\']:', marketToIndex['']);
          // console.log('marketToIndex[\'USDT-BTC\']:', marketToIndex['']);

          resolve({ marketArray, marketToIndex });
        });
      })
      .then(res => {
        const { marketArray, marketToIndex } = res;
        subscribeWS(ws, marketArray, (market, price) => {
          let dataSource = this.state.dataSource;

          const index = marketToIndex[market];

          dataSource[index] = { market: market, price: price };
          this.setState({ dataSource, isLoading: false }, () => {
            // console.log('Price Update:', this.state.dataSource[index].market, this.state.dataSource[index].price);
          });
        })
          // fetch('https://api.upbit.com/v1/ticker?markets='+markets)
          // .then(response => response.json())
          // .then(responseJson => {
          //   let data = [];
          //   return new Promise((resolve, reject) => {
          //     responseJson.forEach(element => data.push({market: element.market, trade_price: element.trade_price}))
          //     resolve(data);
          //   });})

          .catch(error => {
            console.error(error);
          });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    // const { navigation } = this.props.navigation;
    // console.log('will render soon:', this.state.dataSource.length);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("KRW")}>
            <Text style={styles.moneyType}>KRW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("BTC")}>
            <Text style={styles.moneyType}>BTC</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ETH")}>
            <Text style={styles.moneyType}>ETH</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("USDT")}>
            <Text style={styles.moneyType}>USDT</Text>
          </TouchableOpacity>
        </View>

        <View >
          <FlatList
            data={this.state.dataSource}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Service")}>
                <View style={styles.flatview}>
                  <Text style={styles.market_list_view}>
                    종목 : {item.market}
                  </Text>
                  <Text style={styles.market_price_view}>
                    가격 : {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  moneyType: {
    marginTop: 5,
    marginBottom: 5
  },
  flatview: {
    justifyContent: 'center',
    borderRadius: 2,
  },
  market_list_view: {
    fontFamily: 'Verdana',
  },
  market_price_view: {
    color: 'red'
  }
});

export default HomeScreen;
