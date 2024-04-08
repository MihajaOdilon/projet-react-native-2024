import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Listes from './components/Listes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SaleDetailsScreen from './components/SaleDetailsScreen';
import EditSaleForm from "./components/EditSaleForm";
import AddSaleForm from "./components/AddSaleForm";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Listes">
                <Stack.Screen
                    name="Listes"
                    component={Listes}
                    options={{ title: 'Liste des ventes' }}
                />
                <Stack.Screen
                    name="SaleDetails"
                    component={SaleDetailsScreen}
                    options={{ title: 'Détails de la vente' }}
                />
                <Stack.Screen
                    name="EditSaleForm"
                    component={EditSaleForm}
                    options={{ title: 'Modifier la vente' }}
                />
                <Stack.Screen
                    name="AddSaleForm"
                    component={AddSaleForm}
                    options={{ title: 'Ajouter une vente' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
