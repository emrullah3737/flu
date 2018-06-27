import * as development from '../config/development';
import * as production from '../config/production';
const { NODE_ENV, PUBLİC_URL } = process.env;

export default NODE_ENV === 'production' ? production : development;
