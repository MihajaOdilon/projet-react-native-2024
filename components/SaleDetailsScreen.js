import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SaleDetailsScreen = ({ route }) => {
    const { sale } = route.params;
    const navigation = useNavigation();

    const handleDeleteSale = () => {
        Alert.alert(
            'Confirmation',
            'Êtes-vous sûr de vouloir supprimer cette vente ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => console.log('Annuler la suppression'),
                    style: 'cancel',
                },
                {
                    text: 'Confirmer',
                    onPress: () => deleteSale(),
                },
            ],
            { cancelable: false }
        );
    };

    const deleteSale = async () => {
        try {
            const response = await fetch(`http://172.20.10.2:8080/ventes/${sale.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                navigation.goBack();
            } else {
                console.error('Failed to delete sale');
            }
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    const handleEditSale = () => {
        navigation.navigate('EditSaleForm', { sale });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.detailText}>ID: {sale.id}</Text>
            <Text style={styles.detailText}>Numéro de produit: {sale.numProduit}</Text>
            <Text style={styles.detailText}>Design: {sale.design}</Text>
            <Text style={styles.detailText}>Prix: {sale.prix}</Text>
            <Text style={styles.detailText}>Quantité: {sale.quantite}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Modifier" onPress={handleEditSale} />
                <Button title="Supprimer" onPress={handleDeleteSale} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});

export default SaleDetailsScreen;
