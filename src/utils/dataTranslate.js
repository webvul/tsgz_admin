/**
 * Created by Administrator on 2017/8/10 0010.
 */
import Vue from 'vue'
function DataTransfer (data) {
  if (!(this instanceof DataTransfer)) {
    return new DataTransfer(data, null, null)
  }
}

DataTransfer.treeToArray = function (data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      let children = DataTransfer.treeToArray(record.children, record, _level, expandedAll)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
DataTransfer.getIndex = function(data){
  let _index;
  try{
    Array.from(data).forEach(function (record,key) {
      if (record.children && record.children.length > 0) {
        _index=key;
        forEach.break=new Error("StopIteration");
      }
    })
  }catch(e) {
    if(e.message==="StopIteration") {
      return;
    }
  }
   return _index;
}
DataTransfer.setData = function (data, parent, level, expandedAll) {
  let tmp=[];
  let index =DataTransfer.getIndex(data);
  console.log(index);
  Array.from(data).forEach(function (record,key) {
    if(index===key||!index) Vue.set(record, '_expanded', true);
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level);
    if (record.children && record.children.length > 0) {
      DataTransfer.setData(record.children, record, _level,false)
    }
  })
  return data;
}

export default DataTransfer
