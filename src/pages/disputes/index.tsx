import React, { useEffect, useState } from "react";
import { Text, View } from "../../components/custom/Themed";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Pagelayout } from "../../components/layouts/page-layout";
import { Ionicons } from "@expo/vector-icons";
import { CardBox } from "../../components/custom/card";
import { Input } from "../../components/custom/Input";
import { colors } from "../../utils/colors";
import { useAppSelector, useAppThunkDispatch } from "../../redux/store";

import { getAllDisputes } from "../../redux/reducers/disputes/thunkAction";
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

export const Disputes = () => {
  const dispatch = useAppThunkDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<object>({});
  const route = useRoute();


  
  const { loading, allDisputes  } = useAppSelector(
    ({ disputesReducer }) => disputesReducer
  );
  useEffect(() => {
    dispatch(getAllDisputes(''));
  }, []);

  console.log(allDisputes)

  return (
    <Pagelayout page="Disputes">
      <View style={styles.container}>
        {/* {loading === "pending" && <Preloader />} */}
       
        <View>
          <View style={{ marginTop: 30 }}>
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
                data={allDisputes}
                renderItem={({ item }: any) => {
                 
                  return (
                    <CardBox
                      setSelected={() => null}
                      setShowModal={() => null}
                      data={{}}
                      name={item.value}
                      id={`${item.type}`}
                      key={item.id}
                      type='Disputes'
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
