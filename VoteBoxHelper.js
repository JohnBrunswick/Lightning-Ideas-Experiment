({
    getVotes: function(component, selectedId)
    {
        var action = component.get("c.getIdeaVotes");
        var self = this;
        
        action.setParams({
            "parentId": selectedId
        });
        
        action.setCallback(this, function(a) {         
            component.set("v.ideaVotes", a.getReturnValue());
        });
        $A.enqueueAction(action);      	  
    },
    createVote: function(component, selectedId, voteType) {
        this.upsertVote(component, selectedId, voteType, function(a) {
            var actionRecount = component.get("c.getIdeaVotes");
            
            actionRecount.setParams({
                "parentId": selectedId
            });
            
            actionRecount.setCallback(this, function(a) {         
                component.set("v.ideaVotes", a.getReturnValue());
            });
            $A.enqueueAction(actionRecount);           
        });
    },
    upsertVote : function(component, selectedId, voteType, callback) {    
        var action = component.get("c.createVote");
        
        action.setParams({
            "parentId": selectedId,
            "voteType" : voteType
        });
        
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);    
    }
    
})