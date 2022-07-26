import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, InputText, Icon } from './styles';
import AppLoading from 'expo-app-loading';
import { 
    useFonts, RobotoSlab_500Medium, 
    RobotoSlab_400Regular
} 
from '@expo-google-fonts/roboto-slab';

interface ButtonProps extends TextInputProps{
    name: string,
    icon: string
}

const Input: React.FC<ButtonProps> = ({name, icon, ...rest}) => {

    let [fontsLoaded] = useFonts({
        RobotoSlab_500Medium,
        RobotoSlab_400Regular
    });    
    
    if (!fontsLoaded) {
        return(<AppLoading />);
    }
    return(
        <Container>
            {/* @ts-ignore */}
            <Icon name={icon} size={20} color='#666360'/>
            {/* @ts-ignore */}
            <InputText  
                {...rest} 
                placeholderTextColor = '#666360'
                keyboardAppearance = 'dark'
                style={{fontFamily: 'RobotoSlab_400Regular'}}
                />
        </Container> 
    );
}

export default Input;