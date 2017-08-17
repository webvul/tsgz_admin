export function transArr(arr1,arr2){
  let temp=[];
  arr1.map((item,key)=>{
       arr2.map((item2,key2)=>{
          if(item===item2.name) temp.push(item2.id);
       })
  })
  return temp;
}
