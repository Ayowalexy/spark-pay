import React from "react";
import { Text, View } from "../../components/custom/Themed";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../utils/colors";
import { DefaultTheme } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { data, account, chartConfig, getIcons } from "./data";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/stacks";
import { useAppSelector } from "../../redux/store";
import { accountPages, transgateMenuTypes } from "../../utils/utils";

type TransactionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Transactions"
>;

export type props = {
  navigation: TransactionScreenNavigationProp;
};

const screenWidth = Dimensions.get("window").width;

export const Account = ({ navigation }: props) => {
  const { transgateMenu } = useAppSelector(({ authReducer }) => authReducer)

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text type="lg" style={styles.header}>
            Statistics
          </Text>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.card_text}>Institusion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text>Date</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <LineChart
              data={data}
              width={screenWidth}
              height={200}
              withHorizontalLabels={false}
              chartConfig={chartConfig}
              bezier
            />
          </View>
          <Text type="lg" style={[styles.header, { marginTop: 10 }]}>
            Actions
          </Text>
          <View style={styles.card_cnt}>
            {account.map((element: accountPages, idx) => {
              // const data = getIcons(element.label)
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(element.screen)}
                  key={idx}
                  style={styles.card_}
                >
                  {element.icon}
                  <Text style={{ fontSize: 11 }}>{element.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: DefaultTheme.colors.background,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.light.background,
    padding: 7,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: DefaultTheme.colors.background,
    height: 50,
    borderRadius: 10,
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
  },
  card_text: {
    fontFamily: "PoppinsMedium",
  },
  card: {
    width: "33%",
    height: 130,
    borderRadius: 10,
    backgroundColor: colors.light.background,
    padding: 7,
    alignItems: "center",
  },
  card_cnt: {
    width: "100%",
    backgroundColor: DefaultTheme.colors.background,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  icon_box: {
    width: "100%",
    height: 70,
    backgroundColor: DefaultTheme.colors.background,

    borderRadius: 7,
  },
  t_text: {
    fontSize: 13,
    paddingTop: 10,
  },
  card_: {
    backgroundColor: DefaultTheme.colors.background,
    alignItems: "center",
    marginRight: 10,
    justifyContent: "space-between",
    height: 70,
    // borderWidth: 1,
    width: 73,
    marginBottom: 30,
  },
});
