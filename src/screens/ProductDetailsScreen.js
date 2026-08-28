import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { formatPrice } from '../components/ProductCard';

export default function ProductDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Erro ao buscar detalhes:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#4F5671" style={styles.loader} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {/* Texto de desconto 100% em português */}
          <Text style={styles.discount}>-{product.discountPercentage}% de desconto</Text> 
        </View>

        <Text style={styles.sectionTitle}>Descrição do Produto</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar para a Lista</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 30 },
  imageContainer: { backgroundColor: '#D0D4DC', width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, padding: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  image: { width: '100%', height: '100%' },
  detailsContainer: { padding: 25 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4F5671', marginBottom: 15 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#27ae60', marginRight: 15 },
  discount: { backgroundColor: '#4F5671', color: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontWeight: 'bold', fontSize: 14, overflow: 'hidden' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4F5671', marginBottom: 8 },
  description: { fontSize: 16, color: '#666', lineHeight: 24, textAlign: 'justify', marginBottom: 40 },
  button: { backgroundColor: '#4F5671', padding: 15, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});