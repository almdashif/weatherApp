import React, { useEffect, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { EanimationType, ISkeletonSkimmerProps } from '../types/skimmerTypes';


const SkeletonSkimmer: React.FC<ISkeletonSkimmerProps> = ({ width = 300, height = 30, color = '#E0E0E0', highlightColor = '#F7F7F7', style = {}, animationStyle = {}, duration = 2000, animationType = EanimationType.Linear }) => {
  const [skimmerPosition] = useState(new Animated.Value(-width));

  useEffect(() => {
    const skimmerAnimation = Animated.loop(
      Animated.timing(skimmerPosition, {
        toValue: width * 2,
        duration: duration,
        easing: Easing[animationType],
        useNativeDriver: true,
      })
    );
    skimmerAnimation.start();

    return () => {
      skimmerAnimation.stop();
    };
  }, [skimmerPosition, width]);

  return (
    <View style={[{
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative', width, height, backgroundColor: color
    }, style]}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            opacity: 0.3,
            width: width * 1.5,
            height,
            backgroundColor: highlightColor,
            transform: [{ translateX: skimmerPosition }],
          },
          animationStyle
        ]}
      />
    </View>
  );
};
export default SkeletonSkimmer
