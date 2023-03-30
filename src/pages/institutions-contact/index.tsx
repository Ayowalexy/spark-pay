import React, { useEffect, useState } from "react";
import { Text, View } from "../../components/custom/Themed";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Pagelayout } from "../../components/layouts/page-layout";
import { Ionicons } from "@expo/vector-icons";
import { CardBox } from "../../components/custom/card";
import { Input } from "../../components/custom/Input";
import { colors } from "../../utils/colors";
import { useAppSelector, useAppThunkDispatch } from "../../redux/store";
import {
  getAllIntitutions,
  getInstitutionByContact,
} from "../../redux/reducers/transactions/thunkAction";
import { Button } from "../../components/custom/button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/stacks";
import { useRoute } from "@react-navigation/native";
import { ContactsModal } from "../../components/modals/contacts";
import { CreateContactsModal } from "../../components/modals/create-contact";

type ContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InstitutionsContact"
>;

export type props = {
  route: ContactScreenNavigationProp;
};

export const InstitutionsContact = () => {
  const dispatch = useAppThunkDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<object>({});
  const route = useRoute();

  const { loading, allInstitutionContact } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );

  useEffect(() => {
    dispatch(getInstitutionByContact(route.params?.code));
  }, [route.params?.code]);

  return (
    <Pagelayout page="Financial Institutions">
      <View style={styles.container}>
        {/* {loading === "pending" && <Preloader />} */}
        <ContactsModal
          data={selected}
          visible={showModal}
          setVisible={setShowModal}
        />
        <CreateContactsModal
          code={route.params?.code}
          visible={visible}
          setVisible={setVisible}
        />
        <View>
          <Text type="sm">{route.params?.name}</Text>
          <View style={{ marginTop: 30 }}>
            <View style={[styles.flex, { justifyContent: "space-between" }]}>
              <View style={styles.flex}>
                <Button onPress={() => setVisible(true)}>
                  Add new contact
                </Button>
              </View>
            </View>

            <View>
              <Input
                label=""
                hasRightIcon={true}
                RightIcon={
                  <Ionicons
                    name="search-outline"
                    color={colors.subText}
                    size={22}
                  />
                }
                onBlur={() => null}
                otherProps={{
                  placeholder: "Search",
                }}
                onChange={() => null}
              />
              <FlatList
                data={allInstitutionContact}
                renderItem={({ item }: any) => {
                  const data = {
                    "First name": item.firstname,
                    Surname: item.surname,
                    "Phone number": item.phone_number,
                    "Email address | disabled": item.email_address,
                    "Institution name | disabled": item.institutionName,
                    id: item.id,
                    code: route.params?.code,
                  };
                  return (
                    <CardBox
                      setSelected={setSelected}
                      setShowModal={setShowModal}
                      data={data}
                      name={item.firstname.concat(" ", item.surname)}
                      id={item.email_address}
                      key={item.id}
                    />
                  );
                }}
                keyExtractor={(item: any) => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    </Pagelayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
  },
});
