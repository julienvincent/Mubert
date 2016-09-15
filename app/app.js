// @flow
import { Component, createFactory, PropTypes } from 'react'
import { PanResponder, Dimensions } from 'react-native'
import { AudioManager } from 'NativeModules'
import { View, Text, IconButton, FloatingM } from 'mubert/app/components'
import { ifElse } from './utils/index'
import { createIconSet } from 'react-native-vector-icons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import getMubertURL, { getGenres } from './utils/getMubertURL'
import _ from 'lodash'
import styles from './style'

const {width} = Dimensions.get('window')
const Icon = createFactory(MaterialIcon)
const genres = getGenres()
export const glyphMap = {
    play: "",
    mubert: ""
}
const IcomoonIcon = createFactory(createIconSet(glyphMap, "icomoon", "Icomoon.ttf"))

export default
class App extends Component {

    constructor() {
        super()

        this.state = {
            url: null,
            playing: false,
            selected: 600
        }
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

    play = (beat = this.state.selected) => {
        const url = getMubertURL(beat)

        AudioManager.play(url)

        this.setState({
            selected: beat,
            url,
            playing: true
        })
    }

    render() {
        const {playing, selected} = this.state

        const isPlaying = ifElse(playing)

        return (
            View({style: styles.container},
                View({style: styles.statusBar}),

                View({style: styles.header},
                    IcomoonIcon({name: "mubert", style: styles.headerIcon}),
                    IconButton({onPress: this.play},
                        Icon({name: "refresh", style: styles.controlIcon})
                    )
                ),

                View({style: styles.content},
                    isPlaying(
                        FloatingM(),
                        IconButton({onPress: this.togglePlay},
                            IcomoonIcon({style: styles.icon, name: "play"})
                        )
                    )
                ),

                View({style: styles.controls},
                    isPlaying(
                        IconButton({onPress: this.togglePlay},
                            Icon({
                                name: "pause",
                                style: styles.controlIcon
                            })
                        )
                    )
                ),

                View({style: styles.genres},
                    _.map(genres, ({name, icon, beat}, key) => (
                            IconButton({
                                    onPress: () => this.play(beat),
                                    style: [styles.genre, {width: width / genres.length}],
                                    key
                                },
                                Text({style: [styles.genreIcon, beat == selected ? styles.selectedGenre : {}]}, icon),
                                Text({style: styles.genreText}, name)
                            )
                        )
                    )
                )
            )
        )
    }
}