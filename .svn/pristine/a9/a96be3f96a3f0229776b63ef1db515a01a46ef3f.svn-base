/**
 * Created by 86wh2 on 2017/7/23.
 */
let emptyLevel =function(rule,callback,commit){
    if(rule===0){
        callback(new Error('新密码不能为空!'));
    }else{
        return 'next'
    }
}
let lowLevel =function(rule,callback,commit){
    if(rule<6){
        commit('safelyLevel',1);
        callback(new Error('密码太弱，有盗号风险，请重新输入!'));
    }else{
        return 'next'
    }
}
let middleLevel =function(rule,callback,commit){
    if(rule<9){
        commit('safelyLevel',2);
        callback(new Error('安全等级一般!'));

    }else{
        return 'next'
    }
}
let highLevel =function(rule,callback,commit){
    callback(new Error('安全等级较高!'));
        commit('safelyLevel',3);
}
let Check=function(fn){
    this.fn =fn;
    this.successor =null
};
Check.prototype.setNextSuccessor=function (successor){
    this.successor =successor
};
Check.prototype.passRequest =function(){
    let ret =this.fn.apply(this,arguments);
    if(ret =='next') return this.successor&&this.successor.passRequest.apply(this.successor,arguments);
    return ret;
}
let empty =new Check(emptyLevel);
let low = new Check(lowLevel);
let middle = new Check(middleLevel);
let high = new Check(highLevel);
empty.setNextSuccessor(low);
low.setNextSuccessor(middle);
middle.setNextSuccessor(high);

export default {
    init(rule,callback,commit){
        empty.passRequest(rule.length,callback,commit);
    }

}
