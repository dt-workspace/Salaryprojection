import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Switch,
} from "react-native";

import { formatSalary } from "./src/utility/salaryFormater";
import SimpleInput from "./src/components/FormInput/SimpleInput";
import LineText from "./src/components/LineText";
import { FlashList } from "@shopify/flash-list";

const { width, height } = Dimensions.get("window");

type themeProps = {
  primaryColor: string;
  onPrimaryColor: string;
  backgroundColor: string;
  onBackgroundColor: string;
  textColor: string;
};

type caseFlow = {
  salary: number;
  isTarget: boolean;
  isOnTime: boolean;
  year: number;
  yearly: number;
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const style = useMemo(() => {
    let theme = {
      primaryColor: isDarkMode ? "#023047" : "#D1F0D2",
      onPrimaryColor: isDarkMode ? "white" : "green",
      backgroundColor: isDarkMode
        ? "rgba(2, 48, 71, .5)"
        : "rgba(243,243,243,1)",
      onBackgroundColor: isDarkMode ? "white" : "green",
      textColor: isDarkMode ? "white" : "black",
    };
    return { ...createStyle(theme), ...theme };
  }, [isDarkMode]);

  const [salary, setSalary] = useState<number>(22000);
  const [hike, setHike] = useState<number>(36);
  const [targetYear, setTargetYear] = useState<number>(17);
  const currentDate = new Date();
  const [expense, setExpense] = useState<number>(2000);
  const [inflation, setInflation] = useState<number>(6);
  const [OutflowEnabled, setOutflowEnabled] = useState<boolean>(false);

  let Salary = useCallback(() => {
    let list = [] as caseFlow[];
    let a = (hike + 100) / 100;
    for (let i = 1; i <= targetYear; i++) {
      let newSalary = (salary * Math.pow(a, i)).toFixed();
      list.push({
        salary: parseInt(newSalary),
        isTarget: false,
        isOnTime: false,
        year: currentDate.getFullYear() + i,
        yearly: parseInt(newSalary) * 12,
      });
    }

    let nextThresholds = [
      1000000, 10000000, 100000000, 1000000000, 10000000000,
    ];
    let nextThresholdYears = [2040, 2060, 2080, 2100, 2120];

    for (const [index, threshold] of nextThresholds.entries()) {
      let nextThreshold = list.findIndex((item) => item.salary > threshold);
      if (nextThreshold != -1) {
        list[nextThreshold] = {
          ...list[nextThreshold],
          isTarget: true,
          isOnTime: list[nextThreshold].year <= nextThresholdYears[index],
        };
      }
    }

    let outflow = list.map((out, iout) => {
      let yearly =
        out.yearly -
        (expense * 12 + ((expense * 12 * inflation) / 100) * (iout + 1));
      let monthly =
        out.salary - (expense + ((expense * inflation) / 100) * (iout + 1));
      
      return {
        ...out,
        salary: monthly,
        yearly: yearly,
      };
    });

    return {
      salaries: OutflowEnabled ? outflow : list,
    };
  }, [hike, salary, targetYear, expense, inflation, OutflowEnabled]);

  let { salaries } = Salary();

  const FooterComponent = useCallback(() => {
    return (
      <View>
        <LineText
          text={"Cash Out-Flow"}
          textStyle={style.centerText}
          lineStyle={style.centerBorder}
        />
        <View style={{ alignItems: "center",marginBottom:10 }}>
          <Switch
            trackColor={{ false: 'rgba(243,243,243,.2)', true: "#f4f3f4"}}
            thumbColor={OutflowEnabled ? 'green' : "#f4f3f4"}
            onValueChange={() => {
              setOutflowEnabled(!OutflowEnabled);
            }}
            value={OutflowEnabled}
            
          />
        </View>

        <View style={[style.salaryInputContainer,{elevation:4}]}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.inputLabel}>Expense</Text>
            <SimpleInput
              defaultValue={expense.toString()}
              customStyle={style.inputBoxLeft}
              keyboardType="number-pad"
              placeholder="2000"
              maxLength={10}
              placeholderTextColor={"gray"}
              onChangeText={(text) =>
                setExpense(text.length > 0 ? parseInt(text) : 0)
              }
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={style.inputLabel}>Inflation</Text>

            <SimpleInput
              defaultValue={inflation.toString()}
              customStyle={[style.inputBoxCenter]}
              keyboardType="number-pad"
              placeholder="7"
              placeholderTextColor={"gray"}
              maxLength={3}
              onChangeText={(text) =>
                setInflation(text.length > 0 ? parseInt(text) : 0)
              }
            />
          </View>
        </View>
        <View style={{ height: 50 }}></View>
      </View>
    );
  }, [OutflowEnabled]);

  const HeaderComponent = useCallback(() => {
    return (
      <View>
        <LineText
          text={"Cash In-flow"}
          textStyle={style.centerText}
          lineStyle={style.centerBorder}
        />

        <View style={style.salaryInputContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.inputLabel}>Next</Text>
            <SimpleInput
              defaultValue={targetYear.toString()}
              customStyle={style.inputBoxLeft}
              keyboardType="number-pad"
              placeholder="40"
              maxLength={2}
              placeholderTextColor={"gray"}
              onChangeText={(text) =>
                setTargetYear(text.length > 0 ? parseInt(text) : 0)
              }
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={style.inputLabel}>Current</Text>

            <SimpleInput
              defaultValue={salary.toString()}
              customStyle={[style.inputBoxCenter]}
              keyboardType="number-pad"
              placeholder="Enter Salary"
              placeholderTextColor={"gray"}
              maxLength={10}
              onChangeText={(text) =>
                setSalary(text.length > 0 ? parseInt(text) : 0)
              }
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={style.inputLabel}>Hike</Text>

            <SimpleInput
              defaultValue={hike.toString()}
              customStyle={style.inputBoxRight}
              keyboardType="number-pad"
              placeholder="Enter Hike"
              placeholderTextColor={"gray"}
              maxLength={3}
              onChangeText={(text) =>
                setHike(text.length > 0 ? parseInt(text) : 0)
              }
            />
          </View>
        </View>
        <View style={{height:30}}></View>
      </View>
    );
  }, [style]);

  const SalaryItemComponent = useCallback(({ item, index }:{item:caseFlow,index:number}) => {
    return (
      <Pressable
        key={index}
        style={[
          style.salaryItem,
          {
            shadowColor: style.onBackgroundColor,
            backgroundColor: item.isTarget
              ? item.isOnTime
                ? "green"
                : "red"
              : style.primaryColor,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: item.isTarget ? "white" : style.textColor }}>
            {item.year}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              color: item.isTarget ? "white" : style.textColor,
            }}
          >
            ₹ {formatSalary(item.salary)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item.isTarget && (
            <Text style={{ color: "white", fontWeight: "500" }}>
              {item.isOnTime ? "Success" : "Failure"}
            </Text>
          )}
          <Text
            style={{
              color: item.isTarget ? "white" : style.textColor,
              fontWeight: "600",
              marginLeft: 10,
            }}
          >
            ₹ {formatSalary(item.yearly)}
          </Text>
        </View>
      </Pressable>
    );
  }, [style]);

  return (
    <View style={style.root}>
      <StatusBar hidden={true} />
      <FlashList
        estimatedItemSize={17}
        contentContainerStyle={style.salaryResultContainer}
        showsVerticalScrollIndicator={false}
        data={salaries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={SalaryItemComponent}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FooterComponent}
      />
    </View>
  );
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
      backgroundColor: T.primaryColor,
      borderRadius: 20,
      marginHorizontal: 10,
      paddingTop: 20,
      elevation: 20,
      shadowColor: "green",
    },
    inputLabel: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "600",
      color: T.onPrimaryColor,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
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
      backgroundColor: T.primaryColor,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      // paddingVertical: 40,
      paddingHorizontal: 20,
      minHeight: height / 1.4,
    },
    salaryItem: {
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      elevation: 3,
      marginVertical: 10,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "space-between",
    },
  });

export default App;
