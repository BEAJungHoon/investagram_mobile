import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import dotEnv from 'react-native-dotenv';
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import PortfolioDetailScreen from "./screens/PortfolioDetailScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import PortfolioEditScreen from "./screens/PortfolioEditScreen";
import ServiceListScreen from "./screens/ServiceListScreen";
import AccountScreen from "./screens/AccountScreen";
import KRWScreen from "./screens/KRWScreen";
import BTCScreen from "./screens/BTCScreen";
import ETHScreen from "./screens/ETHScreen";
import USDTScreen from "./screens/USDTScreen";

import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";

const defaultNavigationOptions = {
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#5277f1"
  }
};

// class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Hello World!!</Text>
//       </View>
//     );
//   }
// }

const KRWStack = createStackNavigator(
  {
    KRW: KRWScreen
  },
  {
    defaultNavigationOptions
  }
);

const BTCStack = createStackNavigator(
  {
    BTC: BTCScreen
  },
  {
    defaultNavigationOptions
  }
);

const ETHStack = createStackNavigator(
  {
    ETH: ETHScreen
  },
  {
    defaultNavigationOptions
  }
);

const USDTStack = createStackNavigator(
  {
    USDT: USDTScreen
  },
  {
    defaultNavigationOptions
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    PortfolioDetail: PortfolioDetailScreen
  },
  {
    defaultNavigationOptions
  }
);

const ServiceStack = createStackNavigator(
  {
    Service: ServiceListScreen
  },
  {
    defaultNavigationOptions
  }
);

const SignUpStack = createStackNavigator(
  {
    SignUp: SignUpScreen
  },
  {
    defaultNavigationOptions
  }
);

const SignInStack = createStackNavigator(
  {
    SignIn: SignInScreen
  },
  {
    defaultNavigationOptions
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen
  },
  {
    defaultNavigationOptions
  }
);

const PortfolioStack = createStackNavigator(
  {
    Portfolio: PortfolioScreen,
    PortfolioDetail: PortfolioDetailScreen
  },
  {
    defaultNavigationOptions
  }
);

const PortfolioEditStack = createStackNavigator({
  PortfolioEdit: PortfolioEditScreen
});


const MainTab = createBottomTabNavigator(
  {
    Home: HomeStack,
    Portfolio: PortfolioStack,
    Service: ServiceStack,
    Account: AccountStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === "Home") {
          iconName = "ios-home";
        } else if (routeName === "Portfolio") {
          iconName = "ios-folder-open";
        } else if (routeName === "Service") {
          iconName = "ios-trending-up";
        } else if (routeName === "Account") {
          iconName = "ios-person";
        }

        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#5277f1",
      inactiveTintColor: "gray"
    }
  }
);

// const PortfolioEditStack = createStackNavigator({
//   PortfolioEdit: PortfolioEditScreen,
// });

// const ListinEditorStack = createStackNavigator({
//   ListingEditor: ListinEditorScreen,
// });

const RootStack = createStackNavigator(
  {
    SignInStack,
    Main: {
      screen: MainTab
    },
    SignUpStack,
    PortfolioEditStack,
    KRWStack,
    BTCStack,
    ETHStack,
    USDTStack,
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
