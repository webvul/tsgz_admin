/**
 * Created by 86wh2 on 2017/7/8.
 */
import {configState} from './config';
import {personInfoState} from './personalInfo';
import {sys} from './sys';
const states=Object.assign(configState,personInfoState,sys);
export default states;
