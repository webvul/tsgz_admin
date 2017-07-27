/**
 * Created by 86wh2 on 2017/7/8.
 */
const getters ={
    changeNum(state){
        return state.num++;
    },
    loginMsg(state){
        return state.loginMsg
    },
    editPackList(state){
        state.packList.map((item,key)=>{
            item.cho=true;
            if(item.groBusPackagesList)
                item.groBusPackagesList.map((item1,key1)=>{
                    item1.edit=false;
                })
        })
        return state.packList
    }
}

export default  getters;