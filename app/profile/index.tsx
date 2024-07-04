import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { COLORS } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import CustomHeaderLayout from "../../components/common/customHeaderLayout/customHeaderLayout";
import Section from "../../components/common/section/Section";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "../../components/common/buttons/actionButton/actionButton";

const Profile = () => {
  const router = useRouter();

  const { name } = useAppSelector((state) => state.profile);

  const data = [
    {
      column1: "Name",
      column2: (
        <Text
          numberOfLines={1}
          style={[
            styles.cell,
            { textAlign: "right", textTransform: "capitalize" },
          ]}
        >
          {name}
        </Text>
      ),
    },
    {
      column1: "DOB",
      column2: (
        <Text numberOfLines={1} style={[styles.cell, { textAlign: "right" }]}>
          4 April 1999
        </Text>
      ),
    },
    {
      column1: "Email Address",
      column2: (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text numberOfLines={1} style={[styles.cell, { textAlign: "right" }]}>
            mailtotilakkumar@gmail.com{" "}
          </Text>

          <Feather name="edit-2" size={14} color="black" />
        </View>
      ),
    },
    {
      column1: "Mobile Number",
      column2: (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text numberOfLines={1} style={[styles.cell, { textAlign: "right" }]}>
            8197064630
          </Text>

          <Feather name="edit-2" size={14} color="black" />
        </View>
      ),
    },
    {
      column1: "Masked Pan",
      column2: (
        <Text
          numberOfLines={1}
          style={[
            styles.cell,
            { textAlign: "right", textTransform: "uppercase" },
          ]}
        >
          B********C
        </Text>
      ),
    },
  ];

  return (
    <CustomHeaderLayout>
      <View>
        <View
          style={{
            backgroundColor: COLORS.Black,
            paddingLeft: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.White,
              fontSize: 18,
              fontWeight: "bold",
              paddingBottom: 10,
              textTransform: "capitalize",
            }}
          >
            {name}
          </Text>
        </View>

        <ScrollView alwaysBounceVertical={false}>
          <Section title={"PROFILE DETAILS"}>
            <View style={styles.table}>
              {data.map((row, index) => (
                <View key={index} style={styles.row}>
                  <Text
                    style={[
                      styles.cell,
                      { textAlign: "left", color: COLORS.DarkGray },
                    ]}
                  >
                    {row.column1}
                  </Text>

                  {row.column2}
                </View>
              ))}
            </View>
          </Section>

          <Section title={"MORE ACTIONS"} style={{ gap: 12 }}>
            <View
              style={{
                gap: 12,
              }}
            >
              <ActionButton
                onPress={() => router.navigate("/settings")}
                title={"App settings"}
                description={"Manage notifications, and more"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />

              <ActionButton
                title={"Your cards"}
                description={"Manage your cards"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />

              <ActionButton
                title={"Payments"}
                description={"Manage payees, and Bill Payments"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />
            </View>
          </Section>

          <Section title={"ABOUT US"} style={{ gap: 12 }}>
            <View
              style={{
                gap: 12,
              }}
            >
              <ActionButton
                title={"About PayUp"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />

              <ActionButton
                title={"Help center"}
                icon={
                  <Ionicons name="settings-outline" size={20} color="black" />
                }
              />
            </View>
          </Section>
        </ScrollView>
      </View>
    </CustomHeaderLayout>
  );
};

const styles = StyleSheet.create({
  table: {
    backgroundColor: COLORS.White,
    marginHorizontal: 20,
    borderRadius: 4,
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
    padding: 8,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 8,
  },
});

export default Profile;
