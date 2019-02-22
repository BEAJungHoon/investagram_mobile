import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconTextInput from '../components/IconTextInput';
import RoundButton from '../components/RoundButton';
import IconText from '../components/IconText';

class PortfolioEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
      <IconText iconName={'ios-folder'} size={20}>
        포트폴리오 등록
      </IconText>
      ),
      // navigation.getParam('otherParam', 'A Nested Details Screen'),
      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 15 }}
          onPress={() => {
            navigation.goBack(null);
          }}
        >
          <Ionicons name={'ios-close'} size={44} color={'#aaa'} />
        </TouchableOpacity>
      )
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        behavior='padding'
        keyboardVerticalOffset={65}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',

            justifyContent: 'center'
          }}
        >
          <View style={styles.container}>
            <Text style={styles.container}>
              <Ionicons name={'ios-warning'}/>
              등록할 포트폴리오의 정보를 입력해주세요.
            </Text>
            
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-card'}
              placeholder={'이름'}
            />
             <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-call'}
              placeholder={'연락처'}
            />
            <IconTextInput
              style={{ marginTop: 10 }}
              iconName={'ios-book'}
              placeholder={'경력'}
            />
            <RoundButton
              iconName={'ios-add'}
              style={{ marginTop: 10 }}
              title={'등록하기'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center'
  }
});

export default PortfolioEditScreen;
