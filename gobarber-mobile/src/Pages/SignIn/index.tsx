import React from "react";
import { Image, View, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import {
    Container, 
    Text, 
    ForgotPassword, 
    TextForgotPassword, 
    CreateAccountButton, 
    CreateAccountButtonText
} from './styles';
import Input from "../../components/Input";
import Button from "../../components/Button";
import AppLoading from 'expo-app-loading';
import { 
    useFonts, RobotoSlab_500Medium, 
    RobotoSlab_400Regular
} 
from '@expo-google-fonts/roboto-slab';
import { Feather as Icon } from '@expo/vector-icons'; 

import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
    let [fontsLoaded] = useFonts({
        RobotoSlab_500Medium,
        RobotoSlab_400Regular
    });    
    
    if (!fontsLoaded) {
        return(<AppLoading />);
    }else
    return(
        <>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? "padding" : undefined}
                style={{flex: 1}}>
                <ScrollView
                    contentContainerStyle={{flex: 1}}
                    keyboardShouldPersistTaps="handled">
                    <Container>
                        <Image source={logo}></Image>
                        <View>
                            <Text style={{fontFamily: 'RobotoSlab_500Medium'}}>Faça seu logon</Text>
                        </View>
                        <Input name="email" icon="mail" placeholder="E-mail"/>
                        <Input name="" icon="lock" placeholder="Senha"/>
                        <Button onPress={() => {}}>Entrar</Button>
                        <ForgotPassword>
                            <TextForgotPassword onPress={() => {}} style={{fontFamily: 'RobotoSlab_400Regular'}}>
                                Esqueci minha senha
                            </TextForgotPassword>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => {}}>
                <Icon name="log-in" size={20} color="#FF9000"style={{fontFamily: 'RobotoSlab_400Regular'}}/>
                <CreateAccountButtonText>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;