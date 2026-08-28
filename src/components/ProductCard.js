import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export const formatPrice = (value) => {
  return 'R$ ' + parseFloat(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

// Calcula a largura para caberem 2 cartões lado a lado com um pequeno espaço
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 20;

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF', // Fundo branco mais limpo
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    overflow: 'hidden',
    elevation: 2, // Sombra suave no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  imageContainer: {
    width: '100%',
    height: 140, // Espaço maior para a imagem brilhar
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F5671',
    marginBottom: 8,
    height: 38, // Trava a altura para os cartões não ficarem tortos se o texto for longo
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold'
  }
});