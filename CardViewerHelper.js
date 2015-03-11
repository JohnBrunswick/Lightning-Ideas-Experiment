({
    getIdeas: function(component, callback) {
        var action = component.get("c.getIdeas");
        var self = this;
        action.setCallback(this, function(a) {         
            component.set("v.ideas", a.getReturnValue());
                       
			if (a.getState() === "SUCCESS") {
				
                // This will fire if everyting from the service call comes back ok
                self.makeIsotope(component);                
            }            
            
        });
        $A.enqueueAction(action);

        var actionPhoto = component.get("c.getProfilePhoto");

		// Grab user photo when needed for posting a comment on an idea
        actionPhoto.setCallback(this, function(a) {
                    component.set("v.profilePhotoUrl", a.getReturnValue());
        });  
        
         $A.enqueueAction(actionPhoto);        
    },
    getIdea: function(component, objectid, callback) {        
        var action = component.get("c.getIdea");
        action.setParams({
          "objectId": objectid
        });
      	var self = this;
        
        action.setCallback(this, function(a) {
            component.set("v.idea", a.getReturnValue());
        });
        $A.enqueueAction(action);
                
        var action = component.get("c.getComments");
        action.setParams({
          "objectId": objectid
        });
        
        action.setCallback(this, function(a) {
            component.set("v.ideaComments", a.getReturnValue());

			// Hack - should use an aura:asyncRerender event, but the following
			// is done so this executes after the aura:iteration finishes
			// modifying the DOM after it gets data
            setTimeout(function(){
                $j(".timeago").timeago();
            }, 10);
          
        });
        $A.enqueueAction(action);        
    },
    createIdeaComment: function(component, newIdeaComment, selectedId) {
      this.upsertIdeaComment(component, newIdeaComment, selectedId, function(a) {
            var ideaComments = component.get("v.ideaComments");
            ideaComments.push(a.getReturnValue());
            component.set("v.ideaComments", ideaComments);            

          // Hack, same as setTimeout above      
          setTimeout(function(){
			$j(".timeago").timeago();
	      }, 10);
          
      });
	},
    createIdea: function(component, newIdea) {
      this.upsertIdea(component, newIdea, function(a) {
          var ideas = component.get("v.ideas");
          ideas.push(a.getReturnValue());
          component.set("v.ideas", ideas);		
          
          var self = this;
          self.makeIsotope(component);
          $j('#newidea').modal('hide');
          
      });
	},
    upsertIdeaComment : function(component, newIdeaComment, selectedId, callback) {
	
      var action = component.get("c.createIdeaComment");
      action.setParams({
          "newIdeaComment": newIdeaComment,
          "ideaId" : selectedId
      });
      if (callback) {
          action.setCallback(this, callback);
	  }

      $A.enqueueAction(action);
    },
    upsertIdea : function(component, newIdea, callback) {
      var action = component.get("c.createIdea");
      action.setParams({
          "newIdea": newIdea
      });
      if (callback) {
          action.setCallback(this, callback);
	  }
      $A.enqueueAction(action);
    },
    initHandlers: function(component) {    
        var ready = component.get("v.ready");
        if (ready === false) {
           	return;
        }
        
        $j("#openModal", ctx).on("click", function() {
            $j("#" + component.get("ideadetail"), ctx).modal(); 
        });                
    },
    makeIsotope: function(component) {
 
        var ctx = component.getElement(); 
        
        // Hack - workaround until can understand once the itterator is done on the client side with the Idea objects
        // should use aura:iteration with asyncRender Event
        setTimeout(function(){
            var container = document.querySelector('#grid-gallery');        
            var iso = new Isotope( container, {
                itemSelector: '.card',
                layoutMode: 'fitRows',
                getSortData : {
                  votescore : function( itemElem ) {
					var votescore = itemElem.querySelector('.votescore').textContent;
                    return parseFloat( votescore.replace( /[\(\)]/g, '') );
                  },
                  numcomments : function( itemElem ) {
					var numcomments = itemElem.querySelector('.numcomments').textContent;
                    return parseFloat( numcomments.replace( /[\(\)]/g, '') );
                  },
                    freshdate : function(itemElem) {
                        var freshdate = itemElem.querySelector('.freshdate').textContent;
                        return Date.parse(freshdate);
                    },
                    votetotal : function(itemElem) {
                        var votetotal = itemElem.querySelector('.votetotal').textContent;
                        return parseFloat( votetotal.replace( /[\(\)]/g, '') );
                    }
                }                
            });
            
            component.set("v.objIsotope", iso);
       		$j(".timeago").timeago();
            
        }, 10);

    }
})