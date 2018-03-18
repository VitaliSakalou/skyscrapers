  'use strict';
  function viewBlock() {
      let self = this;
      self.idLastBlock = 100;
      let typeOfPicture = Math.round(Math.random());
      self.startingPointDown = 0;                                            //точка отчета при перемещении вниз
      self.distanceBlockVertical = null;


      const NSStandart = "http://www.w3.org/2000/svg";
      let myModel = null;
      let myField = null;
      let myGame = null;
      let myCable = null;

     self.start = function(model, field, game, cable) {
       myModel = model;
       myField = field;
       myGame = game;
       myCable = cable;
       self.height = myModel.height;


       if (myGame.countOfBlocks.value() > 1 && myGame.countOfBlocks.value() < self.idLastBlock){
       self.blockWindow = document.createElementNS(NSStandart,'rect')
       self.blockWindow.setAttribute('fill', '#878e91');
       self.blockWindow.setAttribute('opacity', 0);
       self.blockWindow.setAttribute('width', 68);
       self.blockWindow.setAttribute('height', 68);
       self.blockWindow.setAttribute('x', myCable.posX2+1);
       self.blockWindow.setAttribute('y', myCable.posY2+1);
       myField.appendChild(self.blockWindow);
     }

       self.block = document.createElementNS(NSStandart, 'image');
       if (myGame.countOfBlocks.value() == 1){
         self.block.setAttributeNS("http://www.w3.org/1999/xlink","href","img/basementBlock.png");
       }
       else if (myGame.countOfBlocks.value() == self.idLastBlock){
         self.block.setAttributeNS("http://www.w3.org/1999/xlink","href","img/topBlock.png");
       }
       else {
         self.block.setAttributeNS("http://www.w3.org/1999/xlink","href","img/middleBlock"+typeOfPicture+".png");
       }
       self.block.setAttribute('opacity', 0);
       self.block.setAttribute('x', myCable.posX2);
       self.block.setAttribute('y', myCable.posY2);
       myField.appendChild(self.block);
    }

      self.update = function(){
        self.block.setAttribute('x', myModel.posX - myModel.width/2);
        self.block.setAttribute('y', myModel.posY);
        self.block.setAttribute('transform', "rotate("+myModel.rotate+","+myModel.rotatePosX+","+myModel.rotatePosY+")");
        self.block.setAttribute('width', myModel.width);
        self.block.setAttribute('height', myModel.height);
        self.block.setAttribute('class', myModel.class);
         self.class = myModel.class;
         self.pY = myModel.posY;
        self.block.setAttribute('opacity', 1);
        if (self.blockWindow){
          self.blockWindow.setAttribute('x', (myModel.posX - myModel.width/2)+1);
          self.blockWindow.setAttribute('y', myModel.posY+1);
          self.blockWindow.setAttribute('transform', "rotate("+myModel.rotate+","+myModel.rotatePosX+","+myModel.rotatePosY+")");
          self.blockWindow.setAttribute('class', myModel.class);
          self.blockWindow.setAttribute('opacity', 1);;
        }
     }

     self.updateId = function() {                                                     //функция прсваивания ID блокам
       self.block.setAttribute('id', myModel.id);
     }

     self.lightWindow = function() {                                                      //функция "зажечь окна"
       self.blockWindow.setAttribute('fill', '#fdf870');
     }

      self.x = function() {                                                                 //функция перемещения блоков по горизонтали
        self.block.setAttribute('x', myGame.posX2+myModel.posXForBuilding);
        if (self.blockWindow){
        self.blockWindow.setAttribute('x', myGame.posX2+myModel.posXForBuilding+1);
      }
    }

      self.y = function() {
         self.startingPointDown+=1.6;                          //увеличение стартовой точки на 1.6px
         let y = parseFloat(self.block.getAttribute("y"));
         self.block.setAttribute('y', y+1.6);                    //увеличение Y на 1.6px;
         if (self.blockWindow){
            self.blockWindow.setAttribute('y', y+1.6);
         }
         if( self.startingPointDown>=self.distanceBlockVertical){
            self.distanceBlockVertical = '';
            self.startingPointDown = 0;
         }
       }

      self.delete = function() {                                                            //удаляем блок
        self.block.remove();
        if (self.blockWindow){
        self.blockWindow.remove();
      }
      }

      self.snaggedBlock = function() {                                                 //функция вращения блока вокруг своей оси
        self.block.style.transformOrigin = ''+(myModel.currentBlock.getBBox().x+myModel.width/2)+'px '+(myModel.currentBlock.getBBox().y+myModel.height/2)+'px';  //в px кроссбраузерно
        self.block.style.transform='rotate('+myModel.r+'deg)';
        if (self.blockWindow){
          self.blockWindow.style.transformOrigin = ''+(myModel.currentBlock.getBBox().x+myModel.width/2)+'px '+(myModel.currentBlock.getBBox().y+myModel.height/2)+'px'; //в px кроссбраузерно
          self.blockWindow.style.transform='rotate('+myModel.r+'deg)';
      }
      }

}
