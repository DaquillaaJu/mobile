import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ activeTab = 'home', onTabChange }) {
  const tabs = [
    {
      id: 'home',
      label: 'Início',
      iconActive: 'home',
      iconInactive: 'home-outline',
    },
    {
      id: 'heroes',
      label: 'Heróis',
      iconActive: 'albums',
      iconInactive: 'albums-outline',
    },
    {
      id: 'progress',
      label: 'Poderes',
      iconActive: 'speedometer',
      iconInactive: 'speedometer-outline',
    },
    {
      id: 'profile',
      label: 'Perfil',
      iconActive: 'person',
      iconInactive: 'person-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={({ pressed }) => [
                styles.tabItem,
                isActive && styles.activeTabPill,
                pressed && { opacity: 0.8 },
              ]}
              onPress={() => onTabChange && onTabChange(tab.id)}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.iconInactive}
                size={19}
                color={isActive ? '#FFFFFF' : '#9E9299'}
              />
              {isActive && (
                <Text style={styles.activeLabel}>{tab.label}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: '#F3EBE4',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 22,
    shadowColor: '#2D1F24',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 24,
    gap: 6,
    minHeight: 44,
  },
  activeTabPill: {
    backgroundColor: '#FF6B61',
    paddingHorizontal: 16,
    shadowColor: '#FF6B61',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
  activeLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
