({
    doInit : function(component, event, helper) {
		// Future - have some nice way to deal with the HTML encoding for the stored 
		// Idea description
        var action = component.get("v.rawHTML");
        component.set("v.expenses", "we have loaded....");
    }
})