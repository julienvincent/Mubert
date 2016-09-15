import { createFactory, createElement } from 'react'
import ReactNative from 'react-native'

/**
 * HTML Elements
 */
export const View = createFactory(ReactNative.View)
export const Text = createFactory(ReactNative.Text)
export const ListView = createFactory(ReactNative.ListView)
export const ScrollView = createFactory(ReactNative.ScrollView)
export const TextInput = createFactory(ReactNative.TextInput)
export const Image = createFactory(ReactNative.Image)
export const AnimatedView = createFactory(ReactNative.Animated.View)
export const StatusBar = createFactory(ReactNative.StatusBar)
export const DatePickerIOS = createFactory(ReactNative.DatePickerIOS)

/**
 * Components
 */
export IconButton from './IconButton/IconButton'
export FloatingM from './FloatingM/FloatingM'