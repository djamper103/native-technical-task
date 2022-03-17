import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 400;
const guidelineBaseHeight = 800;

export const dw = (size: number) => (width / guidelineBaseWidth) * size;
export const dh = (size: number) => (height / guidelineBaseHeight) * size;
