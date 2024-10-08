import { View, Text, TextInput, StyleProp, TextStyle, KeyboardTypeOptions } from 'react-native'
import React from 'react'

type props = {
  defaultValue?:string
  customStyle:StyleProp<TextStyle>
  keyboardType?:KeyboardTypeOptions
  placeholder?:string
  maxLength?:number,
  onChangeText?:(text:string)=> void
  placeholderTextColor?:string
}

export default function SimpleInput({
  defaultValue,
  customStyle,
  keyboardType,
  placeholder,
  maxLength,
  onChangeText,
  placeholderTextColor
}:props) {
  return (
    <TextInput 
      defaultValue={defaultValue}
      style={customStyle}
      keyboardType={keyboardType}
      placeholder={placeholder}
      maxLength={maxLength}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      autoFocus={true}
    />
  )
}

