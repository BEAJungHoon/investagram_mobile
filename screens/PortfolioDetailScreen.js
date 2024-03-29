import React, { Component } from "react";
import {
  SectionList,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";
import IconText from "../components/IconText";
import { Ionicons } from "@expo/vector-icons";
import RoundButton from "../components/RoundButton";
import moment from "moment";

class VehicleDetailScreen extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    const vehicle = this.props.navigation.getParam("portfolio");
    this.state = {
      vehicle,
      refreshing: false,
      offers:
        vehicle.year % 2 === 0
          ? [
              // {
              //   $class: "org.example.mynetwork.Offer",
              //   bidPrice: 3500,
              //   listing:
              //     "resource:org.example.mynetwork.VehicleListing#listingId:ABCD",
              //   member:
              //     "resource:org.example.mynetwork.Member#memberB@acme.org",
              //   transactionId:
              //     "acc535a33d102b15e31e1f0468bdba22490c49c36380bd7efd4d273932d23c0b",
              //   timestamp: "2018-12-03T06:28:39.510Z"
              // },
              
            ]
          : []
    };
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: params.title
    };
  };
  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          paddingLeft: 15
        }}
      >
        <Text style={{ fontSize: 18, color: "#333" }}> $ {item.bidPrice} </Text>
        <View style={{ flexDirection: "column", marginRight: 5 }}>
          <Text style={{ fontSize: 13, color: "#aaa" }}>
            {`by ${item.member.split("#")[1].split("@")[0]}`}
          </Text>
          <Text style={{ fontSize: 13, color: "#aaa" }}>
            {moment(item.timestamp).fromNow()}
          </Text>
        </View>
      </View>
    );
  };
  renderSectionHeader = ({ section: { title, data } }) => {
    if (title === "info") {
      return (
        <View style={{ flexDirection: "column" }}>
          <ScrollView
            pagingEnabled={true}
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Image
              source={{ uri: this.state.vehicle.image }}
              style={{
                width: "100%",
                height: 150,
                resizeMode: "cover"
              }}
            />
          </ScrollView>
          <View style={{ flexGrow: 1, paddingLeft: 10 }}>
            <View
              style={{
                position: "absolute",
                height: "70%",
                width: StyleSheet.hairlineWidth,
                left: "50%",
                top: "15%",
                backgroundColor: "#aaa"
              }}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <IconText iconName={"ios-folder"}>
                {this.state.vehicle.vin}
              </IconText>
              <IconText iconName={"ios-star"}>
                {this.state.vehicle.manufacturer}
              </IconText>
              <IconText iconName={"ios-paper"}>
                {this.state.vehicle.model}
              </IconText>
              <IconText iconName={"ios-calendar"}>
                {this.state.vehicle.year}
              </IconText>
            </View>
          </View>
        </View>
      );
    } else if (title === "listing") {
      if (this.state.isForSale) {
        return (
          <View
            style={{
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              marginTop: 30
            }}
          >
            <Text style={{ color: "tomato" }}>
              {this.state.isForSale ? "투자자 기다리는중" : ""}
            </Text>
          </View>
        );
      } else {
        return (
          <View
            style={{
              marginTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#333" }}>이 포트폴리오를 등록하기</Text>
            <RoundButton
              style={{ marginTop: 10 }}
              onPress={() => {
                this.props.navigation.navigate("ListingEditor");
              }}
            />
          </View>
        );
      }
    }
  };
  refreshData = () => {
    this.setState({
      refreshing: true
    });
    fetch("http://localhost:3000/api/Offer")
      .then(r => r.json())
      .then(result => {
        console.log(result);
        this.setState({
          vehicleListing: result,
          refreshing: false
        });
      });
  };
  render() {
    return (
      <SectionList
        onRefresh={this.refreshData}
        refreshing={this.state.refreshing}
        sections={[
          {
            title: "info",
            data: []
          },
          {
            title: "listing",
            data: this.state.offers
          }
        ]}
        keyExtractor={item => item.transactionId}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={({ highlighted }) => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              marginLeft: 20,
              width: "100%",
              backgroundColor: "gray"
            }}
          />
        )}
      />
    );
  }
}

// const styles = StyleSheet.create({});

export default VehicleDetailScreen;
