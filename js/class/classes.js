class Table{
    constructor(){
        this.id;
        this.contents;
        this.level;
        this.parent;
        this.isdone;
        this.owner;
        this.originId;
    }

    setTable(data){
        //console.log("classes.js::setTable() - data : ")
        //console.log(data)
        this.id = data._id;
        this.contents = data.contents;
        this.level = data.level;
        this.parent = data.parent;
        this.isDone = data.isDone;
        this.owner = data.owner;
        this.originId = data.originId;

        if(data.isDone){
            var goalBlock = document.querySelectorAll(`#id${this.id} .title`);
            goalBlock[0].style.backgroundColor = "#f39c12";
			goalBlock[1].style.backgroundColor = "#f39c12";
        }
    };

    getOriginTable(){
        //console.log("classes.js::getOriginTable() - data12 : ")
        //console.log(this)
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
                    //console.log("classes.js::getOriginTable() - data : ");
                    //console.log(data.data)
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
                    //console.log("classes.js::getGoal() - data : ");
                    //console.log(data.data)
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

    getUserTables(where){
        for(let i=0; i<this.goal.length; i++){
            tables[i] = new TableList(this.goal[i]);
            if(where == "main") tables[i].createTableBox();
            if(where == "side"){
                tables[i].createTitleList()
                tables[i].createPeopleList()
            }
        }
        if(where == "main") createPlusBtn();
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