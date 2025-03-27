import { ViewStyle } from "react-native";

export enum EanimationType {
    Linear = 'linear',
    Bounce = 'bounce',
    Circle = 'circle',
    Ease = 'ease',
  }
  

export interface ISkeletonSkimmerProps {
  width?: number;
  height?: number;
  color?: string;
  highlightColor?: string;
  style?: ViewStyle;
  animationStyle?: ViewStyle;
  duration?: number;
  animationType?: EanimationType
}