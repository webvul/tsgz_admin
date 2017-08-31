/**
 * Created by Administrator on 2017/8/17 0017.
 */
import components from '@/router/routesLazy';
function transRouter(addRouter){
  let temp_router=[];
  addRouter.map((item,key)=>{
    if(item.parentId==='1'){
      temp_router.push({
        id:item.id,
        path: item.href,
        redirect: item.redirect,
        component: components[item.component],
        name:item.name,
        iconCls: item.icon,//图标样式class
        children:item.children,
        rank:1
      })
    }
  });
  temp_router.map((tem,key)=>{
    translate(addRouter,tem)
  });
  function translate(old_arr,temp_i){
    let temp_rank=temp_i.rank;
    old_arr.map((item1,key1)=>{
      if(item1.parentId== temp_i.id){
        item1.rank=temp_rank+1;
        temp_i.children.push({
          id:item1.id,
          path: item1.href,
          component: components[item1.component],
          name:item1.name,
          iconCls: item1.icon,//图标样式class
          children:item1.children,
          rank:temp_rank+1
        })
      }
    })
    if(!temp_i.children.length){return true}
    else{
      temp_i.children.map((item_arr)=>{
        translate(old_arr,item_arr)
      })
    }
  }
  return temp_router;
}
let sys={
  setScrollBarState(state,sta){
    state.scrollBarState=sta;
  },
  //获取路由
  menu_router(state,_this){
    sessionStorage.setItem('menu_router', JSON.stringify(_this.ac_data.sourcelist));
    let new_router=transRouter(_this.ac_data.sourcelist);
    _this.$router.options.routes=Object.assign({},new_router);
     if(!state.menu_list_router_allow){
       _this.$router.addRoutes(new_router);
       state.menu_list_router_allow=true;
     }
    sessionStorage.setItem('Token', JSON.stringify(_this.ac_data.token));
    _this.$router.push({path: '/home'});
  }
}

export {sys}
