import React, { useEffect, useState } from "react";
import { Text, View } from "../../components/custom/Themed";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Pagelayout } from "../../components/layouts/page-layout";
import { optionProps, Select } from "../../components/custom/select";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { CardBox } from "../../components/custom/card";
import { Input } from "../../components/custom/Input";
import { colors } from "../../utils/colors";
import { FilterModal } from "./filter-modal";
import { useAppSelector, useAppThunkDispatch } from "../../redux/store";
import { getAllIntitutions } from "../../redux/reducers/transactions/thunkAction";
import { Preloader } from "../../components/custom/preloader";
import { useRange } from "../../hooks/useRange";
import { Button } from "../../components/custom/button";
import { CreateInstitionModal } from "../../components/modals/create-institution";
import { InstitutionsModal } from "../../components/modals/institututions";

export const Institutions = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showInstModal, setShowInstModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<object>({});
  const [selectedRange, setSelectedRange] = useState<optionProps>({
    value: "",
    label: "",
  });
  const range = useRange();
  const { loading, allInstitutions } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );

  useEffect(() => {
    dispatch(getAllIntitutions(""));
  }, []);

  return (
    <Pagelayout page="Financial Institutions">
      <View style={styles.container}>
        {/* {loading === "pending" && <Preloader />} */}
        <InstitutionsModal
          data={selected}
          visible={showModal}
          setVisible={setShowModal}
        />
        <CreateInstitionModal
          code={selected?.code}
          visible={showInstModal}
          setVisible={setShowInstModal}
        />
        <View>
          <Text type="sm">
            Total number of institution: <Text type="lg"> N0.00</Text>
          </Text>
          <View style={{ marginTop: 30 }}>
            <View style={[styles.flex, { justifyContent: "space-between" }]}>
              <View style={styles.flex}>
                <Button onPress={() => setShowInstModal(true)}>Create new</Button>
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
                data={allInstitutions}
                renderItem={({ item }: any) => {
                  const data = {
                    Name: item.name,
                    "Short name": item.shortName,
                    Code: item.code,
                    "Business address": item.business_address,
                    // "Date created": item.date_created,
                    "Business type name": item.businessTypeName,
                    status: item.status,
                  };
                  return (
                    <CardBox
                      setSelected={setSelected}
                      setShowModal={setShowModal}
                      data={data}
                      name={item.name}
                      id={item.port_number}
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
      <FilterModal visible={visible} setVisible={setVisible} />
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
