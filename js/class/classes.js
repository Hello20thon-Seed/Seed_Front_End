class Table{
    constructor(data){
        this.id = data._id;
        this.contents = data.contents;
        this.level = data.level;
        this.parent = data.parent;
        this.done = data.isDone;
        this.ownwer = data.ownwer;
        this.originID = data.originid;
    };

    getGoal(){
        let goal = []
        $.ajax({
            url: url+"/goal/"+this.id,
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

        if(goal[1] == null) goal[1] = 0
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