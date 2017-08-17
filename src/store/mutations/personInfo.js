let personInfoFunction={
  //控制sidebar开启和关闭
  toggleSidebar:(state)=>{
    state.sidebar.opened=!state.sidebar.opened;
  },
  //设置当前高亮的路由
  setCurrentRoute:(state,path)=>{
    state.headerCurRouter=path[0].path;
  },
  //控制用户修改密码的安全等级
  safelyLevel:(state,level)=>{
    state.level =level;
  },
  //获取所有用户的信息列表
  user:(state,data)=>{
    state.userList=data.user;
  },
  //获取用户的登录信息
  userLoginMsg:(state,data)=>{
    console.log(data);
    state.user_msg=data;
  },
  //用户修改登录信息
  editUserINfo:(state,userinfo)=>{
    state.loginMsg=Object.assign({},userinfo)
  },
  //包管理列表
  handlePackList:(state,pack)=>{
    pack.map((item,key)=>{
      item.editAble= false;
      if(key===0) item.cho=true;
      else item.cho=false;
      if(item.groBusPackagesList)
        item.groBusPackagesList.map((item1,key1)=>{
          item1.edit=false;
          item1.editAble= false;
        })
    })
    state.packList=pack;
  },
  //商品管理列表
  handleGoodsList:(state,goods)=>{
    let temp_arr=[];
    goods.map((item,key)=>{
      if(item.parentId==1){
        temp_arr.push(item)
      }
    });
    function translate(old_arr,temp_i){
      temp_i.child=[];
      old_arr.map((item,key)=>{
        if(item.parentId== temp_i.id){
          temp_i.child.push(item)
        }
      })
      if(!temp_i.child.length){return true}
      else{
        temp_i.child.map((item_arr)=>{
          translate(old_arr,item_arr)
        })
      }
    }
    temp_arr.map((item)=>{
      translate(goods,item)
    })
    console.log(temp_arr);
    state.goodsList=temp_arr
  },
  getBusinessTableList:(state,list)=>{
    state.BusinessTableList=list;
  },
  getFormList:(state,list)=>{
    state.formList=list;
  },
  submitFormList:(state,msg)=>{
    state.addFormListMsg=msg;
  },
  AddFormList:(state,msg)=>{
    let trans =(obj,key)=>{
      if(obj[key]==='1'){
        obj[key]=true;
      }
      if(obj[key]==='0'){
        obj[key]=false;
      }
    }
    msg.genTable.columnList.map(function(item,key){
      for(let i in item){trans(item,i)};
    })
    if(!msg.genTable.parentTable) msg.genTable.parentTable='';
    if(!msg.genTable.parentTableFk) msg.genTable.parentTableFk='';
    state.addFormList=msg;
  },
  deleFormListMsg:(state)=>{
    state.addFormListMsg='';
  },
  //保存添加业务包信息
  addChooseTableList:(state,data)=>{
    state.chooseTableList=data
  },
  removeChooseTableList:(state)=>{
    state.chooseTableList={
      name:'',
      id:'',
      list:[]
    }
  }
}

export {personInfoFunction}
