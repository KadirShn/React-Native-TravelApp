import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, FontAwesome, MaterialIcons } from "@expo/vector-icons";
const ItemScreen = ({ route }) => {
  const navigation = useNavigation();

  const data = route?.params?.param;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView
      className="flex-1 bg-white relative"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://thumbs.dreamstime.com/b/simple-restaurant-vector-logo-design-inspiration-simple-restaurant-logo-design-inspiration-148064390.jpg",
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />

          <View className="absolute flex-row inset-x-1 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#069dae" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#069dae]">
              <FontAwesome5 name="heartbeat" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className="absolute flex-row inset-x-1 bottom-5 justify-between px-3">
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[12px] font-bold text-gray-100">
                {data?.price_level}
                
              </Text>
              <Text className="text-[30px] font-bold text-gray-100">
                {data?.price}
              </Text>
            </View>
            <View className="px-2 py-1 items-center justify-center rounded-md bg-orange-50">
              <Text>{data?.open_now_text}</Text>
            </View>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-[#428288] text-[24px] font-bold">
            {data?.name}
          </Text>
          <View className="flex-row items-center space-x-2 mt-1">
            <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
            <Text className="text-[#8C9EA6] text-[18px] font-bold">
              {data?.location_string}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          {data?.rating && (
            <View className="flex-row items-center space-x-2">
              <View className="w-11 h-11 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color="#D58574" />
              </View>
              <View>
                <Text className="text-[#515151] ">{data?.rating}</Text>
                <Text className="text-[#515151] text-[12px]">Ratings</Text>
              </View>
            </View>
          )}
          {data?.price_level && (
            <View className="flex-row items-center space-x-2">
              <View className="w-11 h-11 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <MaterialIcons name="attach-money" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.price_level}</Text>
                <Text className="text-[#515151] text-[12px]">Price Level</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <View className="flex-row items-center space-x-2">
              <View className="w-11 h-11 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome5 name="map-signs" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.bearing}</Text>
                <Text className="text-[#515151] text-[12px]">Bearing</Text>
              </View>
            </View>
          )}
        </View>

        {data?.description &&(
          <Text className="mt-4 tracking-wide text-[15px] font-semibold text-[#97a6af] text-justify">
            {data?.description} 
          </Text>
        )}

        {data?.cuisine &&(
          <View className="flex-row gap-2 items-center justify-start flex-wrap mt-2">
            {data?.cuisine.map((n) => (
            <TouchableOpacity key={n.key} className="px-2 py-1 rounded-md bg-emerald-100">
              <Text>{n.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        )}

        <View className="space-y-2 mt-4 bg-[#ededed] rounded-2xl px-4 py-2">
          {data?.phone !==undefined ?(
            <View className="items-center flex-row space-x-4">
              <FontAwesome5 name="phone-alt" size={22} color="#428288" />
              <Text className="text-base">{data?.phone}</Text>
            </View>
          ):(<View className="items-center flex-row space-x-4">
          <FontAwesome5 name="phone-alt" size={22} color="#428288" />
          <Text className="text-base">😔 Not found 😔</Text>
        </View>)}
          {data?.email !==undefined ?(
            <View className="items-center flex-row space-x-4">
              <FontAwesome name="envelope" size={22} color="#428288" />
              <Text className="text-base">{data?.email}</Text>
            </View>
          ):(<View className="items-center flex-row space-x-4">
          <FontAwesome name="envelope" size={22} color="#428288" />
          <Text className="text-base">😔 Not found 😔</Text>
        </View>)}
          {data?.address !==undefined ?(
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={22} color="#428288" />
              <Text className="text-base">{data?.address}</Text>
            </View>
          ):(<View className="items-center flex-row space-x-6">
          <FontAwesome name="map-pin" size={22} color="#428288" />
          <Text className="text-base">😔 Not found 😔</Text>
        </View>)}
          <TouchableOpacity disabled className="opacity-50">
          <View className="mt-4 before:px-2 py-2 rounded-lg bg-[#069dae] items-center justify-center mb-8">
            <Text className="text-2xl font-semibold uppercase tracking-wider text-gray-100">
              Book Now
            </Text>
          </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
