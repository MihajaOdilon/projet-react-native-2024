import React from 'react';
import {Text, View} from "react-native";

function Footer(props) {
    const {minimalPrice ,maximalPrice, totalAmount} = props;
    return (
        <View style={{padding:20 , backgroundColor:"orange"}}>
            <Text>
                {"Min: " + minimalPrice + "Ar , Max: " + maximalPrice + "Ar , Total: " + totalAmount + "Ar" }
            </Text>
        </View>
    );
}

export default Footer;