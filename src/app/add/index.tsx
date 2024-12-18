import { Alert, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./style";
import { colors } from "@/styles/colors";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { useState } from "react";
import { linkStorage } from "@/storage/links-storage";
import { validate } from "./functions";

export default function Add() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    async function handleAdd() {
        try {
            const errors = validate(category, name, url);

            if (errors.length) {
                const [header, message] = errors;
                return Alert.alert(header, message);
            }
    
            await linkStorage.save({
                id: String(new Date().getTime()),
                name,
                url,
                category
            });

            Alert.alert(
                "Sucesso", "Link adicionado com sucesso",
                [{ text: "Ok", onPress: () => router.back() }]
            );
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao adicionar o link");
            console.log(error);
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.header }>
                <TouchableOpacity onPress={ () => router.back() }>
                    <MaterialIcons 
                        name="arrow-back"
                        size={ 32 }
                        color={ colors.gray[200] } 
                    />
                </TouchableOpacity>

                <Text style={ styles.title }>Novo</Text>
            </View>

            <Text style={ styles.label }>Selecione uma categoria</Text>
            <Categories onChange={ setCategory } selected={ category }/>

            <View style={ styles.form }>
                <Input 
                    placeholder="Nome"
                    onChangeText={ setName }
                    autoCorrect={ false }
                    autoCapitalize="none"
                />
                <Input 
                    placeholder="URL"
                    onChangeText={ setUrl }
                    autoCorrect={ false }
                    autoCapitalize="none"
                />
                <Button title="Adicionar" onPress={ handleAdd }/>
            </View>
        </View>
    )
}