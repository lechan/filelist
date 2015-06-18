/**
 *Main.js
 *@author: Yorhom
 *http://blog.csdn.net/yorhomwang
*/
function Main(){
	var s = this;
	base(s,LSprite,[]);

	/**设置场景大小*/
	s.sceneWidth = 8500;
	s.sceneHeight = LStage.height+1000;
}
Main.prototype.init = function(){
	var s = this;

	/**加入边框*/
	s.addBorder();
	/**加入路面*/
	s.addRoad();
	/**加入自行车*/
	s.addBicycle();
	/**加入循环事件*/
	s.addEventListener(LEvent.ENTER_FRAME,s.loop);
};
Main.prototype.addBorder = function(){
	var s = this;

	/**创建边框*/
	//设置边框尺寸
	var borderSize = 10;
	//顶部边框
	var topBorder = new LSprite();
	topBorder.x = s.sceneWidth/2;
	topBorder.y = 5;
	topBorder.addBodyPolygon(s.sceneWidth,borderSize,0);
	s.addChild(topBorder);
	//右部边框
	var rightBorder = new LSprite();
	rightBorder.x = s.sceneWidth-5;
	rightBorder.y = s.sceneHeight/2;
	rightBorder.addBodyPolygon(borderSize,s.sceneHeight,0);
	s.addChild(rightBorder);
	//底部边框
	var bottomBorder = new LSprite();
	bottomBorder.name = "wall";
	bottomBorder.x = s.sceneWidth/2;
	bottomBorder.y = s.sceneHeight-5;
	bottomBorder.addBodyPolygon(s.sceneWidth,borderSize,0);
	s.addChild(bottomBorder);
	//左部边框
	var leftBorder = new LSprite();
	leftBorder.x = 5;
	leftBorder.y = s.sceneHeight/2;
	leftBorder.addBodyPolygon(borderSize,s.sceneHeight,0);
	s.addChild(leftBorder);
};
Main.prototype.addRoad = function(){
	var s = this;

	/**创建路面*/
	var roadObj = new Road(0,450);
	s.addChild(roadObj);
};
Main.prototype.addBicycle = function(){
	var s = this;

	//创建自行车对象
	s.bicycleObj = new Bicycle(50,385);
	s.addChild(s.bicycleObj);
};
Main.prototype.loop = function(event){
	var s = event.target;
	var bo = s.bicycleObj.mainBody.GetUserData();
	/**设置场景位置*/
	s.x = LStage.width*0.5 - (bo.x + bo.getWidth()*0.5);
	s.y = LStage.height*0.5 - (bo.y + bo.getHeight()*0.5);
	/**处理位置*/
	if(s.x > 0){
		s.x = 0;
	}else if(s.x < LStage.width - s.sceneWidth){
		s.x = LStage.width - s.sceneWidth;
	}
	if(s.y > 0){
		s.y = 0;
	}else if(s.y < LStage.height - s.sceneHeight){
		s.y = LStage.height - s.sceneHeight;
	}
	//计算刚体坐标
	LStage.box2d.synchronous();
};