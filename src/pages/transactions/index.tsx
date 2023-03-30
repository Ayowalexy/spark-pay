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
import {
  getAllTransactions,
  getTransactionRange,
} from "../../redux/reducers/transactions/thunkAction";
import { Preloader } from "../../components/custom/preloader";
import { TransactionsModal } from "../../components/modals/transactions-modal";
import { useRange } from "../../hooks/useRange";

export const Transactions = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<object>({});
  const [selectedRange, setSelectedRange] = useState<optionProps>({
    value: "",
    label: "",
  });
  const range = useRange();
  const { loading, allTransactions } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );

  useEffect(() => {
    // dispatch(getAllTransactions(""));
  }, []);

  useEffect(() => {
    if (selectedRange.value && selectedRange.label) {
      const data = {
        ...JSON.parse(selectedRange.value),
        page: 1,
        limit: 1000,
        isCurrent: false,
      };
      // dispatch(getTransactionRange(data));
    }
  }, [selectedRange]);

  return (
    <Pagelayout page="Transactions">
      <View style={styles.container}>
        {/* {loading === "pending" && <Preloader />} */}
        <TransactionsModal
          data={selected}
          visible={showModal}
          setVisible={setShowModal}
        />
        <View>
          <Text type="sm">
            Total number of transactions: <Text type="lg"> N0.00</Text>
          </Text>
          <Text type="sm" style={{ paddingTop: 5 }}>
            Total value of transactions: <Text type="lg"> N0.00</Text>
          </Text>

          <View style={{ marginTop: 30 }}>
            <Select
              label="Change page"
              options={range}
              onChange={(e) => setSelectedRange(e)}
            />

            <View style={[styles.flex, { justifyContent: "space-between" }]}>
              <View style={styles.flex}>
                <Text>Download{"  "}</Text>
                <Ionicons name="download" size={25} color="#000" />
              </View>
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.flex}
              >
                <Text>Filter{"  "}</Text>
                <Ionicons name="ios-filter-sharp" size={25} color="#000" />
              </TouchableOpacity>
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
                data={allTransactions}
                renderItem={({ item }: any) => (
                  <CardBox
                    setSelected={setSelected}
                    setShowModal={setShowModal}
                    data={item}
                    name={item.srcAccountName}
                    id={item.srcAccountNumber}
                    key={item.id}
                  />
                )}
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
  },
});
