import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import CuteEyes from './CuteEyes';
import { Ionicons } from '@expo/vector-icons';

const THEMES = [
  {
    banner: '#FF6B61',
    light: '#FFF2F0',
    accent: '#FF5447',
    border: '#FFE3E0',
    eyeLook: 'center',
    badge: '★ Poderoso',
  },
  {
    banner: '#4DA7EC',
    light: '#EEF7FE',
    accent: '#2B8EDB',
    border: '#D7EDFC',
    eyeLook: 'right',
    badge: '✦ Guardião',
  },
  {
    banner: '#9D7CE8',
    light: '#F4EFFF',
    accent: '#835BD6',
    border: '#E7DCFA',
    eyeLook: 'left',
    badge: '✧ Místico',
  },
  {
    banner: '#3CC287',
    light: '#EBF9F2',
    accent: '#25A66E',
    border: '#D2F3E3',
    eyeLook: 'up',
    badge: '⚡ Titã',
  },
  {
    banner: '#F7A72E',
    light: '#FEF8EA',
    accent: '#DE8E14',
    border: '#FCE7C5',
    eyeLook: 'center',
    badge: '✪ Lendário',
  },
  {
    banner: '#F06292',
    light: '#FDF0F5',
    accent: '#D84377',
    border: '#FAD5E4',
    eyeLook: 'right',
    badge: '❤ Valente',
  },
];

export default function HeroCard({ item, index = 0, onPress }) {
  const [imageError, setImageError] = useState(false);
  const theme = THEMES[index % THEMES.length];

  // Calculate power meter percentage (normalizing with a reasonable scale up to 100 or 500)
  const forcaNum = typeof item.forca === 'number' ? item.forca : parseInt(item.forca, 10) || 50;
  // If forca is above 100 (e.g. Hulk 500), calculate percentage relative to max scale (500)
  const powerPercent = Math.min(100, Math.max(10, forcaNum > 100 ? (forcaNum / 500) * 100 : forcaNum));

  // Split habilidades into tags if possible while still displaying full text
  const habilidadesList = item.habilidade
    ? item.habilidade.split(',').map((h) => h.trim()).filter(Boolean)
    : [];

  return (
    <View style={styles.cardContainer}>
      {/* Top Playful Mascot Banner (Inspired by Aptivo card headers) */}
      <View style={[styles.topBanner, { backgroundColor: theme.banner }]}>
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>{theme.badge}</Text>
        </View>

        {/* Mascot Eyes */}
        <View style={styles.eyesWrapper}>
          <CuteEyes size={26} lookDirection={theme.eyeLook} hasSmile />
        </View>

        <View style={styles.genderPill}>
          <Text style={styles.genderPillText}>{item.sexo || 'Herói'}</Text>
        </View>
      </View>

      {/* Main Card Body */}
      <View style={styles.cardBody}>
        {/* Hero Header with Avatar and Name */}
        <View style={styles.heroHeaderRow}>
          <View style={[styles.avatarContainer, { borderColor: theme.border, backgroundColor: theme.light }]}>
            {item.foto && !imageError ? (
              <Image
                source={{ uri: item.foto }}
                style={styles.avatarImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <View style={[styles.avatarFallback, { backgroundColor: theme.banner }]}>
                <CuteEyes size={20} lookDirection="center" />
                <Text style={styles.avatarInitial}>
                  {item.nome ? item.nome.charAt(0).toUpperCase() : 'H'}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.heroName} numberOfLines={1}>
              {item.nome}
            </Text>
            <View style={styles.idBadge}>
              <Ionicons name="shield-checkmark" size={13} color={theme.accent} />
              <Text style={[styles.idBadgeText, { color: theme.accent }]}>
                ID #{item.id}
              </Text>
            </View>
          </View>
        </View>

        {/* Power Progress Section (Matching Aptivo progress bars) */}
        <View style={styles.powerSection}>
          <View style={styles.powerLabelRow}>
            <View style={styles.powerIconRow}>
              <Ionicons name="flash" size={15} color={theme.accent} />
              <Text style={styles.powerLabel}>Força: {item.forca}</Text>
            </View>
            <Text style={[styles.powerPercentage, { color: theme.accent }]}>
              {forcaNum} pts
            </Text>
          </View>

          {/* Progress Bar Track and Indicator */}
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${powerPercent}%`,
                  backgroundColor: theme.accent,
                },
              ]}
            />
          </View>
        </View>

        {/* Abilities Section */}
        <View style={styles.abilitiesSection}>
          <View style={styles.abilitiesHeaderRow}>
            <Ionicons name="sparkles" size={14} color="#7E7178" />
            <Text style={styles.abilitiesTitle}>Habilidades:</Text>
          </View>

          {/* Full ability text to ensure zero information is lost */}
          <Text style={styles.abilitiesFullText}>{item.habilidade}</Text>

          {/* Ability tags pill cloud */}
          {habilidadesList.length > 0 && (
            <View style={styles.tagsContainer}>
              {habilidadesList.map((hab, i) => (
                <View
                  key={i}
                  style={[
                    styles.abilityChip,
                    { backgroundColor: theme.light, borderColor: theme.border },
                  ]}
                >
                  <Text style={[styles.abilityChipText, { color: theme.accent }]}>
                    {hab}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Card Footer Action */}
        <Pressable
          style={({ pressed }) => [
            styles.cardActionBtn,
            { backgroundColor: theme.light, borderColor: theme.border },
            pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.cardActionText, { color: theme.accent }]}>
            Ver Ficha do Herói
          </Text>
          <Ionicons name="arrow-forward-circle" size={18} color={theme.accent} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
    shadowColor: '#2D1F24',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  topBanner: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'relative',
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  bannerBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  eyesWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  genderPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  genderPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  cardBody: {
    padding: 18,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 62,
    height: 62,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  nameContainer: {
    flex: 1,
  },
  heroName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2B2127',
    letterSpacing: -0.2,
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  idBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  powerSection: {
    backgroundColor: '#FAF5F0',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
  },
  powerLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  powerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  powerLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2B2127',
  },
  powerPercentage: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#EAE1D9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  abilitiesSection: {
    marginBottom: 16,
  },
  abilitiesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  abilitiesTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7E7178',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  abilitiesFullText: {
    fontSize: 14,
    color: '#3A2E34',
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  abilityChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  abilityChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 6,
  },
  cardActionText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
