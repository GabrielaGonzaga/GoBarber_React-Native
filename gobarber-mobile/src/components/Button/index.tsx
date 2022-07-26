import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';
import AppLoading from 'expo-app-loading';
import { 
    useFonts, RobotoSlab_500Medium, 
    RobotoSlab_400Regular
} 
from '@expo-google-fonts/roboto-slab';

interface ButtonProps extends RectButtonProperties{
    children: string
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {

    let [fontsLoaded] = useFonts({
        RobotoSlab_500Medium,
        RobotoSlab_400Regular
    });    
    
    if (!fontsLoaded) {
        return(<AppLoading />);
    }
    return(
        <Container {...rest}>
            <ButtonText style={{fontFamily: 'RobotoSlab_500Medium'}}>
                {children}
            </ButtonText>
        </Container> 
    );
}

export default Button;