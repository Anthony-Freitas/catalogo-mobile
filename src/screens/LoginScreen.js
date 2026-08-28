import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para controlar os erros visuais e o ícone de senha
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();

const handleLogin = () => {
    // Reseta todos os erros antes de validar novamente
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    let hasError = false;

    // Expressão regular para validar o formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação do campo de E-mail (Vazio e Formato Inválido)
    if (email.trim() === '') {
      setEmailError('Campo obrigatório');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError('Insira um e-mail válido');
      hasError = true;
    }

    // Validação do campo de Senha (Vazio e Tamanho Mínimo)
    if (password.trim() === '') {
      setPasswordError('Campo obrigatório');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres');
      hasError = true;
    }

    // Para aqui se tiver algum erro de preenchimento na interface
    if (hasError) return; 

    // Se passar por todas as validações de interface, faz o login
    dispatch(login({ email }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 1. Fundo Superior Azul Escuro */}
      <View style={styles.topBackground}>
        <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitleText}>Insira seus dados para entrar na sua conta.</Text>
      </View>

      {/* 2. Cartão Branco Flutuante */}
      <View style={styles.cardContainer}>
        
        {/* Mensagem de Erro Geral (Topo do cartão) */}
        {generalError !== '' && (
          <Text style={styles.generalErrorText}>{generalError}</Text>
        )}

        {/* Campo: Username (E-mail) */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          value={email}
          onChangeText={(text) => { setEmail(text); setEmailError(''); setGeneralError(''); }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {emailError !== '' && (
          <View style={styles.errorRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={14} color="#D32F2F" />
            <Text style={styles.helperText}>{emailError}</Text>
          </View>
        )}

        {/* Campo: Senha */}
        <Text style={[styles.label, { marginTop: 15 }]}>Senha</Text>
        <View style={[styles.passwordContainer, passwordError ? styles.inputError : null]}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => { setPassword(text); setPasswordError(''); setGeneralError(''); }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <MaterialCommunityIcons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>
        {passwordError !== '' && (
          <View style={styles.errorRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={14} color="#D32F2F" />
            <Text style={styles.helperText}>{passwordError}</Text>
          </View>
        )}

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA', // Fundo inferior cinza claro
  },
  
  // O Bloco azul que ocupa o topo
  topBackground: { 
    height: '45%', 
    backgroundColor: '#4F5671', 
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40 
  },
  welcomeText: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitleText: { 
    fontSize: 14, 
    color: '#D0D4DC', 
    textAlign: 'center'
  },

  // Cartão que sobrepõe a divisão de cores usando margem negativa
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 25,
    marginTop: -40, 
    borderRadius: 12,
    padding: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },

  // Rótulos (Labels) fora do campo
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginLeft: 2
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFF'
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    height: 45,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
    height: '100%'
  },
  eyeIcon: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center'
  },

  // Estados de Erro
  inputError: {
    borderColor: '#D32F2F', // Borda vermelha
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2
  },
  helperText: {
    color: '#D32F2F',
    fontSize: 12,
    marginLeft: 4
  },
  generalErrorText: {
    color: '#D32F2F',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 15,
    fontWeight: '500'
  },

  // Botão
  button: {
    backgroundColor: '#4F5671',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});