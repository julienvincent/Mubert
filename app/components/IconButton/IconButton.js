import { Component, createFactory, PropTypes } from 'react'
import { PanResponder, Animated } from 'react-native'
import { AnimatedView } from '../index'

export default
createFactory(class IconButton extends Component {

    constructor() {
        super()

        this.PanHandlers = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this.highlight,
            onPanResponderRelease: this.onPress,
            onPanResponderMove: this.handleMove
        })

        this.scale = new Animated.Value(1)

        this.width = 0
        this.height = 0
    }

    highlight = () => {
        this.shouldClick = true
        Animated.spring(this.scale, {
            toValue: .85
        }).start()
    }
    unHighlight = () => {
        this.shouldClick = false
        Animated.spring(this.scale, {
            toValue: 1
        }).start()
    }
    handleMove = (_, {dx, dy}) => {
        const r = d => d < 0 ? d * -1 : d

        if (this.shouldClick) {
            if (r(dx) > this.width) {
                this.unHighlight()
            } else if (r(dy) > this.height) {
                this.unHighlight()
            }
        }
    }
    onPress = () => {
        if (this.shouldClick) {
            this.unHighlight()
            this.props.onPress()
        }
    }
    updateLayout = ({nativeEvent: {layout: {width, height}}}) => {
        this.width = width
        this.height = height
    }

    render() {
        const {children, style} = this.props

        return (
            AnimatedView({
                ...this.PanHandlers.panHandlers,
                onLayout: this.updateLayout,
                hitSlop: {left: 10, right: 10, top: 10, bottom: 10},
                style: [style, {
                    transform: [
                        {scale: this.scale}
                    ]
                }]
            },
                children
            )
        )
    }
})