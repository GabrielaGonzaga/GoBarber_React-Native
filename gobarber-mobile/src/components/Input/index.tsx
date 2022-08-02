import React, { useEffect, useRef , useImperativeHandle, forwardRef, useState, useCallback} from 'react';
import { TextInputProps } from 'react-native';
import { Container, InputText, Icon } from './styles';
import AppLoading from 'expo-app-loading';
import { 
    useFonts, RobotoSlab_500Medium, 
    RobotoSlab_400Regular
} 
from '@expo-google-fonts/roboto-slab';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps{
    name: string,
    icon: string
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({name, icon, ...rest}, ref) => {

    const inputElementRef = useRef<any>(null)
    const {registerField, defaultValue = '', fieldName, error} = useField(name);
    const inputValueRef = useRef<InputValueReference>({value: defaultValue});

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
        //or
        // if(inputElementRef.current.value){
        //     setIsFilled(true)
        // }else{
        //     setIsFilled(false)
        // }
    }, [])

    useImperativeHandle(ref, () => ({
        focus() {
          inputElementRef.current.focus();
        },
      }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value){
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({text: value});
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        });
    }, [])

    let [fontsLoaded] = useFonts({
        RobotoSlab_500Medium,
        RobotoSlab_400Regular
    });    
    
    if (!fontsLoaded) {
        return(<AppLoading />);
    }
    return(
        <Container isFocused={isFocused} isErrored={!!error}>
            {/* @ts-ignore */}
            <Icon name={icon} size={20} color={isFocused|| isFilled? '#ff9000' : '#666360'}/>
            {/* @ts-ignore */}
            <InputText  
                {...rest} 
                ref={inputElementRef}
                placeholderTextColor = '#666360'
                keyboardAppearance = 'dark'
                style={{fontFamily: 'RobotoSlab_400Regular'}}
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                />
        </Container> 
    );
}

export default forwardRef(Input);