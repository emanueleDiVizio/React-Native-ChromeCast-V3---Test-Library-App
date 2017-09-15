/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Button
} from 'react-native';


import {ChromeCastButton, ChromeCast} from 'react-native-chrome-cast-v3'

export default class ChromeCastTest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            connected: false,
            deviceConnected: false,
            devicesAvailable: false,
            deviceConnecting: false,
            sessionStatusCode: -1,
            sessionStatusMessage: 'nil',
            hasLoaded: false,
            isPlaying: false,
            hasStarted: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Chrome cast testing!
                </Text>
                <Text style={styles.instructions}>
                    Connect by tapping the cast button.
                </Text>
                <Text style={styles.instructions}>
                    Connected: {this.state.deviceConnected ? 'true' : 'false'} {'\n'}
                    Available: {this.state.devicesAvailable ? 'true' : 'false'} {'\n'}
                    Connecting: {this.state.deviceConnecting ? 'true' : 'false'} {'\n'}
                    Session status: {this.state.sessionStatusCode} - {this.state.sessionStatusMessage}{'\n'}
                </Text>
                <ChromeCastButton style={{width: 100, height: 100}}/>
                <View>
                    {(this.state.deviceConnected && !this.state.hasLoaded ) && <View>
                        <Button title="Load video!" onPress={this.onPressLoad.bind(this)}/>
                    </View>}
                    {this.state.hasStarted &&
                    <View>
                        <View style={{marginTop: 16}}>
                            <Button title={this.state.isPlaying ? 'Pause' : 'Play'}
                                    onPress={this.onTogglePlaying.bind(this)}/>
                        </View>
                        <View style={{marginTop: 16}}>
                            <Button title="Stop" onPress={this.onPressStop.bind(this)}/>
                        </View>
                    </View>}
                </View>
            </View>
        );
    }

    onPressLoad() {
        ChromeCast.loadVideo({
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/hls/DesigningForGoogleCast.m3u8',
            title: 'KITTENS!',
            subtitle: 'RAMPAGE!',
            image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
            duration: 330,
            isLive: false,
            autoplay: true,
            mimeType: "application/x-mpegurl"
        }, (result) => {
            if (result.isSuccess) {
                this.setState({hasLoaded: true, hasStarted: true, isPlaying: true})
                this.chromeCastPlayer = result.player
            }
            else {
                console.log(result.error)
            }
        })
    }

    onTogglePlaying() {
        this.state.isPlaying ?
            this.chromeCastPlayer.pause((result) => result.isSuccess ?
                this.setState({isPlaying: !this.state.isPlaying}) : '')
            :
            this.chromeCastPlayer.play((result) => result.isSuccess ?
                this.setState({isPlaying: !this.state.isPlaying}) : '')


    }

    onPressStop() {
        this.chromeCastPlayer.stop((result) => result.isSuccess ?
            this.setState({isPlaying: false, hasStarted: false, hasLoaded: false}) : '')

    }


    componentWillMount() {

        ChromeCast.listenForScanEvent((event) => {
            this.setState({
                devicesAvailable: event.devicesAvailable,
                deviceConnecting: event.deviceConnecting,
                deviceConnected: event.deviceConnected
            })

        })

        ChromeCast.listenForSessionEvents(event => {
                this.setState({sessionStatusCode: event.status, sessionStatusMessage: event.message})
            }
        )

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
