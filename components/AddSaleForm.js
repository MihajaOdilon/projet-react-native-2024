// AddSaleForm.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const AddSaleForm = ({ navigation }) => {
    const [numProduit, setNumProduit] = useState('');
    const [design, setDesign] = useState('');
    const [prix, setPrix] = useState('');
    const [quantite, setQuantite] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        // Reset error message
        setErrorMessage('');

        const newSale = {
            numProduit: parseInt(numProduit),
            design,
            prix: parseFloat(prix),
            quantite: parseInt(quantite),
        };

        fetch('http://172.20.10.2:8080/ventes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSale),
        })
            .then(response => {
                if (response.ok) {
                    navigation.goBack();
                } else if (response.status === 400) {
                    setErrorMessage('Tous les champs sont obligatoires');
                } else if (response.status === 409) {
                    setErrorMessage('Le numéro de produit est déjà utilisé');
                } else {
                    throw new Error('Failed to add new sale');
                }
            })
            .catch(error => {
                setErrorMessage('Error adding new sale: ' + error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={numProduit}
                onChangeText={text => setNumProduit(text)}
                placeholder="Numéro de produit"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={design}
                onChangeText={text => setDesign(text)}
                placeholder="Design"
            />
            <TextInput
                style={styles.input}
                value={prix}
                onChangeText={text => setPrix(text)}
                placeholder="Prix"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={quantite}
                onChangeText={text => setQuantite(text)}
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

export default AddSaleForm;
