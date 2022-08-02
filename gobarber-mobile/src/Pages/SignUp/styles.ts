import styled from 'styled-components/native';
import { Platform } from 'react-native';
// import {getBottomSpace} from 'react-native-iphone-x-helper'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 70 : 40 }px;
`;

export const Text = styled.Text`
    font-size: 24px;
    color: #F4EDE8;
    margin: 34px 0 24px;
`;

export const ReturnToLoginButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 40;
    right: 0;
    background-color: #312e38; 
    /* border-width: 1px; */
    border-color: #232129;
    padding: 5px 0 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const ReturnToLoginButtonText = styled.Text `
    font-size: 14px;
    color: #FFF;
    margin-left: -5px;
`