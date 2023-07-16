import { View, Text, StyleProp, TextStyle, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'

type props = {
    text:string
    textStyle:StyleProp<TextStyle>
    lineStyle:StyleProp<ViewStyle>
}

export default function LineText({text,textStyle,lineStyle}:props) {
  return (
    <View style={style.root}>
        <View style={lineStyle}></View>
        <Text style={textStyle}>{text}</Text>
        <View style={lineStyle}></View>
    </View>
  )
}

const style = StyleSheet.create({
    root:{
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'center', 
        marginVertical:10
    }
})