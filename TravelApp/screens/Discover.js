import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Hotels, Attractions, Restaurants, NotFound } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";

const Discover = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat,bl_lng,tr_lat,tr_lng,type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [bl_lat,bl_lng,tr_lat,tr_lng, type]);

  return (
    <SafeAreaView
      className="flex-1 bg-white relative"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[32px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-black rounded-md items-center justify-center shadow-lg">
          <Image
            className="w-full h-full rounded-md object-cover"
            source={Avatar}
          />
        </View>
      </View>

      <View className="flex-row items-center mx-4 rounded-xl py-1 px-4 shadow-xl mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat)
            setBl_lng(details?.geometry?.viewport?.southwest?.lng)
            setTr_lat(details?.geometry?.viewport?.northeast?.lat)
            setTr_lng(details?.geometry?.viewport?.northeast?.lng)
          }}
          query={{
            key: "AIzaSyCWQ1wZMgTHGGT5BqeYTAv6-SRkeloyzMQ",
            language: "tr",
          }}
        />
      </View>

      {/*Menu containerr*/}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={60} color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row  items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[26px] font-bold">
                Top Tips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>

            <View className=" px-3 mt-8 flex-row items-center justify-between flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    data?.photo?.images?.medium?.url ? (<ItemCardContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://thumbs.dreamstime.com/b/simple-restaurant-vector-logo-design-inspiration-simple-restaurant-logo-design-inspiration-148064390.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />) :(null)
                    
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className="w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      Opps... No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
          
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
