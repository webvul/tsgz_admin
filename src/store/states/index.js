/**
 * Created by 86wh2 on 2017/7/8.
 */
import {configState} from './config';
import {personInfoState} from './personalInfo';
const states=Object.assign(configState,personInfoState);
export default states;
