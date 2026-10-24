import { getModel, getBrand } from 'react-native-device-info';

const brand = getBrand();
const model = getModel();

const brands = ['OPPO', 'Apple'];
const models = ['lahaina', 'iPhone 6', 'iPhone 6s'];

export const NEEDS_SMALL_TEXT = brands.includes(brand) && models.includes(model);
