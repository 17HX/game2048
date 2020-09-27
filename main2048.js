//存放游戏数据   4*4的格子以数组形式出现
var board=new Array();
var score=0;//分数


//函数
$(document).ready(function(){
	newgame();
});

function newgame(){
	//初始化棋盘格
	init();
	//随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}


//对每一个格子编号，并设置每一个格子的位置
function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){

			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}

//初始化board的值
////初始化每一个board的值
	for( var i=0;i<4;i++){
		board[i]=new Array();
		for(var j=0;j<4;j++)
			board[i][j]=0;
}


//对number-cell的显示值进行设定
updateBoardView();
}

function updateBoardView(){

	//删除掉number-cell的值
	$(".number-cell").remove();
	for(var i = 0;i<4;i++)
		for(var j=0;j<4;j++){

			//对board里的每一个元素设置一个number-cell
			//使用jquery的append方法设置div
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			

			//设置一个变量theNumberCell来操作
			var theNumberCell=$('#number-cell-'+i+'-'+j);

				if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+50);//放在grid-cell中间
				theNumberCell.css('left',getPosLeft(i,j)+50);

			}
			else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//数字不同颜色不同
				theNumberCell.css('color',getNumberColor(board[i][j]));//文字前景色
				theNumberCell.text(board[i][j]);
			}
		}

}

//随机生成数字
function generateOneNumber(){

	//判断有没有空间可以生成新的数字
	if (nospace(board)) 
		return false;
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));

	//判断board是不是0，为0则跳出这个循环，不为0就继续生成随机位置
	while(true){
		if(board[randx][randy]==0)
			break;

		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
	}

	//随机生成一个2或者4
	var randNumber=Math.random()<0.5?2:4;


	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);

	
		return true;
	
}


$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left

		//判断能否向左移动
			if(moveLeft()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
			if(moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://right
			if (moveRight()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
			if (moveDown()) {
				generateOneNumber();
				isgameover();
			}
			break;
		default://按了其他的键
			break;
	}
});

function isgameover(){

}

function moveLeft(){
	if(!canMoveLeft(board))
		return false;

//move left
	for(var i= 0;i < 4;i++)
		for (var j= 1; j < 4; j ++){ 
			
			if(board[i][j]!=0){

			//遍历所有在[i,j]左侧的点
				for(var k=0;k<j;k++){
					//判断i，k的值为0且在ik和ij之间无障碍物
					if(board[i][k]==0&&noBlock(i,k,j,board)){
						//move
						//移动动画
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;

						continue;
					}

					//ik的值和ij的值相等
					else if (board[i][k]==board[i][j]&&noBlock(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//add叠加
						board[i][k]+=board[i][j];
						board[i][j]=0;

						continue;
					}
				}
			}
		}
	

	updateBoardView();
	return true;
}



function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}

	for(var j=0;j<4; j++)
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlock(j,k,i,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;

						continue;
					}
					else if (board[k][j]==board[i][j]&&noBlock(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						//add叠加
						board[k][j]+=board[i][j];
						board[i][j]=0;

						continue;
				}
			}
		}
}
	updateBoardView();
	return true;
}
