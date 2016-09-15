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

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    headerIcon: {
        color: "#FF1D58",
        fontSize: 20
    },

    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        fontSize: 100,
        backgroundColor: "transparent",
        color: "#FF1D58",
        opacity: .9
    },

    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        height: 20
    },
    controlIcon: {
        color: "white",
        opacity: .6,
        fontSize: 25,
        marginLeft: 5
    },

    genres: {
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        height: 50,
        borderTopWidth: .5,
        borderTopColor: "#2D344D"
    },
    genre: {
        alignItems: "center",
        justifyContent: "center"
    },
    genreIcon: {
        fontFamily: "mubert_alchemy",
        color: "white",
        opacity: .6,
        fontSize: 18
    },
    selectedGenre: {
        opacity: 1,
    },
    genreText: {
        fontSize: 8,
        color: "white",
        opacity: .5,
        marginTop: 5
    }
})