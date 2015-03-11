({
    handleOpenIdea : function(cmp, event, helper) {
        var ideaId = event.getParam("currentIdeaId");
        helper.getVotes(cmp, ideaId);
    },
    submitLove : function(cmp, evt, helper) {
        var ideaId = cmp.get("v.parentIdeaId");
        helper.createVote(cmp, ideaId, 'Up');       
        $j('div.modal-header.detail').addClass("flashVote");
    }    
})