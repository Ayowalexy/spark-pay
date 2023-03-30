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
  getInstitutionByContact
} from "../../redux/reducers/transactions/thunkAction";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/stacks";

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

export const CreateContactsModal = ({ visible, setVisible, code }: props) => {
  const [values, setValues] = useState<any>({});
  const dispatch = useAppThunkDispatch();


  const { loading, } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );
  const { data } = useAppSelector(
    ({ authReducer }) => authReducer
  )

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit =async () => {
    const payload = {
      ...values,
      role: `${data?.surname}.${data?.username}`,
      institution: code
    }
    console.log('payload', payload)

    await dispatch(createContact(payload)).then(res => {
      if(res.meta.requestStatus === 'fulfilled'){
        dispatch(getInstitutionByContact(code))
        setVisible(false)
      }
    })
  }


  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      title="Create contact"
    >
      <ScrollView
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Surname"
          otherProps={{
            value: values.surname,
          }}
          onChange={(e) => handleChange("surname", e)}
        />
        <Input
          label="First name"
          otherProps={{
            value: values.firstname,
          }}
          onChange={(e) => handleChange("firstname", e)}
        />
        <Input
          label="Email"
          otherProps={{
            value: values.email_address,
          }}
          onChange={(e) => handleChange("email_address", e)}
        />
        <Input
          label="Phone number"
          otherProps={{
            value: values.phone_number,
          }}
          onChange={(e) => handleChange("phone_number", e)}
        />

        <View>
          <View style={{ width: "100%" }}>
            <Button
              onPress={() => handleSubmit()}
              loading={loading}
            >
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
