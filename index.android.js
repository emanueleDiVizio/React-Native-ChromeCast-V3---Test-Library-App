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
	Button,
	Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');


import {ChromeCastButton, ChromeCast, ChromeCastMiniController} from 'react-native-chrome-cast-v3'

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
				<View style={{flex: 1}}>
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
				</View>
				<View style={{flex: 1}}>
					<ChromeCastButton style={{width: 100, height: 100}}
									  onScanEventReceived={this.onScanEvent.bind(this)}
									  onSessionEventReceived={this.onSessionEvent.bind(this)}/>
				</View>
				<View style={{flex: 1}}>

					{(this.state.deviceConnected && !this.state.hasLoaded ) && <View>
						<Button title="Load vod" onPress={this.loadVod.bind(this)}/>
						<Button title="Load live" onPress={this.loadLive.bind(this)}/>
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
						<View style={{marginTop: 16}}>
							<Button title="Show CC Activity" onPress={this.onPressActivity.bind(this)}/>
						</View>
					</View>}
				</View>
				<View style={{flex: 1, justifyContent: 'flex-end'}}>
					<ChromeCastMiniController style={{width, height: 100}}/>
				</View>
			</View>
		);
	}

	loadLive() {
		ChromeCast.loadVideo({
			url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/hls/DesigningForGoogleCast.m3u8',
			title: 'LIVE',
			subtitle: 'IMG',
			image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
			duration: 330,
			isLive: true,
			autoplay: true,
			mimeType: "application/x-mpegURL",
			progress: 5000
		}).then((player) => {
			this.setState({hasLoaded: true, hasStarted: true, isPlaying: true})
			this.chromeCastPlayer = player
		}).catch((e) => console.log(e))
	}

	loadVod() {
		ChromeCast.loadVideo({
			url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/hls/DesigningForGoogleCast.m3u8',
			title: 'VOD',
			subtitle: 'IMG',
			image: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/',
			duration: 330,
			isLive: false,
			autoplay: true,
			mimeType: "application/x-mpegURL",
			progress: 5000
		}).then((player) => {
			this.setState({hasLoaded: true, hasStarted: true, isPlaying: true})
			this.chromeCastPlayer = player
		}).catch((e) => console.log(e))
	}

	onPressActivity() {
		ChromeCast.showChromeCastActivity();
	}

	onTogglePlaying() {
		this.state.isPlaying ?
			this.chromeCastPlayer.pause().then(() => this.setState({isPlaying: !this.state.isPlaying}))
			:
			this.chromeCastPlayer.play().then(() => this.setState({isPlaying: !this.state.isPlaying}))
	}

	onPressStop() {
		this.chromeCastPlayer.stop().then(() => this.setState({isPlaying: false, hasStarted: false, hasLoaded: false}))

	}

	onScanEvent(event) {
		this.setState({
			devicesAvailable: event.devicesAvailable,
			deviceConnecting: event.deviceConnecting,
			deviceConnected: event.deviceConnected
		})
	}

	onSessionEvent(event) {
		this.setState({sessionStatusCode: event.status, sessionStatusMessage: event.message})
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
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
