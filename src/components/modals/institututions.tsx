import React, { ReactNode, useEffect, useState } from "react";
import { View, Text } from "../custom/Themed";
import { ModalLayout } from "../layouts/modal-layout";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Button } from "../custom/button";
import { Input } from "../custom/Input";
import { useAppThunkDispatch, useAppSelector } from "../../redux/store";
import {
  editInstistution,
  getAllIntitutions,
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

export const InstitutionsModal = ({ visible, setVisible, data }: props) => {
  const [values, setValues] = useState<any>({});
  const dispatch = useAppThunkDispatch();
  const naigation = useNavigation<any>();
  const { loading, isLoading } = useAppSelector(
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
    const data = {
      code: values.code,
      name: values.name,
      business_address: values["Business address"],
      created_by: values["created_by"],
    };

    await dispatch(editInstistution(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getAllIntitutions(""));
        setVisible(false);
      }
    });
  };

  const handleChangeStatus = async () => {
    const data = {
      code: values.code,
      email: "reecejames@gmail.com",
    };
    await dispatch(updateStatus(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
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
        {Object.keys(data).map((element) => (
          <>
            {element !== "status" && (
              <Input
                key={element}
                label={element}
                otherProps={{
                  value: values[element],
                }}
                onChange={(e) => handleChange(element, e)}
              />
            )}
          </>
        ))}
        <Input
          label={"Created by"}
          otherProps={{
            value: values["created_by"],
          }}
          onChange={(e) => handleChange("created_by", e)}
        />

        <Button
          onPress={() => {
            setVisible(false);
            naigation.navigate("InstitutionsContact", {
              name: values.Name,
              code: values.Code
            });
          }}
        >
          View contacts
        </Button>

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
              loading={isLoading}
              onPress={() => handleChangeStatus()}
              extrastyles={{
                backgroundColor: data.status === "1" ? "red" : "green",
              }}
            >
              {data.status === "1" ? "De-activate" : "Activate"}
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
