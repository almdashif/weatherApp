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
  style?: object;
  animationStyle?: object;
  duration?: number;
  animationType?: EanimationType
}