import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CuteEyes from '../../../components/CuteEyes';
import HeroCard from '../../../components/HeroCard';
import BottomNav from '../../../components/BottomNav';
import StatsView from '../../../components/StatsView';
import ProfileView from '../../../components/ProfileView';

export default function Home() {
  const [herois, setHerois] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // UI state for navigation and search/filtering
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const carregaHeroes = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const response = await fetch('https://superheroes-api-one.vercel.app/api/herois');
      if (!response.ok) {
        throw new Error('Erro ao buscar heróis');
      }

      const data = await response.json();
      const lista = Array.isArray(data) ? data : data?.herois || [];
      setHerois(lista);
    } catch (e) {
      setErro(e.message || 'Erro inesperado');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregaHeroes();
  }, []);

  // Filter categories based on common skills & attributes
  const filterCategories = [
    { id: 'Todos', label: 'Todos' },
    { id: 'Força', label: 'Super Força' },
    { id: 'Voo', label: 'Voo' },
    { id: 'Magia', label: 'Mágicos' },
    { id: 'Tecnologia', label: 'Tecnologia' },
    { id: 'Feminino', label: 'Heroínas' },
    { id: 'Masculino', label: 'Heróis' },
  ];

  // Filtered heroes list
  const filteredHerois = useMemo(() => {
    return herois.filter((item) => {
      // Search term matching
      const matchesSearch =
        searchQuery.trim() === '' ||
        (item.nome && item.nome.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.habilidade && item.habilidade.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category matching
      if (selectedFilter === 'Todos') return true;
      if (selectedFilter === 'Feminino') return item.sexo === 'Feminino';
      if (selectedFilter === 'Masculino') return item.sexo === 'Masculino';
      if (selectedFilter === 'Força') {
        const forcaVal = typeof item.forca === 'number' ? item.forca : parseInt(item.forca, 10) || 0;
        return forcaVal >= 90 || (item.habilidade && item.habilidade.toLowerCase().includes('força'));
      }
      if (selectedFilter === 'Voo') {
        return item.habilidade && item.habilidade.toLowerCase().includes('voo');
      }
      if (selectedFilter === 'Magia') {
        return (
          item.habilidade &&
          (item.habilidade.toLowerCase().includes('magia') ||
            item.habilidade.toLowerCase().includes('mágic'))
        );
      }
      if (selectedFilter === 'Tecnologia') {
        return (
          item.habilidade &&
          (item.habilidade.toLowerCase().includes('tecnol') ||
            item.habilidade.toLowerCase().includes('armadura') ||
            item.habilidade.toLowerCase().includes('inteligência'))
        );
      }
      return true;
    });
  }, [herois, searchQuery, selectedFilter]);

  const renderItem = ({ item, index }) => (
    <HeroCard item={item} index={index} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF7F2" />

      {/* Main Content Area based on Active Tab */}
      <View style={styles.container}>
        {activeTab === 'home' || activeTab === 'heroes' ? (
          <FlatList
            data={filteredHerois}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.headerContainer}>
                {/* Top Brand & Mascot Header */}
                <View style={styles.brandRow}>
                  <View style={styles.greetingContainer}>
                    <Text style={styles.screenTitle}>Lista de Heróis</Text>
                    <Text style={styles.screenSubtitle}>
                      Descubra os heróis e suas habilidades
                    </Text>
                  </View>

                  {/* Character Avatar Icon (Petal style from Aptivo) */}
                  <View style={styles.topMascotPill}>
                    <CuteEyes size={24} lookDirection="right" hasEyelashes />
                  </View>
                </View>

                {/* Aptivo-inspired Streak / Summary Card */}
                {!carregando && !erro && herois.length > 0 && (
                  <View style={styles.streakBanner}>
                    <View style={styles.streakTextCol}>
                      <View style={styles.streakTagRow}>
                        <Ionicons name="sparkles" size={14} color="#FFFFFF" />
                        <Text style={styles.streakTag}>LIGA SUPREMA</Text>
                      </View>
                      <Text style={styles.streakTitle}>
                        {herois.length} Heróis Catalogados
                      </Text>
                      <Text style={styles.streakDescription}>
                        Explore poderes, forças e características
                      </Text>
                    </View>
                    <View style={styles.mascotFlower}>
                      <CuteEyes size={28} lookDirection="center" hasSmile />
                    </View>
                  </View>
                )}

                {/* Search Bar (Rounded pill style from Aptivo) */}
                <View style={styles.searchBar}>
                  <Ionicons name="search" size={20} color="#B5A8A0" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar herói ou habilidade..."
                    placeholderTextColor="#A89E97"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery('')}>
                      <Ionicons name="close-circle" size={18} color="#B5A8A0" />
                    </Pressable>
                  )}
                </View>

                {/* Filter Pills (Horizontal scrollable Aptivo chips) */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterScroll}
                >
                  {filterCategories.map((category) => {
                    const isSelected = selectedFilter === category.id;
                    return (
                      <Pressable
                        key={category.id}
                        style={[
                          styles.filterChip,
                          isSelected && styles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter(category.id)}
                      >
                        <Text
                          style={[
                            styles.filterChipText,
                            isSelected && styles.filterChipTextActive,
                          ]}
                        >
                          {category.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>

                {/* Section title before the list */}
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>
                    {activeTab === 'heroes' ? 'Galeria de Heróis' : 'Heróis em Destaque'}
                  </Text>
                  <Text style={styles.sectionCount}>
                    {filteredHerois.length} encontrados
                  </Text>
                </View>

                {/* Loading State with Cute Mascot Animation */}
                {carregando && (
                  <View style={styles.centerFeedbackBox}>
                    <View style={styles.loadingMascot}>
                      <CuteEyes size={36} lookDirection="up" hasSmile />
                    </View>
                    <ActivityIndicator size="small" color="#FF6B61" style={{ marginTop: 14 }} />
                    <Text style={styles.loadingText}>Carregando heróis...</Text>
                  </View>
                )}

                {/* Error State with Retry Button */}
                {erro && (
                  <View style={styles.errorBox}>
                    <View style={styles.errorIconWrap}>
                      <Ionicons name="alert-circle" size={28} color="#FF5252" />
                    </View>
                    <Text style={styles.errorText}>Erro: {erro}</Text>
                    <Pressable style={styles.retryButton} onPress={carregaHeroes}>
                      <Ionicons name="reload" size={16} color="#FFFFFF" />
                      <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                    </Pressable>
                  </View>
                )}

                {/* Empty State */}
                {!carregando && !erro && filteredHerois.length === 0 && (
                  <View style={styles.emptyBox}>
                    <View style={styles.emptyMascot}>
                      <CuteEyes size={32} lookDirection="left" />
                    </View>
                    <Text style={styles.emptyText}>Nenhum herói encontrado.</Text>
                    {searchQuery.length > 0 && (
                      <Pressable
                        style={styles.clearSearchBtn}
                        onPress={() => {
                          setSearchQuery('');
                          setSelectedFilter('Todos');
                        }}
                      >
                        <Text style={styles.clearSearchText}>Limpar busca</Text>
                      </Pressable>
                    )}
                  </View>
                )}
              </View>
            }
          />
        ) : activeTab === 'progress' ? (
          <StatsView herois={herois} />
        ) : (
          <ProfileView heroisCount={herois.length} onRefresh={carregaHeroes} />
        )}
      </View>

      {/* Aptivo-inspired Floating Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF7F2',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FDF7F2',
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 90,
  },
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greetingContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#2B2127',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8188',
    marginTop: 2,
  },
  topMascotPill: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B61',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B61',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  streakBanner: {
    backgroundColor: '#FF6B61',
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    shadowColor: '#FF6B61',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  streakTextCol: {
    flex: 1,
  },
  streakTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  streakTag: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  streakTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  streakDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  mascotFlower: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FF877F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    marginBottom: 16,
    shadowColor: '#2D1F24',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2127',
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
  },
  filterChipActive: {
    backgroundColor: '#FF6B61',
    borderColor: '#FF6B61',
    shadowColor: '#FF6B61',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6F6168',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2B2127',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9E9299',
  },
  centerFeedbackBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    marginVertical: 16,
  },
  loadingMascot: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFEFEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7E7178',
    marginTop: 10,
  },
  errorBox: {
    backgroundColor: '#FFF2F2',
    borderWidth: 1.5,
    borderColor: '#FFD4D4',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginVertical: 16,
  },
  errorIconWrap: {
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 14,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B61',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    marginVertical: 16,
  },
  emptyMascot: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FAF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7E7178',
  },
  clearSearchBtn: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: '#FFEFEB',
  },
  clearSearchText: {
    color: '#FF6B61',
    fontSize: 12,
    fontWeight: '700',
  },
});
