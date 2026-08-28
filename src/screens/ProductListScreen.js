import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const catMasculinas = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const catFemininas = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

const categoryConfig = {
  'mens-shirts': 'Camisetas', 'mens-shoes': 'Calçados', 'mens-watches': 'Relógios',
  'womens-bags': 'Bolsas', 'womens-dresses': 'Vestidos', 'womens-jewellery': 'Joias',
  'womens-shoes': 'Sapatos', 'womens-watches': 'Relógios'
};

export default function ProductListScreen({ navigation }) {
  const [secaoAtiva, setSecaoAtiva] = useState('Masculina');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [busca, setBusca] = useState(''); 
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoriasBusca = secaoAtiva === 'Masculina' ? catMasculinas : catFemininas;
        const requests = categoriasBusca.map(cat => api.get(`/products/category/${cat}`));
        const responses = await Promise.all(requests);
        
        const allProducts = responses.flatMap((res, index) => 
          res.data.products.map(p => ({ ...p, categoryTag: categoriasBusca[index] }))
        );
        
        setProdutos(allProducts);
        setCategoriaAtiva('Todas'); 
        setBusca(''); 
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [secaoAtiva]);

  const produtosFiltrados = produtos.filter(p => {
    const passaCategoria = categoriaAtiva === 'Todas' ? true : p.categoryTag === categoriaAtiva;
    const passaBusca = p.title.toLowerCase().includes(busca.toLowerCase());
    return passaCategoria && passaBusca;
  });

  const categoriasAtuais = secaoAtiva === 'Masculina' ? catMasculinas : catFemininas;

  return (
    <View style={styles.container}>
      
      {/* 1. Header com Busca e Sair */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.searchBar}>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Buscar produto..." 
              placeholderTextColor="#999"
              value={busca}
              onChangeText={setBusca}
            />
            <MaterialCommunityIcons name="magnify" size={22} color="#666" />
          </View>
          <TouchableOpacity onPress={() => dispatch(logout())} style={styles.logoutBtn}>
            <MaterialCommunityIcons name="logout" size={20} color="#FFF" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Barra de Filtros (Lado a Lado) otimizando espaço */}
      <View style={styles.filterRow}>
        
        {/* Toggle de Seções (Estilo Interruptor) */}
        <View style={styles.sectionToggle}>
          <TouchableOpacity 
            style={[styles.sectionBtn, secaoAtiva === 'Masculina' && styles.sectionBtnActive, {borderTopLeftRadius: 6, borderBottomLeftRadius: 6}]} 
            onPress={() => setSecaoAtiva('Masculina')}
          >
            <Text style={[styles.sectionBtnText, secaoAtiva === 'Masculina' && styles.sectionBtnTextActive]}>Masc</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sectionBtn, secaoAtiva === 'Feminina' && styles.sectionBtnActive, {borderTopRightRadius: 6, borderBottomRightRadius: 6}]} 
            onPress={() => setSecaoAtiva('Feminina')}
          >
            <Text style={[styles.sectionBtnText, secaoAtiva === 'Feminina' && styles.sectionBtnTextActive]}>Fem</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Rolagem de Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <TouchableOpacity style={[styles.pillBtn, categoriaAtiva === 'Todas' && styles.pillBtnActive]} onPress={() => setCategoriaAtiva('Todas')}>
            <Text style={[styles.pillText, categoriaAtiva === 'Todas' && styles.pillTextActive]}>Todas</Text>
          </TouchableOpacity>
          {categoriasAtuais.map(cat => (
            <TouchableOpacity key={cat} style={[styles.pillBtn, categoriaAtiva === cat && styles.pillBtnActive]} onPress={() => setCategoriaAtiva(cat)}>
              <Text style={[styles.pillText, categoriaAtiva === cat && styles.pillTextActive]}>{categoryConfig[cat]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. Lista de Itens (Agora em Grid 2x2) */}
      <View style={styles.itemsContainer}>
        {loading ? (
          <View style={styles.centerContent}><ActivityIndicator size="large" color="#4F5671" /></View>
        ) : produtosFiltrados.length === 0 ? (
          <View style={styles.centerContent}><Text style={{ color: '#666' }}>Nenhum produto encontrado.</Text></View>
        ) : (
          <FlatList
            data={produtosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2} // <--- O segredo do Grid está aqui!
            columnWrapperStyle={styles.rowWrapper} // Alinha os 2 itens na linha
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <ProductCard item={item} onPress={() => navigation.navigate('ProductDetails', { id: item.id })} />
            )}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  // Header
  header: { backgroundColor: '#4F5671', paddingHorizontal: 15, paddingBottom: 12, paddingTop: 45, justifyContent: 'center', elevation: 4, zIndex: 10 },
  headerTopRow: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' },
  searchBar: { flex: 1, backgroundColor: '#F0F0F0', borderRadius: 20, flexDirection: 'row', alignItems: 'center', height: 38, paddingHorizontal: 12, marginRight: 15 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, color: '#333' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', padding: 5 },
  logoutText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginLeft: 4 },
  
  // Barra de Filtros
  filterRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 10, 
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10
  },
  
  // Toggle Masc/Fem
  sectionToggle: { flexDirection: 'row', backgroundColor: '#EAEAEA', borderRadius: 6 },
  sectionBtn: { paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  sectionBtnActive: { backgroundColor: '#4F5671' },
  sectionBtnText: { fontSize: 13, fontWeight: 'bold', color: '#666' },
  sectionBtnTextActive: { color: '#FFF' },
  
  divider: { width: 1, height: 25, backgroundColor: '#D0D0D0', marginHorizontal: 10 },
  
  // Scroll de Categorias
  categoriesScroll: { flexDirection: 'row' },
  pillBtn: { backgroundColor: '#F0F0F0', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14, marginRight: 8, borderWidth: 1, borderColor: '#EAEAEA' },
  pillBtnActive: { backgroundColor: '#4F5671', borderColor: '#4F5671' },
  pillText: { color: '#666', fontWeight: 'bold', fontSize: 12 },
  pillTextActive: { color: '#FFF' },

  // Área da Lista Grid
  itemsContainer: { flex: 1, paddingHorizontal: 12 },
  rowWrapper: { justifyContent: 'space-between' }, // Joga um item para a esquerda e outro para a direita
  flatListContent: { paddingBottom: 20, paddingTop: 5 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});