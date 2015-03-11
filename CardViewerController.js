({  
    initScripts: function(component, event, helper) {
        // The objs parameter from the event contains objects returned in the requirejs callback
      	var objs = event.getParams().objs;
        
        // Use $j rather than $ to avoid jQuery conflicts
        if (typeof jQuery !== "undefined" && typeof $j === "undefined") {
            $j = jQuery.noConflict(true);
        }
        
        // hack to update CSS for page background color when being used in S1
        $j('.oneContent').attr("style", "background: #fff");
        
        helper.getIdeas(component);
        
        // Cute UI effects for top tab navigation that does the filtering
        var classname = document.getElementsByClassName("tabitem");    
        var clickFunction = function(e) {
            var a = this.getElementsByTagName("a")[0];
            var span = this.getElementsByTagName("span")[0];

            for(var i=0;i<classname.length;i++){
                classname[i].className =  classname[i].className.replace(/(?:^|\s)active(?!\S)/g, '');
            }
			                        
            this.className += " active";
            span.className += 'active';
            var left = a.getBoundingClientRect().left;
            var top = a.getBoundingClientRect().top;
            var consx = (e.clientX - left);
            var consy = (e.clientY - top);
            span.style.top = consy+"px";
            span.style.left = consx+"px";
            span.className = 'clicked';
            span.addEventListener('webkitAnimationEnd', function(event){
                this.className = '';
            }, false);  
        };
    
        for(var i=0;i<classname.length;i++){
            classname[i].addEventListener('click', clickFunction, false);
            classname[i].addEventListener('touchstart', clickFunction, false);            
        }        
        
        
        // Big hack to keep the Create Idea button in the lower right in S1, as fixed position CSS will not work
		setInterval(function(){

            // Height of DIV
            var gridHeight = $j("#grid-gallery").outerHeight();
        
            // Height from top of DIV
            var gridGapAbs = Math.abs($j("#grid-gallery").offset().top);
            var gridGapReal = $j("#grid-gallery").offset().top;
    
    		var salesforce1 = 0;
    
            // If in Sf1
            if( $j('div.pullToRefresh').length > 0 ) {
				salesforce1 = -10;
            }
            else {
                salesforce1 = -50;
            }
    
    		var gridGap = '';
            if (gridGapReal > 0)
            {
                gridGap = -108 - salesforce1;
            }
    		else
            {
                gridGap = gridGapAbs - salesforce1;
            }
        
            var viewportHeight = $j(window).height();
            var distanceToTop = $j(window).scrollTop();       
            var bottomPosition = gridGap + distanceToTop + viewportHeight - 10;

            $j('#createidea').css("top", bottomPosition);    
	    },1000);        

        $j('#ideadetail').on('hidden.bs.modal', function (e) {
	          component.set("v.newIdeaComment.CommentBody", "");
        })
        
        
    },
    getFilterTop : function(cmp, evt) {
        var iso = cmp.get("v.objIsotope");        
        iso.arrange({ sortBy: 'votescore', sortAscending : false });
   },  
    getFilterVoteTotal : function(cmp, evt) {
        var iso = cmp.get("v.objIsotope");
        iso.arrange({ sortBy: 'votetotal', sortAscending : false });     	  
    },
    getFilterOriginal : function(cmp, evt) {
        var iso = cmp.get("v.objIsotope");
        iso.arrange({ sortBy: 'original-order'});
   },
    getFilterFresh : function(cmp, evt) {
        var iso = cmp.get("v.objIsotope");       
        iso.arrange({ sortBy: 'freshdate', sortAscending : false });
   },
    getFilterComments : function(cmp, evt) {        
        var iso = cmp.get("v.objIsotope");
        iso.arrange({ sortBy: 'numcomments', sortAscending : false });
   },
    getFilterAll : function(cmp, evt) {
        var iso = cmp.get("v.objIsotope");
        iso.arrange({ filter: '*'});
   },    
    postIdea : function(component, event, helper)
    {
        var newIdea = component.get("v.newIdea");
        helper.createIdea(component, newIdea);  
    },
    postIdeaComment : function(component, event, helper)
    {
        var newIdeaComment = component.get("v.newIdeaComment");
        var selectedItem = event.currentTarget;
        var selectedId = selectedItem.dataset.ideaid;
        
        helper.createIdeaComment(component, newIdeaComment, selectedId);

		// Reset the form UI        
		component.set("v.newIdeaComment.CommentBody", "");
    },    
    
  openIdeaDetail : function(component, event, helper) 
  {
    	var idea = component.get("v.idea");
      var selectedItem = event.currentTarget;
      var selectedId = selectedItem.dataset.ideaid;

      var evt = $A.get("e.jmb:OpenIdea");
       evt.setParams({
        "currentIdeaId": selectedId
       });
       evt.fire();

      helper.getIdea(component, selectedId);    

      $j('#ideadetail').modal('show');
  },
     changeField : function(component, evt, helper){
         // Thanks for the tip from https://developer.salesforce.com/forums/?id=906F0000000ArG9IAK
         // Enrecco - https://developer.salesforce.com/forums/ForumsProfile?communityId=09aF00000004HMG&userId=005F0000003FkoS&showHeader=false

         //gets the html element from the change event
          var textarea = evt.srcElement;
          //sets a "textareaValue" attribute of the general component
          $A.run(function(){
              component.set('v.newIdea.Body',textarea.value);
          });
     },
})