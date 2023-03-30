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
import { getAllIntitutions } from "../../redux/reducers/transactions/thunkAction";
import { Select } from "../../components/custom/select";

type ContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InstitutionsContact"
>;

export type props = {
  route: ContactScreenNavigationProp;
};

export const Settlements = () => {
  const dispatch = useAppThunkDispatch();
  const [options, setOptions] = useState([])

  
  const { loading, allDisputes  } = useAppSelector(
    ({ disputesReducer }) => disputesReducer
  );

  const { allInstitutions  } = useAppSelector(
    ({ transactionsReducer }) => transactionsReducer
  );
  useEffect(() => {
    dispatch(getAllIntitutions(''));
  }, []);

  useEffect(() => {
    if(allInstitutions.length){
      let data = [];
      for(let el of allInstitutions){
        data.push({
          value: el.code,
          label: el.name
        })
      }
      setOptions(data)
    }
  }, [allInstitutions])


  return (
    <Pagelayout page="Settlements">
      <View style={styles.container}>
        {/* {loading === "pending" && <Preloader />} */}
       
        <View>
          <View style={{ marginTop: 30 }}>
            <View>
              <Select label="Select institution" options={options} onChange={(e) => console.log(e)} />
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
