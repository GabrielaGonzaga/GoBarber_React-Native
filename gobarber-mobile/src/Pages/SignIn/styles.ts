import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
`;

export const Text = styled.Text`
    font-size: 24px;
    color: #F4EDE8;
    margin: 34px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const TextForgotPassword = styled.Text `
    font-size: 16px;
    color: #F4EDE8;
`
export const CreateAccountButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 40;
    right: 0;
    /* background-color: #312e38; */
    /* border-width: 1px;
    border-color: #232129; */
    padding: 16px 0 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text `
    font-size: 14px;
    color: #FF9000;
    margin-left: 16px;
`