import { AsyncStorage } from 'react-native';
const key = 'token';
const DeviceStorage = {
    async setJwt(value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsyncStorage.setJwt() Error: ' + error.message);
        }
    },

    async getJwt() {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                this.setState({
                    jwt: value,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
            console.log('AsyncStorage.getJwt() Error: ' + error.message);
        }
    },

    async deleteJWT() {
        try {
            await AsyncStorage.removeItem(key)
                .then(
                    () => {
                        this.setState({
                            jwt: ''
                        })
                    }
                );
        } catch (error) {
            console.log('AsyncStorage.deleteJwt() Error: ' + error.message);
        }
    }
};

export default {
    DeviceStorage,
    AsyncStorage
};