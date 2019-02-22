import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import RoundButton from "../components/RoundButton";

class AccountScreen extends React.Component {
    render() {
        return (
            <View style={styles.accountscreen}>
                <Text>Account Screen</Text>
                <RoundButton
                    title="Logout"
                    onPress={() => this.props.navigation.navigate("Login")}>
                </RoundButton>
            </View>
            
        );
    }
}

const styles = StyleSheet.create (
    {
    accountscreen: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
}
);

export default AccountScreen;