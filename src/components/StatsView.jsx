import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CuteEyes from './CuteEyes';

export default function StatsView({ herois = [] }) {
  // Compute real stats from heroes
  const total = herois.length;
  const forcas = herois.map((h) => (typeof h.forca === 'number' ? h.forca : parseInt(h.forca, 10) || 0));
  const mediaForca = total > 0 ? Math.round(forcas.reduce((a, b) => a + b, 0) / total) : 0;
  const maisForte = herois.length > 0 ? [...herois].sort((a, b) => (b.forca || 0) - (a.forca || 0))[0] : null;

  const subjectColors = [
    { bar: '#38BDF8', bg: '#E0F2FE' },
    { bar: '#A78BFA', bg: '#F3E8FF' },
    { bar: '#FBBF24', bg: '#FEF3C7' },
    { bar: '#F472B6', bg: '#FCE7F3' },
    { bar: '#34D399', bg: '#D1FAE5' },
    { bar: '#FF6B61', bg: '#FFEBE8' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Title */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Meu Progresso</Text>
        <View style={styles.starIconWrapper}>
          <Ionicons name="sparkles" size={18} color="#FF6B61" />
        </View>
      </View>

      {/* Streak / Highlight Banner (Matching Aptivo's 6 day streak banner) */}
      <View style={styles.streakBanner}>
        <View style={styles.streakContent}>
          <View style={styles.streakHeader}>
            <Ionicons name="flame" size={20} color="#FFFFFF" />
            <Text style={styles.streakTitle}>Universo Heroico Ativo!</Text>
          </View>
          <Text style={styles.streakSub}>
            {total} heróis catalogados • Média de força: {mediaForca} pts
          </Text>
        </View>
        <View style={styles.streakEyes}>
          <CuteEyes size={24} lookDirection="left" color="#FFFFFF" pupilColor="#FF6B61" />
        </View>
      </View>

      {/* Hero Strength Breakdown (Matching "By subject" section in Aptivo) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Ranking de Poder</Text>

        {herois.slice(0, 6).map((hero, idx) => {
          const colorObj = subjectColors[idx % subjectColors.length];
          const val = typeof hero.forca === 'number' ? hero.forca : parseInt(hero.forca, 10) || 50;
          const pct = Math.min(100, Math.max(15, val > 100 ? (val / 500) * 100 : val));

          return (
            <View key={hero.id || idx} style={styles.subjectRow}>
              <View style={styles.subjectLabelRow}>
                <View style={[styles.bulletPoint, { backgroundColor: colorObj.bar }]} />
                <Text style={styles.subjectName} numberOfLines={1}>
                  {hero.nome}
                </Text>
              </View>

              <View style={styles.progressRow}>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${pct}%`, backgroundColor: colorObj.bar },
                    ]}
                  />
                </View>
                <Text style={styles.percentageText}>{val} pts</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Badges Earned (Matching Aptivo's "Badges earned" row) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Insígnias Conquistadas</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badgeBox, { backgroundColor: '#EEF7FE' }]}>
            <Ionicons name="ribbon" size={24} color="#3B9AE8" />
            <Text style={styles.badgeName}>Recruta</Text>
          </View>
          <View style={[styles.badgeBox, { backgroundColor: '#FFF2F0' }]}>
            <Ionicons name="flame" size={24} color="#FF6B61" />
            <Text style={styles.badgeName}>Super Força</Text>
          </View>
          <View style={[styles.badgeBox, { backgroundColor: '#F4EFFF' }]}>
            <Ionicons name="star" size={24} color="#855BD6" />
            <Text style={styles.badgeName}>Lenda</Text>
          </View>
          <View style={[styles.badgeBox, { backgroundColor: '#FAF5F0' }]}>
            <Ionicons name="lock-closed" size={24} color="#C4B8B0" />
            <Text style={[styles.badgeName, { color: '#B5A8A0' }]}>Mítico</Text>
          </View>
        </View>
      </View>

      {maisForte && (
        <View style={styles.mvpCard}>
          <View style={styles.mvpIconWrap}>
            <Ionicons name="trophy" size={24} color="#F7A72E" />
          </View>
          <View style={styles.mvpTextContainer}>
            <Text style={styles.mvpTitle}>Maior Força Registrada</Text>
            <Text style={styles.mvpName}>{maisForte.nome} ({maisForte.forca} pts)</Text>
            <Text style={styles.mvpSkill}>{maisForte.habilidade}</Text>
          </View>
        </View>
      )}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2B2127',
  },
  starIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEFEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakBanner: {
    backgroundColor: '#FF6B61',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#FF6B61',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  streakContent: {
    flex: 1,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  streakTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  streakSub: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  streakEyes: {
    marginLeft: 12,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    marginBottom: 18,
    shadowColor: '#2D1F24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2B2127',
    marginBottom: 16,
  },
  subjectRow: {
    marginBottom: 14,
  },
  subjectLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3A2E34',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#EAE1D9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7E7178',
    width: 55,
    textAlign: 'right',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeBox: {
    width: 68,
    height: 74,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  badgeName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4B3F46',
  },
  mvpCard: {
    backgroundColor: '#FEF8EA',
    borderWidth: 1.5,
    borderColor: '#FCE7C5',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  mvpIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mvpTextContainer: {
    flex: 1,
  },
  mvpTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DE8E14',
    textTransform: 'uppercase',
  },
  mvpName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2B2127',
    marginTop: 2,
  },
  mvpSkill: {
    fontSize: 12,
    color: '#6E5D4B',
    marginTop: 2,
  },
});
