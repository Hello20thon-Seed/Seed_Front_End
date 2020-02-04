class Table{
    constructor(){
        this.id;
        this.contents;
        this.level;
        this.parent;
        this.done;
        this.ownwer;
        this.originID;
    }
    setTable(data){
        this.id = data._id;
        this.contents = data.contents;
        this.level = data.level;
        this.parent = data.parent;
        this.done = data.isDone;
        this.ownwer = data.ownwer;
        this.originId = data.originid;
    };

    getOriginTable(){
        let goal = []
        $.ajax({
            url: url+"/goal/"+this.originId,
            type:"GET",
            async:false,
            success:function(data){
                if(data.code != '0'){
                    console.log("classes.js::getOriginTable() - Error : " + data.code)
                    goal = [false, data.code]
                }
                else{
                    console.log("classes.js::getOriginTable() - data : ");
                    console.log(data.data)
                    goal = [true, data.data]
                }
            },
            error: function(a,b,error){
                console.log("classes.js::getOriginTable() - Error : " + error);
                goal = [false, error]
            }
            
        });

        if(goal[1] == null);
        this.originTable = new Table().setTable(goal[1])
        return goal[1]
    }

    updateGoal(){
        let goal = []
        $.ajax({
            url: url+"/fork/"+this.id,
            type:"GET",
            async:false,
            success:function(data){
                if(data.code != '0'){
                    console.log("classes.js::getGoal() - Error : " + data.code)
                    goal = [false, data.code]
                }
                else{
                    console.log("classes.js::getGoal() - data : ");
                    console.log(data.data)
                    goal = [true, data.data]
                }
            },
            error: function(a,b,error){
                console.log("classes.js::getGoal() - Error : " + error);
                goal = [false, error]
            }
            
        });

        if(goal[1] == null);
        this.setTable(goal[1])
        return goal[1]
    }
}

class User{
    constructor(data){
        this.email = data.email;
        this.nickname = data.nickname;
        this.profile = data.profile;
        this.goal = data.goal;
    };

    

}

class Goal{
    constructor(data){
        this.id = data._id;
        this.contents = data.contents;
        this.level = data.level;
        this.parent = data.parent;
        this.members = data.members;
    };
}