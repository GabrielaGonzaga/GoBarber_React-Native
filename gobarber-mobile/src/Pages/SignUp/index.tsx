import React, {useCallback, useRef} from "react";
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert} from "react-native";
import getValidationErrors from "../../utils/getValidationErrors";
import {
    Container, 
    Text, 
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
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import api from "../../services/api";
import logo from '../../assets/logo.png';
import { Icon } from "../../components/Input/styles";
import * as Yup from 'yup';

interface SignUpFormData{
    name: string,
    email: string,
    password: string
}

const SignIn: React.FC = () => {

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null)
    const emailInputRef = useRef<TextInput>(null)

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'Mínimo de 6 dígitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data)
            navigation.goBack()
            Alert.alert(
                'Cadastro realizado com sucesso!', 
                'Você já pode fazer logon no GoBaber.'
            )

        } catch (err: any) {

            if(err instanceof Yup.ValidationError){
                //@ts-ignore ("Argument of type 'unknown' is not assignable to parameter of type 'ValidationError'")
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors)
            }

            Alert.alert(
                'Erro ao cadastrar', 
                'Ocorreu um erro ao realizar o seu cadastro, tente novamente.'
            )
        }
    }, [navigation])

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
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input 
                                name="name" 
                                icon="user" 
                                placeholder="Nome"
                                returnKeyType="next"
                                autoCorrect={true}
                                autoCapitalize="words"
                                textContentType="givenName"
                                onSubmitEditing={() => {emailInputRef.current?.focus()}}
                            />
                            <Input
                                ref={emailInputRef}
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                autoCorrect = {false}
                                keyboardType = 'email-address'
                                autoCapitalize = "none"
                                returnKeyType="next"
                                onSubmitEditing={() => {passwordInputRef.current?.focus()}}
                            />
                            <Input 
                                ref={passwordInputRef}
                                name="password" 
                                icon="lock" 
                                placeholder="Senha"
                                secureTextEntry={true}
                                textContentType="password"
                                returnKeyType="send"
                                onSubmitEditing={() => {formRef.current?.submitForm()}}
                            />
                        </Form>
                        <Button onPress={() => {formRef.current?.submitForm()}}>Cadastrar</Button>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* @ts-ignore */}
            <ReturnToLoginButton onPress={() => navigation.navigate('SignIn')}>
                <Icon name="arrow-left" size={20} color="#ffffff"style={{fontFamily: 'RobotoSlab_400Regular'}}></Icon>
                <ReturnToLoginButtonText>
                    Voltar para o logon
                </ReturnToLoginButtonText>
            </ReturnToLoginButton>
        </>
    )
}

export default SignIn;