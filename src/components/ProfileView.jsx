import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CuteEyes from './CuteEyes';

export default function ProfileView({ heroisCount = 0, onRefresh }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      {/* Avatar & Character Identity (Matching Aptivo's Petal Profile Avatar) */}
      <View style={styles.avatarSection}>
        <View style={styles.mascotAvatarBubble}>
          <CuteEyes size={28} lookDirection="center" hasSmile hasEyelashes />
        </View>
        <Text style={styles.userName}>Colecionador(a)</Text>
        <Text style={styles.userSubtitle}>Guardião da Liga dos Heróis</Text>
      </View>

      {/* Three Stats Cards (Matching the 3 counters in Aptivo) */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{heroisCount}</Text>
          <Text style={styles.statLabel}>Heróis</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Insígnias</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Dias Ativo</Text>
        </View>
      </View>

      {/* Trophy Case (Matching Aptivo's Trophy Case) */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionHeader}>Galeria de Troféus</Text>
        <View style={styles.trophyRow}>
          <View style={[styles.trophyItem, { backgroundColor: '#EEF7FE' }]}>
            <Ionicons name="ribbon" size={24} color="#3B9AE8" />
          </View>
          <View style={[styles.trophyItem, { backgroundColor: '#FFF2F0' }]}>
            <Ionicons name="flame" size={24} color="#FF6B61" />
          </View>
          <View style={[styles.trophyItem, { backgroundColor: '#F4EFFF' }]}>
            <Ionicons name="star" size={24} color="#855BD6" />
          </View>
          <View style={[styles.trophyItem, { backgroundColor: '#FAF5F0' }]}>
            <Ionicons name="lock-closed" size={22} color="#C4B8B0" />
          </View>
        </View>
      </View>

      {/* Menu Action Options (Matching the Aptivo list options) */}
      <View style={styles.menuContainer}>
        <Pressable
          style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          onPress={onRefresh}
        >
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconWrap, { backgroundColor: '#FFEFEB' }]}>
              <Ionicons name="sync" size={18} color="#FF6B61" />
            </View>
            <Text style={styles.menuLabel}>Sincronizar com a API</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B5A8A0" />
        </Pressable>

        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconWrap, { backgroundColor: '#EEF7FE' }]}>
              <Ionicons name="shield" size={18} color="#3B9AE8" />
            </View>
            <Text style={styles.menuLabel}>Filtros e Preferências</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B5A8A0" />
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconWrap, { backgroundColor: '#F4EFFF' }]}>
              <Ionicons name="notifications" size={18} color="#855BD6" />
            </View>
            <Text style={styles.menuLabel}>Notificações do Universo</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B5A8A0" />
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <View style={[styles.menuIconWrap, { backgroundColor: '#FEF8EA' }]}>
              <Ionicons name="help-circle" size={18} color="#DE8E14" />
            </View>
            <Text style={styles.menuLabel}>Sobre o Superheroes App</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#B5A8A0" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7F2',
  },
  content: {
    padding: 20,
    paddingBottom: 90,
  },
  topBar: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2B2127',
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 14,
  },
  mascotAvatarBubble: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FF6B61',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#FF6B61',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2B2127',
  },
  userSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8188',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    shadowColor: '#2D1F24',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2B2127',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8188',
    marginTop: 2,
  },
  sectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2B2127',
    marginBottom: 12,
  },
  trophyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trophyItem: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F0E9',
  },
  menuItemPressed: {
    backgroundColor: '#FAF5F0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3A2E34',
  },
});
