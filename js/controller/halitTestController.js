var HalitTestController = function(view,model,day)
{
    view.cancelButton.click(function(){
        model.deleteDay(day);
    });
}