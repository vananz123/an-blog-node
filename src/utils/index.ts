import _ from 'lodash';
export const getIntoData = ({ fileds = [], object = {} }:{fileds:Array<string>;object:Object}) => {
  return _.pick(object, fileds);
};
