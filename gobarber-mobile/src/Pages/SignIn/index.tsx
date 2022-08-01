import React, {useCallback, useRef} from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import logo from '../../assets/logo.png';
const SignIn: React.FC = () => {

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const handleSignIn = useCallback((data: object) => {
        console.log(data)
    }, [])

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
                            <Text style={{fontFamily: 'RobotoSlab_500Medium'}}>Faça seu logon</Text>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input name="email" icon="mail" placeholder="E-mail"/>
                            <Input name="" icon="lock" placeholder="Senha"/>
                            <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>
                        </Form>
                        <ForgotPassword>
                            <TextForgotPassword onPress={() => {}} style={{fontFamily: 'RobotoSlab_400Regular'}}>
                                Esqueci minha senha
                            </TextForgotPassword>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* @ts-ignore */}
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                {/* @ts-ignore */}
                <Icon name="log-in" size={20} color="#FF9000"style={{fontFamily: 'RobotoSlab_400Regular'}}/>
                <CreateAccountButtonText>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;