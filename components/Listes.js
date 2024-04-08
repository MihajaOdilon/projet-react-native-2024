import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from "./Footer";

const Listes = () => {
    const [ventes, setVentes] = useState([]);
    const [minimalPrice, setMinimalPrice] = useState(0)
    const [maximalPrice, setMaximalPrice] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const navigation = useNavigation();

    const fetchVentes = useCallback(() => {
        fetch('http://172.20.10.2:8080/ventes')
            .then(response => response.json())
            .then(data => {
                setVentes(data);
            })
            .catch(error => {
                console.error('Error fetching ventes:', error);
            });
    }, []);

    const fetchMinimalPrice = useCallback(() => {
        fetch('http://172.20.10.2:8080/ventes/minimal-price') // Assurez-vous d'utiliser le bon endpoint pour récupérer le prix minimal
            .then(response => response.json())
            .then(data => {
                setMinimalPrice(data);
            })
            .catch(error => {
                console.error('Error fetching minimal price:', error);
            });
    }, []);

    const fetchMaximalPrice = useCallback(() => {
        fetch('http://172.20.10.2:8080/ventes/maximal-price')
            .then(response => response.json())
            .then(data => {
                setMaximalPrice(data);
            })
            .catch(error => {
                console.error('Error fetching maximal price : ', error);
            });
    }, []);
    const fetchTotalAmount = useCallback(() => {
        fetch('http://172.20.10.2:8080/ventes/total-amount')
            .then(response => response.json())
            .then(data => {
                setTotalAmount(data);
            })
            .catch(error => {
                console.error('Error fetching total amount : ', error);
            });
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            fetchVentes();
            fetchMinimalPrice();
            fetchMaximalPrice();
            fetchTotalAmount();
        });
    }, [navigation, fetchVentes, fetchMinimalPrice, fetchMaximalPrice, fetchTotalAmount]);

    const navigateToDetails = (item) => {
        navigation.navigate("SaleDetails", { sale: item });
    };

    const navigateToAddSale = () => {
        navigation.navigate('AddSaleForm');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Ajouter" onPress={navigateToAddSale} />
            ),
        });
    }, [navigation, navigateToAddSale]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.itemContainer}>
                <Text style={styles.text}>{"N° " + item.numProduit}</Text>
                <Text style={styles.text}>{item.design}</Text>
                <Text style={styles.text}>{item.prix + " Ar"}</Text>
                <Text style={styles.text}>{item.quantite}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={ventes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                <Footer minimalPrice={minimalPrice} maximalPrice={maximalPrice} totalAmount={totalAmount}></Footer>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
});
export default Listes;
