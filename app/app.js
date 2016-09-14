// @flow
import { Component, createFactory, PropTypes } from 'react'
import { PanResponder } from 'react-native'
import { AudioManager } from 'NativeModules'
import { View, Text } from 'mubert/app/components'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import getMubertURL from './utils/getMubertURL'
import styles from './style'

const Icon = createFactory(MaterialIcon)

export default
class App extends Component {

    constructor() {
        super()

        this.state = {
            url: null,
            playing: false
        }

        this.PanHandlers = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this.touching,
            onPanResponderRelease: this.togglePlay
        })
    }

    touching = () => {

    }
    togglePlay = () => {
        const {playing, url} = this.state

        if (playing) {
            AudioManager.pause()
            this.setState({
                playing: false
            })
        } else {
            if (url) {
                AudioManager.resume()
                this.setState({
                    playing: true
                })
            } else {
                this.play()
            }
        }
    }

    play = () => {
        const url = getMubertURL()

        AudioManager.play(url)

        this.setState({
            url,
            playing: true
        })
    }

    render() {
        const {playing} = this.state

        const iconName = playing ? "pause-circle-outline" : "play-circle-outline"

        return (
            View({style: styles.container},
                View({style: styles.statusBar}),

                View({style: styles.content},
                    Icon({style: styles.icon, name: iconName, ...this.PanHandlers.panHandlers})
                )
            )
        )
    }
}