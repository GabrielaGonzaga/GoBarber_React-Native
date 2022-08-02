import React, {useCallback, useRef} from "react";
import { Image, View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert} from "react-native";
import getValidationErrors from "../../utils/getValidationErrors";
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
import * as Yup from 'yup';
import logo from '../../assets/logo.png';
import { useAuth } from "../../hooks/auth";

interface SignInFormData{
    email: string,
    password: string
}

const SignIn: React.FC = () => {

    const {signIn, user} = useAuth();
    console.log(user)
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null)

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password, 
            });

            // navigation.goBack()

        } catch (err: any) {

            if(err instanceof Yup.ValidationError){
                //@ts-ignore ("Argument of type 'unknown' is not assignable to parameter of type 'ValidationError'")
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors)
            }

            Alert.alert(
                'Erro na autenticação', 
                'Ocorreu um erro ao fazer login, cheque as credenciais.'
            )
        }
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
                            <Input
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
                                returnKeyType="send"
                                onSubmitEditing={() => {formRef.current?.submitForm()}}
                            />
                        </Form>
                        <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>
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