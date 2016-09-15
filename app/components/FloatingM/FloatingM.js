import { Component, createFactory, PropTypes } from 'react'
import { Animated, Text } from 'react-native'

const AnimatedText = createFactory(Animated.createAnimatedComponent(Text))

export default
createFactory(class FloatingM extends Component {

    constructor() {
        super()

        this.state = {}

        this.scale = new Animated.Value(1)
    }

    componentWillMount() {
        this.float(1.2)
    }

    float = toValue => {
        Animated.timing(this.scale, {
            toValue,
            duration: 3000
        }).start(() => {
            if (toValue == 1.2) {
                this.float(.8)
            } else {
                this.float(1.2)
            }
        })
    }

    render() {
        return (
            AnimatedText({
                style: {
                    fontFamily: "mubert",
                    fontSize: 100,
                    fontSize: 100,
                    color: "#FF1D58",
                    transform: [{scale: this.scale}]
                }
            }, "d")
        )
    }
})