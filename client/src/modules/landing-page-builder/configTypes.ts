import { StyleName, Size, AnimationType } from './types/component.types';

export interface ShapeConfig {
  id: string;
  componentType: 'rectangle' | 'circle' | 'square' | 'triangle' | 'downArrow';
  content: string;
  styleName: StyleName;
  size: Size;
  positioning: 'center' | 'left' | 'right';
  animation: AnimationType;
}

export interface RowConfig {
  id: string;
  components: ShapeConfig[]; // 1-6 shapes or a single text config
}

export interface PageConfig {
  rows: RowConfig[];
} 