import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PortfolioItem from '../components/PortfolioItem';

const mockData = [
  {
    name: '이더먹는정훈',
    manufacturer: '이더리움 관련',
    model: '이더리움',
    year: 2018,
    image:
      'https://pds.joins.com/news/component/htmlphoto_mmdata/201705/25/1b492670-de73-4492-9e5f-ad8a4ada1cb0.jpg',
      
  },
  {
    name: '황리플',
    manufacturer: '비트코인 떡상 예상',
    model: '비트코인',
    year: 2019,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvswWU4Fd9IfxeorN9NrQWfskAiH1Q_LAqlIQXUD7wmbJcGvR',
  },
  {
    name: '태빗',
    manufacturer: '어떻게하면 건강한 투자 생활을 할 수 있는가?',
    model: 'EOS',
    year: '2019',
    image:
      'http://cdn.emetro.co.kr/imagebank/2019/01/07/0540/20190107000227.jpg'
  }
];
class PortfolioListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableOpacity
          style={{ padding: 5, paddingRight: 15 }}
          onPress={() => {
            navigation.navigate('PortfolioEditStack');
          }}
        >
          <Ionicons name={'ios-add'} size={35} color={'white'} />
        </TouchableOpacity>
      ),
      title: 'ㅍㅌㅍㄹㅇ',
    };
  };

  refreshData = () => {};
  renderItem = ({ item }) => {
    return (
      <PortfolioItem
        {...item}
        onPress={() => {
          this.props.navigation.push('PortfolioDetail', {
            portfolio: item,
            title: item.model,
          });
        }}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <FlatList
          style={{ flexGrow: 1 }}
          data={mockData}
          renderItem={this.renderItem}
          onRefresh={this.refreshData}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => item.name}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                marginLeft: 20,
                width: '100%',
                backgroundColor: 'gray',
              }}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default PortfolioListScreen;
