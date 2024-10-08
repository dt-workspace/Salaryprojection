import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { useAppSelector } from "../store";
import RNBottomSheet from "react-native-raw-bottom-sheet";
import SimpleInput from "./FormInput/SimpleInput";

type ActionTextProps = {
  value: number;
  label: string;
  onChange: (value: number) => void;
  maxLength: number;
};

export default function ActionText({
  value,
  label,
  onChange,
  maxLength
}: Readonly<ActionTextProps>) {
  const { theme } = useAppSelector((state) => state.themeManager);
  const style = createStyles(theme);
  const ref = useRef(null);
  const [inputValue, setInputValue] = useState<string>(value.toString());

  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable onPress={() => ref.current?.open()}>
        <Text style={style.inputLabel}>{label}</Text>
        <Text style={style.inputLabelText}>{value}</Text>
      </Pressable>

      <RNBottomSheet height={300} ref={ref}>
        <View style={{ flex:1,justifyContent:"center",alignItems:"center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}>{label}</Text>
          <SimpleInput
            defaultValue={inputValue}
            customStyle={style.textInput}
            keyboardType="number-pad"
            placeholder="Enter Value"
            maxLength={maxLength}
            onChangeText={setInputValue}
            placeholderTextColor={theme.textColor}
          />
        </View>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: theme.primaryColor,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
            marginHorizontal: 20,
          }}
          onPress={() => {
            onChange(Number(inputValue));
            ref.current?.close();
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.textColor }}>Change</Text>
        </Pressable>
      </RNBottomSheet>
    </View>
  );
}

const createStyles = (theme: themeProps) =>
  StyleSheet.create({
    inputLabel: {
      textAlign: "left",
      fontSize: 24,
      fontWeight: "500",
      color: theme.onPrimaryColor,
      borderRadius: 10,
      paddingVertical: 5,
    },
    inputLabelText: {
      textAlign: "left",
      fontSize: 30,
      fontWeight: "800",
      color: theme.onPrimaryColor,
    },
    textInput: {
        marginTop:10,
      fontSize: 32,
      fontWeight: "bold",
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,
      textAlign: "center",
    },
  });
