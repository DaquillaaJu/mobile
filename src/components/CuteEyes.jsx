import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CuteEyes({ size = 28, lookDirection = 'center', color = '#FFFFFF', pupilColor = '#1F1A24', hasSmile = false, hasEyelashes = false }) {
  const eyeSize = size;
  const pupilSize = size * 0.52;
  const reflectionSize = size * 0.2;

  // Pupil offsets based on lookDirection
  let pupilOffset = { x: 0, y: 0 };
  if (lookDirection === 'right') pupilOffset = { x: eyeSize * 0.15, y: 0 };
  if (lookDirection === 'left') pupilOffset = { x: -eyeSize * 0.15, y: 0 };
  if (lookDirection === 'up') pupilOffset = { x: 0, y: -eyeSize * 0.12 };

  return (
    <View style={styles.container}>
      <View style={styles.eyesRow}>
        {/* Left Eye */}
        <View
          style={[
            styles.eye,
            {
              width: eyeSize,
              height: eyeSize,
              borderRadius: eyeSize / 2,
              backgroundColor: color,
            },
          ]}
        >
          {hasEyelashes && (
            <View style={styles.eyelashesContainer}>
              <View style={[styles.eyelash, { transform: [{ rotate: '-25deg' }] }]} />
              <View style={[styles.eyelash, { height: 5 }]} />
              <View style={[styles.eyelash, { transform: [{ rotate: '25deg' }] }]} />
            </View>
          )}
          <View
            style={[
              styles.pupil,
              {
                width: pupilSize,
                height: pupilSize,
                borderRadius: pupilSize / 2,
                backgroundColor: pupilColor,
                transform: [
                  { translateX: pupilOffset.x },
                  { translateY: pupilOffset.y },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.reflection,
                {
                  width: reflectionSize,
                  height: reflectionSize,
                  borderRadius: reflectionSize / 2,
                },
              ]}
            />
          </View>
        </View>

        {/* Right Eye */}
        <View
          style={[
            styles.eye,
            {
              width: eyeSize,
              height: eyeSize,
              borderRadius: eyeSize / 2,
              backgroundColor: color,
            },
          ]}
        >
          {hasEyelashes && (
            <View style={styles.eyelashesContainer}>
              <View style={[styles.eyelash, { transform: [{ rotate: '-25deg' }] }]} />
              <View style={[styles.eyelash, { height: 5 }]} />
              <View style={[styles.eyelash, { transform: [{ rotate: '25deg' }] }]} />
            </View>
          )}
          <View
            style={[
              styles.pupil,
              {
                width: pupilSize,
                height: pupilSize,
                borderRadius: pupilSize / 2,
                backgroundColor: pupilColor,
                transform: [
                  { translateX: pupilOffset.x },
                  { translateY: pupilOffset.y },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.reflection,
                {
                  width: reflectionSize,
                  height: reflectionSize,
                  borderRadius: reflectionSize / 2,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {hasSmile && (
        <View style={styles.smileWrapper}>
          <View style={styles.smile} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  pupil: {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 2,
  },
  reflection: {
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    marginLeft: 1,
  },
  eyelashesContainer: {
    position: 'absolute',
    top: -4,
    flexDirection: 'row',
    gap: 2,
  },
  eyelash: {
    width: 1.5,
    height: 4,
    backgroundColor: '#1F1A24',
    borderRadius: 1,
  },
  smileWrapper: {
    marginTop: 2,
    alignItems: 'center',
  },
  smile: {
    width: 10,
    height: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1F1A24',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
