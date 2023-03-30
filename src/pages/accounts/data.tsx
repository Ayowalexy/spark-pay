import { accountPages } from "../../utils/utils";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { DefaultTheme } from "@react-navigation/native";

export const data = {
  labels: ["0", "0.2", "0.4", "0.9", "0.8", "1"],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

export const account: accountPages[] = [
  {
    screen: "Transactions",
    icon: <Ionicons name="list-circle" color="#6A57F1" size={40} />,
    name: "Transactions",
    color: "#6A57F1",
  },
  {
    screen: "Institutions",
    icon: <FontAwesome name="bank" color="#55B79D" size={30} />,
    name: "Financial Institutions",
    color: "#6A57F1",
  },
  {
    screen: "Transactions",
    icon: <Ionicons name="shield-checkmark-sharp" color="#5A92FB" size={30} />,
    name: "Aprroval",
    color: "#6A57F1",
  },
  {
    screen: "Disputes",
    icon: <FontAwesome name="refresh" color="#53B6E5" size={30} />,
    name: "Disputes",
    color: "#6A57F1",
  },
  {
    screen: "Settlements",
    icon: <FontAwesome5 name="hands-helping" color="#5A92FB" size={30} />,
    name: "Settlments",
    color: "#6A57F1",
  },
];

export const chartConfig = {
  backgroundColor: DefaultTheme.colors.background,
  backgroundGradientFrom: "#424e95",
  backgroundGradientTo: "#697096",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export const getIcons = (name: string) => {
  const data = account.find((ele) => ele.name.toLowerCase() === name.toLowerCase()) || account[0]
  return data;
};
