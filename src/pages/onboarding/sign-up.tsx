import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/custom/Themed";
import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { Input } from "../../components/custom/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "../../components/custom/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/stacks";
import { signIn } from "../../redux/reducers/auth/thunkAction";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type props = {
  navigation: OnboardingScreenNavigationProp;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = ({ navigation }: props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const { loading } = useAppSelector(({ authReducer }) => authReducer);
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: {
        password: "1234ASDf@",
        email: "michealakintola106.pog@gmail.com",
      },
      validationSchema,
      onSubmit: async (values) => {
        const form = {
          username: values.email,
          password: values.password,
        };
        await dispatch(signIn(form)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            navigation.navigate("Tabs");
          }
        });
      },
    });
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Welcome back</Text>
          <Text type="sm" style={styles.text}>
            Login into your account to continue
          </Text>

          <View style={styles.form}>
            <Input
              label="Email"
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              err={!!errors.email && touched.email}
              errMsg={errors.email}
              valid={!!errors.email && touched.email}
              hasLeftIcon={true}
              LeftIcon={
                <Ionicons
                  name="md-mail-outline"
                  color={colors.light.border}
                  size={22}
                />
              }
              otherProps={{
                placeholder: "Enter email",
              }}
            />
            <Input
              label="Password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              err={!!errors.password && touched.password}
              errMsg={errors.password}
              valid={!!errors.password && touched.password}
              hasLeftIcon={true}
              LeftIcon={
                <Ionicons
                  name="md-lock-closed-outline"
                  color={colors.light.border}
                  size={22}
                />
              }
              hasRightIcon={true}
              RightIcon={
                <TouchableOpacity onPress={() => setVisible(!visible)}>
                  <Ionicons
                    name={visible ? "eye-outline" : "eye-off-outline"}
                    color={colors.light.border}
                    size={22}
                  />
                </TouchableOpacity>
              }
              otherProps={{
                placeholder: "Enter password",
                secureTextEntry: visible,
              }}
            />
            <View>
              <TouchableOpacity>
                <Text style={styles.reset}>Reset password</Text>
              </TouchableOpacity>
            </View>
            <Button loading={loading} onPress={() => handleSubmit()}>
              Proceed
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.light.background,
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 30,
  },
  text: {
    paddingTop: 7,
    color: colors.primary,
  },
  form: {
    marginTop: 40,
  },
  reset: {
    color: colors.primary,
    marginBottom: 20,
    textAlign: "right",
  },
});
