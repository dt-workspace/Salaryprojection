import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  SafeAreaView,
  useColorScheme
} from "react-native";

import SimpleInput from "../components/FormInput/SimpleInput";
import LineText from "../components/LineText";
import { FlashList } from "@shopify/flash-list";
import { themeFormatter } from "../utility/themeFormatter";
import { nextYearsSalary } from "../utility/salaryUtilities";
import SalaryItemComponent from "../components/SalaryItem";
import { useAppDispatch, useAppSelector } from "../store";
import ActionText from "../components/ActionText";
import {  toggleDarkMode, toggleLightMode } from "../store/manager/themeManager";

const { width, height } = Dimensions.get("window");

export default function LandingContainer() {
  const currentDate = new Date();
  const [salary, setSalary] = useState<number>(21000);
  const [hike, setHike] = useState<number>(34);
  const [expense, setExpense] = useState<number>(0);
  const [inflation, setInflation] = useState<number>(0);

  const { theme, isDarkMode } = useAppSelector((state) => state.themeManager);
  const dispatch = useAppDispatch();   
  
  const colorScheme = useColorScheme();

  useEffect(() => {
    if(colorScheme === "dark") {
      dispatch(toggleDarkMode())
    }else{
      dispatch(toggleLightMode())
    }
  }, [colorScheme]);

  const style = useMemo(() => {
    return { ...createStyle(theme), ...theme };
  }, [isDarkMode]);

  const { salaries } = nextYearsSalary({
    salary,
    hike,
    expense,
    inflation,
    currentDate,
  });

  return (
    <SafeAreaView style={style.root}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, backgroundColor: theme.primaryColor }}>
        <FlashList
          estimatedItemSize={17}
          showsVerticalScrollIndicator={false}
          data={salaries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SalaryItemComponent item={item} index={index} />
          )}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
        />
        
      </View>
    </SafeAreaView>
  );

  function FooterComponent() {
    return (
      <View style={{borderTopWidth: 1, borderTopColor: 'gray'}}>
        <View style={style.salaryInputContainer}>
          <ActionText value={expense} label="Expense" onChange={setExpense} maxLength={10} />
          <ActionText value={inflation} label="Inflation" onChange={setInflation} maxLength={2} />
        </View>
        <View style={{ height: 80 }}></View>
      </View>
    );
  }

  function HeaderComponent() {
    return (
      <View>
        <View style={style.salaryInputContainer}>
          <ActionText value={salary} label="Your Salary" onChange={setSalary} maxLength={10}/>
          <ActionText value={hike} label="Hike" onChange={setHike} maxLength={2}/>
        </View>
        <View style={{ height: 30 }}></View>
      </View>
    );
  }
}

const createStyle = (T: themeProps) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: T.backgroundColor,
    },
    centerBorder: {
      // borderWidth: 1,
      // borderColor: "rgba(51,51,51,.1)",
      // marginRight: 5,
      // width: "45%",
    },
    centerText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "600",
      marginVertical: 10,
      color: T.onBackgroundColor,
    },
    salaryInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      // backgroundColor: T.,
      borderRadius: 20,
      marginHorizontal: 20,
      paddingTop: 20,
    },
    inputBoxRight: {
      textAlign: "center",
      marginTop: 10,
      color: T.onPrimaryColor,
      fontWeight: "600",
      width: 100,
      borderBottomWidth: 1,
      borderBottomColor: T.onPrimaryColor,
      borderBottomRightRadius: 20,
    },
    inputBoxLeft: {
      textAlign: "center",
      marginTop: 10,
      color: T.onPrimaryColor,
      fontWeight: "600",
      width: 100,
      borderBottomWidth: 1,
      borderBottomColor: T.onPrimaryColor,
      borderBottomLeftRadius: 20,
    },
    inputBoxCenter: {
      textAlign: "center",
      marginTop: 10,
      color: T.onPrimaryColor,
      fontWeight: "600",
      width: 100,
      borderBottomWidth: 1,
      borderBottomColor: T.onPrimaryColor,
    },
    salaryResultContainer: {
      minHeight: height / 1.4,
    },
    inputLabel: {
      textAlign: "left",
      fontSize: 24,
      fontWeight: "500",
      color: T.onPrimaryColor,
      borderRadius: 10,
      paddingVertical: 5,
    },
    inputLabelText: {
      textAlign: "left",
      fontSize: 30,
      fontWeight: "800",
      color: T.onPrimaryColor,
    },
  });
