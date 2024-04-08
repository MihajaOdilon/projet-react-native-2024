import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditSaleForm = ({ navigation, route }) => {
    const { sale } = route.params;
    const [updatedSale, setUpdatedSale] = useState(sale);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUpdatedSale(sale);
    }, [sale]);

    const handleSave = () => {
        setErrorMessage('');
        if (!updatedSale.numProduit || !updatedSale.design || !updatedSale.prix || !updatedSale.quantite) {
            setErrorMessage('Tous les champs sont obligatoires');
            return;
        }
        fetch(`http://172.20.10.2:8080/ventes/${sale.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSale),
        })
            .then(response => {
                if (response.ok) {
                    navigation.navigate('SaleDetails', { sale: updatedSale });
                } else if (response.status === 409) {
                    setErrorMessage('Le numéro de produit est déjà utilisé');
                } else {
                    throw new Error('Failed to update sale');
                }
            })
            .catch(error => {
                setErrorMessage('Error updating sale: ' + error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={updatedSale.numProduit.toString()}
                onChangeText={text => setUpdatedSale({...updatedSale, numProduit: parseInt(text) || ''})}
                placeholder="Numéro de produit"
                keyboardType={"numeric"}
            />
            <TextInput
                style={styles.input}
                value={updatedSale.design}
                onChangeText={text => setUpdatedSale({...updatedSale, design: text})}
                placeholder="Design"
            />
            <TextInput
                style={styles.input}
                value={updatedSale.prix ? updatedSale.prix.toString() : ''}
                onChangeText={text => setUpdatedSale({...updatedSale, prix: text ? parseFloat(text) : null})}
                placeholder="Prix"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={updatedSale.quantite ? updatedSale.quantite.toString() : ''}
                onChangeText={text => setUpdatedSale({...updatedSale, quantite: text ? parseInt(text) : null})}
                placeholder="Quantité"
                keyboardType="numeric"
            />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Button title="Enregistrer" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '80%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default EditSaleForm;
