export function moveTreeNode(zTree1, zTree2){
    var nodes = zTree1.getCheckedNodes();	//获取选中需要移动的数据
    for(var i=0;i<nodes.length;i++){			//把选中的数据从根开始一条一条往右添加
        var node = nodes[i];

        var strs={};			//新建一个JSON 格式数据,表示为一个节点,可以是根也可以是叶
        strs.id =node.id;
        strs.name=node.name;
        strs.pId= node.pId;
        strs.nodes = new Array();	//树节点里面有个 nodes 集合,用来存储父子之间的包涵关系

        //调用添加方法
        //strs : json 格式..拼装成树的一个节点
        //zTree2: 表示需要添加节点的树
        zTreeDataAddNode(strs,zTree2);

        //获取这个被添加的code 如果是右增加  用来把它从左边移除掉
        //var scode = strs.code;
        //		scode = scode.substring(0, scode.lastIndexOf("-"));

        //使用递归移除 移除的时候从叶子开始找  和增加的时候刚好相反
        //参数1就是数组最后一个数据
        //scode  : 上面截取的code 表示父亲节点
        //zTree1 : 需要移除的树,在zTree1 里面移除此对象
        //zTreeDataDelete(nodes[nodes.length-(i+1)],strs.pId,zTree1);
    }
    //把选中状态改为未选择
    zTree2.checkAllNodes(false);
    zTree1.checkAllNodes(false);

    //刷新
    zTree2.refresh();
    zTree1.refresh();
}
//清空右边选中的
export function removzTree(zTree2, zTree1){
    var nodes = zTree2.getCheckedNodes();	//获取选中需要移动的数据
    for(var i=0;i<nodes.length;i++){			//把选中的数据从根开始一条一条往右添加
        var node = nodes[i];

        var strs={};			//新建一个JSON 格式数据,表示为一个节点,可以是根也可以是叶
        strs.id =node.id;
        strs.name=node.name;
        strs.pId= node.pId;
        strs.nodes = new Array();	//树节点里面有个 nodes 集合,用来存储父子之间的包涵关系



        //使用递归移除 移除的时候从叶子开始找  和增加的时候刚好相反
        //参数1就是数组最后一个数据
        //scode  : 上面截取的code 表示父亲节点
        //zTree1 : 需要移除的树,在zTree1 里面移除此对象
        zTreeDataDelete(nodes[nodes.length-(i+1)],strs.pId,zTree2);
    }
    //把选中状态改为未选择
    zTree2.checkAllNodes(false);
    zTree1.checkAllNodes(false);

    //刷新
    zTree2.refresh();
    zTree1.refresh();
}
//树数据移动方法
function zTreeDataAddNode(strs,zTree2){
    var nodes = zTree2.transformToArray(zTree2.getNodes());	//获取需要添加数据的树下面所有节点数据
    //如果有多个数据需要遍历,找到strs 属于那个父亲节点下面的元素.然后把自己添加进去
    if(nodes.length > 0){

        //这个循环判断是否已经存在,true表示不存在可以添加,false存在不能添加
        var isadd=true;
        for(var j=0;j<nodes.length;j++){
            if(strs.id==nodes[j].id){
                isadd=false;
                break;
            }
        }

        //找到父亲节点
        //var scode = strs.code;
        //scode = scode.substring(0, scode.lastIndexOf("-"));
        var i=0;
        var flag =false;
        var Pnode ;
        for(i ;i<nodes.length;i++){
            if(strs.pId ==nodes[i].id){
                Pnode = nodes[i] ;
                flag = true;
                break;
            }
        }
        //同时满足两个条件就加进去,就是加到父亲节点下面去
        if(flag && isadd){
            var treeNode1=nodes[i];
            //treeNode1.nodes[treeNode1.nodes.length <=0 ? 0 : treeNode1.nodes.length++]=strs;
            //treeNode1==strs;
            zTree2.addNodes(Pnode, {id:strs.id, pId:strs.pId, name:strs.name});
            //zTree2.expandAll(false);//默认添加不展开
            //如果zTree2 里面找不到,也找不到父亲节点.就把自己作为一个根add进去
        }else if(isadd){
            zTree2.addNodes(null,strs);
            //zTree2.expandAll(false);//默认添加不展开
        }
    }else{
        //树没任何数据时,第一个被加进来的元素
        zTree2.addNodes(null,strs);
        //zTree2.expandAll(false);//默认添加不展开
    }
}

//数据移除
function zTreeDataDelete(node,pId,zTree1){
    if(node.isParent){	//判断是不是一个根节点,如果是一个根几点从叶子开始遍历寻找
        var nodes = zTree1.getSelectedNodes();
        if (nodes && nodes.length>0) {
            zTree1.removeChildNodes(nodes[0]);
        }

    }else{
        //不是就直接移除
        zTree1.removeNode(node);
    }
}