import React from "react";
import { Image, View, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import {
    Container, 
    Text, 
    ForgotPassword, 
    TextForgotPassword, 
    ReturnToLoginButtonText,
    ReturnToLoginButton
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
import { useNavigation } from "@react-navigation/native";
import logo from '../../assets/logo.png';

const SignUp: React.FC = () => {

    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        RobotoSlab_500Medium,
        RobotoSlab_400Regular
    });    
    
    if (!fontsLoaded) {
        return(<AppLoading />);
    }else
    return(
        <>
            {/* @ts-ignore */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined}style={{flex: 1}}>
                {/* @ts-ignore */}
                <ScrollView contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps="handled">
                    <Container>
                        {/* @ts-ignore */}
                        <Image source={logo}></Image>
                        {/* @ts-ignore */}
                        <View>
                            <Text style={{fontFamily: 'RobotoSlab_500Medium'}}>Crie sua conta</Text>
                        </View>
                        <Input name="name" icon="user" placeholder="Nome"/>
                        <Input name="email" icon="mail" placeholder="E-mail"/>
                        <Input name="" icon="lock" placeholder="Senha"/>
                        <Button onPress={() => {console.log('signup')}}>Entrar</Button>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* @ts-ignore */}
            <ReturnToLoginButton onPress={() => navigation.navigate('SignIn')}>
                {/* @ts-ignore */}
                <Icon name="arrow-left" size={20} color="#ffffff"style={{fontFamily: 'RobotoSlab_400Regular'}}/>
                <ReturnToLoginButtonText>
                    Voltar para o logon
                </ReturnToLoginButtonText>
            </ReturnToLoginButton>
        </>
    )
}

export default SignUp;