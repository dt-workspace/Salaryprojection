import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { formatSalary } from "../utility/salaryFormater";
import { useAppSelector } from "../store";

type SalaryItemProps = {
  item: caseFlow;
  index: number;
};

export default function SalaryItemComponent({ item, index }: Readonly<SalaryItemProps>) {
  const theme = useAppSelector((state) => state.themeManager.theme);

  const styles = createStyles(theme);

  return (
    <View style={{borderTopWidth: 1, borderTopColor: 'gray'}}>
      <Text style={styles.yearText}>{item.year}</Text>
      <Pressable key={index} style={styles.salaryItem}>
          <View>
            <Text style={styles.salaryText}>Monthly</Text>
            <Text style={styles.salarySubText}>₹{formatSalary(item.salary)}</Text>
          </View>
          <View>
            <Text style={styles.salaryText}>Daily</Text>
            <Text style={styles.salarySubText}>
              {formatSalary(Number((item.salary / 30).toFixed(2)))}
            </Text>
          </View>
        <View >
          <Text style={styles.salaryText}>Yearly</Text>
          <Text style={styles.salarySubText}>
            {formatSalary(item.yearly)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const createStyles = (theme: themeProps) =>
  StyleSheet.create({
    salaryItem: {
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      marginHorizontal: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "space-between",
      marginBottom: 25,
      marginTop: 20,
    },
    yearText: {
      color: theme.onPrimaryColor,
      fontSize: 24,
      fontWeight: "800",
      marginHorizontal: 25,
      marginTop: 15,
    },
    salaryRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    salaryText: {
      color: "#508D4E",
      fontSize: 14,
      fontWeight: "500",
      marginTop: 5,
    },
    salarySubText: {
      fontWeight: "700",
      color: theme.onPrimaryColor,
      fontSize: 18,
      marginTop: 5,
      marginBottom: 10,
    },
  });
