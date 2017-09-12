/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { DeviceEventEmitter } from 'react-native';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeModules
} from 'react-native';

let ChromeCast = NativeModules.RNChromeCast;

import ChromeCastButton from 'react-native-chrome-cast-v3'

export default class ChromeCastTest extends Component {

  constructor(props){
    super(props)
      this.state = {
      connected: false,
          deviceConnected: false,
          devicesAvailable: false,
          deviceConnecting: false,
          sessionStatus: -1
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu{'\n'}

          Connected: {this.state.deviceConnected ? 'true' : 'false'} {'\n'}
          Available: {this.state.devicesAvailable ? 'true' : 'false'} {'\n'}
          Connecting: {this.state.deviceConnecting ? 'true' : 'false'} {'\n'}
          Connected: {this.state.sessionStatus} {'\n'}
        </Text>
        <ChromeCastButton style={{left: 200, width: 500, height: 500}}/>
      </View>
    );
  }


  componentWillMount(){
    DeviceEventEmitter.addListener("ChromeCastSessionEvent", (e) => {
        this.setState({sessionStatus: e.SESSION_STATUS})
        switch(e.SESSION_STATUS){

        }
    })

      DeviceEventEmitter.addListener("ChromeCastScanEvent", (e) => {
          let deviceConnected = e.DEVICE_CONNECTED;
          let deviceConnecting = e.DEVICE_CONNECTING;
          let devicesAvailable = e.DEVICES_AVAILABLE;

          this.setState({deviceConnected, devicesAvailable, deviceConnecting})

          if(deviceConnected){
          }

          if(devicesAvailable){
          }
          if(deviceConnecting){

          }
          })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ChromeCastTest', () => ChromeCastTest);
