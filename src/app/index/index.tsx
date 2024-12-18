import { Image, View, TouchableOpacity, FlatList, Modal, Text, Alert, Linking, Pressable } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from './styles';
import { colors } from '@/styles/colors';

import { Categories } from '@/components/categories';

import { Link } from '@/components/link';
import { Option } from '@/components/option';

import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { categories } from '@/utils/categories';
import { LinkStorage, linkStorage } from '@/storage/links-storage';

export default function Index() {
    const [links, setLinks] = useState<LinkStorage[]>([]);
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
    const [category, setCategory] = useState(categories[0].name);
    const [isModalOpen, setIsModalOpen] = useState(false);


    async function getLinks() {
        try {
            const response = await linkStorage.get();

            const filtered = response.filter(item => item.category === category);
            setLinks(filtered);

        } catch (error) {
            Alert.alert("Ops", "Não foi possível carregar os links");
            console.log(error);
        }
    }

    function handleDetails(selectedLink: LinkStorage) {
        setIsModalOpen(true);
        setLink(selectedLink);
    }

    async function linkRemove() {
        try {
            await linkStorage.remove(link.id);
            getLinks();
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Ops", "Não foi possível remover o link");
        }
    }

    function handleRemove() {
        Alert.alert("Remover", "Deseja realmente remover esse link?", [
            { style: "cancel", text: "Não" },
            { text: "Sim", onPress: linkRemove },
        ]);
    }

    async function handleOpen() {
        try {
            await Linking.openURL(link.url);
            setIsModalOpen(false);
        } catch (error) {
            Alert.alert("Ops", "Nao foi possivel abrir o link");
            console.log(error);
        }
    }
        
    useEffect(() => {
        getLinks();
    }), [category];

    useFocusEffect(
        useCallback(() => {
            getLinks();
        }, [category])
    );

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Image 
                    source={ require('@/assets/logo.png') }
                    style={ styles.logo }
                />

                <TouchableOpacity 
                    activeOpacity={ 0.7 } onPress={ () => router.navigate("/add") }
                >
                    <MaterialIcons name="add" size={ 32 } color={ colors.green[300] } />
                </TouchableOpacity>
            </View>

            <Categories onChange={ setCategory } selected={ category }/>

            <FlatList
                data={ links }
                keyExtractor={ item => item.id }
                renderItem={ ({ item }) => (
                    <Link
                        name={ item.name }
                        url={ item.url }
                        onDetails={ () => handleDetails(item) }  
                    />
                )}
                style={ styles.links }
                contentContainerStyle={ styles.linksContent }
                showsVerticalScrollIndicator={ false }
            />

            <Modal transparent visible={ isModalOpen } animationType="slide">
                <View style={ styles.modal }>
                    <View style={ styles.modalContent }>
                        <View style={ styles.modalHeader }>
                            <Text style={ styles.modalCategory }>{ link.category }</Text>
                            
                            <TouchableOpacity activeOpacity={ 0.7 } onPress={ () => setIsModalOpen(false) }>
                                <MaterialIcons 
                                    name="close"
                                    size={ 20 }
                                    color={ colors.gray[400] }
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={ styles.modalLinkName }>
                            { link.name }
                        </Text>
                        
                        <Text style={ styles.modalUrl }>
                            { link.url }
                        </Text>

                        <View style={ styles.modalOptions }>
                            <Option name="Excluir" icon="delete" variant="secondary" onPress={ handleRemove }/>
                            <Option name="Abrir" icon="language" onPress={ handleOpen }/>
                        </View>
                    </View>
                    
                </View>
            </Modal>
        </View>
    )
}