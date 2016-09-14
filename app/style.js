import { StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#23293d"
    },

    statusBar: {
        height: 20,
        width,
        backgroundColor: "#131724"
    },

    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    icon: {
        fontSize: 200,
        backgroundColor: "transparent",
        color: "white",
        opacity: .9
    }
})