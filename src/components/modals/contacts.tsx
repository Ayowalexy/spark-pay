import React, { ReactNode, useEffect, useState } from "react";
import { View, Text } from "../custom/Themed";
import { ModalLayout } from "../layouts/modal-layout";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Button } from "../custom/button";
import { Input } from "../custom/Input";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import {
  deleteContact,
  editContact,
  getInstitutionByContact,
  updateStatus,
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
    data: any;
  };
  children: ReactNode;
};

type props = modalProps["modal"];

export const ContactsModal = ({ visible, setVisible, data }: props) => {
  const [values, setValues] = useState<any>({
    username: ""
  });
  const dispatch = useAppThunkDispatch();
  const naigation = useNavigation<any>();
  const { loading, isLoading, isDeleting } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setValues(data);
  }, [data]);

  const handleEdit = async () => {
    const ele = {
      username: 'admin',
      firstname: values['First name'],
      surname: values['Surname'],
      phone_number: values['Phone number'],
      id: data.id,
    };

    await dispatch(editContact(ele)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getInstitutionByContact(data.code));
        setVisible(false);
      }
    });
  };


  const handleDelete = async () => {
    const ele = {
      id: data.id,
      email: data['Email address | disabled']
    };

    await dispatch(deleteContact(ele)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getInstitutionByContact(data.code));
        setVisible(false);
      }
    });
  };
  

  return (
    <ModalLayout visible={visible} setVisible={setVisible} title="More details">
      <ScrollView
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(data).map((element) => {
          const name = element.split("|");
          return (
            <>
              {element !== "id" && element !== "code" && (
                <Input
                  key={element}
                  label={name[0]}
                  otherProps={{
                    value: values[element],
                    editable: name.length < 2,
                  }}
                  onChange={(e) => handleChange(element, e)}
                />
              )}
            </>
          );
        })}
        <Input
          label="Username"
          otherProps={{
            value: values.username,
          }}
          onChange={(e) => handleChange("username", e)}
        />

        <View style={styles.footer}>
          <View style={{ width: "47%" }}>
            <Button
              onPress={() => handleEdit()}
              loading={loading}
              extrastyles={{ backgroundColor: "blue" }}
            >
              Edit
            </Button>
          </View>
          <View style={{ width: "47%" }}>
            <Button
              loading={isDeleting}
              onPress={() => handleDelete()}
              extrastyles={{
                backgroundColor: "red",
              }}
            >
              Delete
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
