import React, { ReactNode, useEffect, useState } from "react";
import { View, Text } from "../custom/Themed";
import { ModalLayout } from "../layouts/modal-layout";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Button } from "../custom/button";
import { Input } from "../custom/Input";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import {
  createContact,
  getInstitutionByContact,
  getAllIntitutions
} from "../../redux/reducers/transactions/thunkAction";
import { getInstitutionTypes, createInstistution } from "../../redux/reducers/transactions/thunkActions_2";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/stacks";
import { Select } from "../custom/select";

type ContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InstitutionsContact"
>;

export type pageProps = {
  route: ContactScreenNavigationProp;
};

export type modalProps = {
  modal: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    code: string;
  };
  children: ReactNode;
};

type props = modalProps["modal"];

export const CreateInstitionModal = ({ visible, setVisible, code }: props) => {
  const [values, setValues] = useState<any>({});
  const dispatch = useAppThunkDispatch();
  const [options, setOptions] = useState([]);

  const { loading, InstitutionTypes } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );
  const { data } = useAppSelector(({ authReducer }) => authReducer);

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...values,
      role: `${data?.surname}.${data?.username}`,
    };

    console.log(payload)

    await dispatch(createInstistution(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getAllIntitutions(''));
        setVisible(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getInstitutionTypes(""));
  }, []);

  useEffect(() => {
    if (InstitutionTypes.length) {
      let data = [];
      for (let el of InstitutionTypes) {
        data.push({
          value: el.id,
          label: el.name,
        });
      }
      setOptions(data);
    }
  }, [InstitutionTypes]);

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      title="Create instistution"
    >
      <ScrollView
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Name"
          otherProps={{
            value: values.name,
          }}
          onChange={(e) => handleChange("name", e)}
        />
        <Input
          label="Business address"
          otherProps={{
            value: values.business_address,
          }}
          onChange={(e) => handleChange("business_address", e)}
        />
        <Input
          label="Code"
          otherProps={{
            value: values.code,
          }}
          onChange={(e) => handleChange("code", e)}
        />

        <Select
          label="Financial instution type"
          options={options}
          onChange={(e) => handleChange("businessType", e.value)}
        />

        <View>
          <View style={{ width: "100%" }}>
            <Button onPress={() => handleSubmit()} loading={loading}>
              Create
            </Button>
          </View>
        </View>
      </ScrollView>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
