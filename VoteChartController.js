({
    maxValue : function (component, selector, dataattr) {
          var max=null;
          $j(selector).each(function() {
            var id = $j(this).data(dataattr);
            if ((max===null) || (id > max)) { max = id; }
          });
          return max;
    },
    doInit : function(component, event, helper) {

		// Hack - see asyncRender comments for ideal approach
        setTimeout(function(){
            
            var maxVote = null;
              $j('div.progress-bar').each(function() {
                var id = $j(this).data('score');
                if ((maxVote === null) || (id > maxVote)) { maxVote = id; }
              });
            
            $j('div.progress-bar').each(function() {
                var actualScore = $j(this).attr('aria-valuenow');
                var calcScore = actualScore / maxVote;
                calcScore = calcScore * 100;

                $j(this).attr('aria-valuemax', maxVote);
                $j(this).css('width', calcScore+'%').attr('aria-valuenow', actualScore);
            });
        }, 500);
        
    }
})