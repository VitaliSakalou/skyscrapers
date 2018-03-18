'use strict';

function controllerGame() {
   let self = this;
   let myModel = null;
   let myField = null;
   let failed = true;

   self.start = function(model, field) {
     myModel = model;
     myField = field;
     document.addEventListener("keydown", self.downKey);
     field.addEventListener("click", self.downClick);
  }

  self.downClick = function() {                //падение через клик
    if (failed){
    myModel.blockDown();
    failed = false;
  }
    return;
  }

  self.downKey = function(e) {                  //падение через клавишу
    if (failed && e.keyCode == 32){
    myModel.blockDown();
    failed = false;
  }
    return;
  }

}
