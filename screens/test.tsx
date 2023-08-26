import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Modal, Linking } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiDeleteCall } from '../utils/DeleteCall';

interface Product {
    productType: string;
    Amount: number;
    Shop: string;
    Link: string | null;
    id: number;
}

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [itemToDelete, setItemToDelete] = useState<Product | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [shopFilter, setShopFilter] = useState<string>('');
    const [amountFilter, setAmountFilter] = useState<number | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://lars.detestbaas.nl:3000/products');
            const data = response.data;
            const filteredData = data.filter(item => !item.hasOwnProperty('users'));
            setProducts(filteredData);
            await AsyncStorage.setItem('products', JSON.stringify(filteredData));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onDelete = async (itemToDelete: Product | null) => {
        if (itemToDelete) {
            try {
                await apiDeleteCall(itemToDelete.id.toString());
                setProducts(prevProducts =>
                    prevProducts.filter(product => product.id !== itemToDelete.id)
                );
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const renderItem = ({ item }: { item: Product }) => {
        // Truncate the link to 30 characters with ellipsis
        const truncatedLink = item.Link && item.Link.length > 30 ? item.Link.substring(0, 30) + '...' : item.Link;

        const handleLinkPress = async () => {
            if (item.Link) {
                let linkToOpen = item.Link;
                if (!linkToOpen.startsWith('http://') && !linkToOpen.startsWith('https://')) {
                    // Add 'https://' if the link doesn't start with http:// or https://
                    linkToOpen = 'https://' + linkToOpen;
                }
    
                try {
                    await Linking.openURL(linkToOpen);
                } catch (error) {
                    console.error('Error opening URL:', error);
                }
            }
        };

        const renderRightActions = () => (
            <TouchableOpacity
                style={{
                    width: 75,
                    borderRadius: 5,
                }}
                onPress={() => {
                    setItemToDelete(item);
                    setModalVisible(true);
                }}
            >
                <ImageBackground
                    source={require('whats_in_stock/assets/delete.png')}
                    style={{
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 15
                    }}
                ></ImageBackground>
            </TouchableOpacity>
        );

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.boldText}>{item.Shop}</Text>
                        <Text>{item.productType}</Text>
                        {item.Link && (
                            <TouchableOpacity onPress={handleLinkPress}>
                                <Text
                                    style={[
                                        styles.blueText,
                                        item.Link && item.Link.length > 30 ? styles.truncatedLink : null,
                                    ]}
                                >
                                    {truncatedLink}
                                </Text>
                            </TouchableOpacity>
                        )}



                    </View>
                    <View style={styles.rightContainer}>
                        <Text
                            style={[
                                styles.boldText,
                                styles.amount,
                                item.Amount > 0 ? styles.greenText : styles.redText,
                            ]}
                        >
                            {item.Amount}
                        </Text>
                    </View>
                </View>
                <DeleteConfirmationModal
                    isVisible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    onDelete={() => {
                        onDelete(itemToDelete);
                        setModalVisible(false);
                        setItemToDelete(null);
                    }}
                    itemToDelete={itemToDelete}
                />
            </Swipeable>
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search product"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <View style={styles.filterRow}>
                <Text style={styles.filterText}>Filter by shop</Text>
                <TextInput
                    style={styles.filterInput}
                    placeholder="Enter shop name"
                    value={shopFilter}
                    onChangeText={setShopFilter}
                />
            </View>
            <View style={styles.filterRow}>
                <Text style={styles.filterText}>Filter by amount</Text>
                <TextInput
                    style={styles.filterInput}
                    placeholder="Enter amount"
                    value={amountFilter !== null ? amountFilter.toString() : ''}
                    onChangeText={(text) => setAmountFilter(text !== '' ? parseFloat(text) : null)}
                    keyboardType="numeric"
                />
            </View>
            <FlatList
                data={products.filter((item) => {
                    if (shopFilter && !item.Shop.toLowerCase().includes(shopFilter.toLowerCase())) {
                        return false;
                    }
                    if (amountFilter !== null && item.Amount !== amountFilter) {
                        return false;
                    }
                    if (searchText && !item.productType.toLowerCase().includes(searchText.toLowerCase())) {
                        return false;
                    }
                    return true;
                })}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} />
        </View>
    );
};

const DeleteConfirmationModal = ({ isVisible, onCancel, onDelete, itemToDelete }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Are you sure you want to delete this item?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                // Call the onDelete function passed from the parent component
                                onDelete();

                                // Assuming your itemToDelete contains the id
                                if (itemToDelete) {
                                    apiDeleteCall(itemToDelete.id.toString()); // Convert id to string
                                }
                            }}
                            style={styles.modalButtonYes}
                        >
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={styles.modalButtonNo}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        flexDirection: 'row', // Set flexDirection to row
        alignItems: 'center', // Vertically center items
        backgroundColor: '#f4f6f6'
    },
    leftContainer: {
        flex: 1, // Takes up all available space
    },
    rightContainer: {
        flex: 0.5, // Takes half the available space
        alignItems: 'flex-end', // Align content to the right
    },
    boldText: {
        fontWeight: 'bold',
    },
    amount: {
        textAlign: 'right',
        fontSize: 20
    },
    greenText: {
        color: 'green',
    },
    redText: {
        color: 'red',
    },
    blueText: {
        color: 'blue'
    },
    searchContainer: {
        paddingVertical: 10,
    },
    searchBar: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterText: {
        flex: 1,
        marginRight: 10,
        fontWeight: 'bold',
    },
    filterInput: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: 300,
        alignItems: 'center'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    modalButtonYes: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#50C878',
        borderRadius: 10,
        marginRight: 20,
        height: 40,
        width: 70
    },
    modalButtonNo: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#D2042D',
        borderRadius: 10,
        marginLeft: 20,
        height: 40,
        width: 70,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    truncatedLink: {
        color: 'blue'
    }
});

export default App;