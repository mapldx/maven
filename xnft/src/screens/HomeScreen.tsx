import React, { useState } from "react";
import { Text, View } from "react-native";
import { useDidLaunch } from "../hooks/xnft-hooks";

import { Iframe } from "react-xnft"

import tw from 'twrnc';
import axios from 'axios';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false)
  }, 2000);

  const didLaunch = useDidLaunch();
  const [user] = useState(null);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={tw`text-lg font-bold text-blue-500`}>Launching Maven...</Text>
      </View>
    );
  }

  console.log("didLaunch", didLaunch);
  if (didLaunch === true) {
    if (window.xnft["metadata"] === undefined) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={tw`text-lg font-bold text-red-500`}>Error retrieving data</Text>
          <Text style={tw`text-sm font-semibold`}>Kindly quit and relaunch the xNFT</Text>
        </View>
      );
    } else {
      const userId = window.xnft["metadata"].userId
      axios.get(`https://xnft-api-server.xnfts.dev/v1/users?user_id=${userId}`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
      })
      return (
        <View>
          <Iframe src={`http://localhost:3000/xnft/forms/${userId}`} style={{ height: '80vh' }} />
        </View>
      );
    }
  }
};
