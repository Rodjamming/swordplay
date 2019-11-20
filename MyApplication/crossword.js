var title="C R O S S W O R D",dirAcross="ACROSS",dirDown="DOWN",congrats="CONGRATULATIONS",congrats2="A Correct Solution!";var revL="Reveal Letter",revW="Reveal Word",revS="Reveal Solution",stAg="Start Again",revE="Reveal Errors";
var mobM="Mobile Mode",dskM="Desk-top Mode",prnP="Print Puzzle",prnS="Print Solution",help="Help",link="CWE Web Site";var build="Select a puzzle to solve (Double click)";
var bip="Loading Puzzle.";var ad1="Crossword Express(CWE)",ad2="www.crauswords.com";var canvasBgC="#F7FFF7",canvasOlC="#000077";var bannerBgC="#EEEECC",bannerTextC="#000066",adTextC="#880000";
var buttonC="#DDDDCC",buttonTextC="#000044",textOvrC="#0000FF",buttonEdgeC="#FFFFFF";var clueC="#000000",curClueC="#004444",clueBgC="#CCEECC",clueOlC="#000000";
var gridC="#000000",cellBgC="#FFFFFF",letterC="#000000",clueIdC="#000000",errorC="#FF0000",cursorC="#FF0000",focusC="#AAFFCC";var selBgC="#DDDDCC",selItemC="#FF0000",itemC="#000000",selTextC="#AA0000";
var congratsText="#000088";var puzzleFile="";var canvasW=950,canvasH=1150;var canvasPW=950,canvasPH=960;var canvasIW=850,canvasIH=850;
var hMem,wMem;var el,el2;var canvas,ctx,datum,memDatum,c,gx,gy,sX,sY;var butlab=[revL,revW,revS,stAg,revE,mobM,prnP,prnS,help,link],numbut=butlab.length;
var btg,btt,btl,btw,btn,btx=new Array(numbut),bty=new Array(numbut);var blg,blt,bll,blh,blw,bln=0;var oldHTML,oldHTML2,prnt=false,iPad=false,buildTouched=false,solved,solveTimer,building=false,hlp=false;
var fontSize,solFontSize,fontSp;var lx,ly,colW,pass,printSt,clueColTop,inset;var xCur,yCur,nCur,xNew,yNew,nNew;var fileIndex;var kbChar=new Array(36),numkeys,stdkb;
var theFile,commandDown=false;var ki,showErrors=false;var maxNodes=800,nodeListLength;var nlId=0,nlDir=1,nlX=2,nlY=3,nlLen=4,nlWrd=5,nlClu=6,nlLocX=7,nlLocY=8,nlCt=9,nlCl=10,nlCb=11,nlCr=12,nlTop=13,nlBot=14,nllY=15,nllX=16;
var nodeList=new Array(maxNodes);for(i=0;i<maxNodes;i++){nodeList[i]=new Array(17);nodeList[i][nlLocX]=new Array(20);nodeList[i][nlLocY]=new Array(20);
}var mode=new Array(50);for(i=0;i<50;i++)mode[i]=new Array(50);var letter=new Array(50);for(i=0;i<50;i++)letter[i]=new Array(50);
var sol=new Array(50);for(i=0;i<50;i++)sol[i]=new Array(50);var color=new Array(50);for(i=0;i<50;i++)color[i]=new Array(50);var horz=new Array(50);for(i=0;i<50;i++)horz[i]=new Array(50);
var vert=new Array(50);for(i=0;i<50;i++)vert[i]=new Array(50);var control=new Array(50);for(i=0;i<50;i++)control[i]=new Array(50);
var msg=new Array(50);for(i=0;i<50;i++)msg[i]=new Array(50);var DIR_ACROSS=0;var DIR_DOWN=1;var DIR_BACK=2;var DIR_UP=3;var locX=[0,4,2,2,2,3,4,5,7,6,7,8,6,5,8,9,0,3,1,4,6,3,1,1,5,0,11];
var locY=[1,2,2,1,0,1,1,1,0,1,1,1,2,2,0,0,0,0,1,0,0,2,0,2,0,2,2];var arwX=[12,13,14,13];var arwY=[0,0,0,1];var arw=['\u1438','\u1431','\u1433','\u142F'];
function start(){canvas=document.getElementById("puzcanvas");canvas.width=canvasW;canvas.height=canvasH;canvas.addEventListener("mousedown",mouseDown,false);
canvas.addEventListener("mousemove",mouseMove,false);canvas.addEventListener("touchstart",touchDown,false);canvas.addEventListener("keydown",keyDown,false);
canvas.addEventListener("keyup",keyUp,false);canvas.addEventListener("keypress",keyPress,false);canvas.focus();ctx=canvas.getContext("2d");
getPuzzle(0);}var bytes,fileExists;function getPuzzle(offset){fileExists=false;var date=new Date();date.setDate(date.getDate()-offset);
var mm=date.getMonth()+1;var dd=date.getDate();theFile=date.getFullYear()+((mm>9?'':'0')+mm)+((dd>9?'':'0')+dd)+".crossword";setTimeout(function(){testPuzzle();},1);
setTimeout(function(){loadPuzzle();},1);}function testPuzzle(){var treq;fileExists=false;if(window.XMLHttpRequest)treq=new XMLHttpRequest();
else treq=new ActiveXObject("Microsoft.XMLHTTP");treq.open('GET',theFile,false);treq.send();if(treq.status!="404")fileExists=true;
}function loadPuzzle(){var req,x,y,ch,i;building=true;clearSol();if(window.XMLHttpRequest)req=new XMLHttpRequest();else req=new ActiveXObject("Microsoft.XMLHTTP");
req.onreadystatechange=function(){if(req.readyState==4){bytes=new Uint8Array(req.response);fileIndex=0;sX=getInt();sY=getInt();fileIndex+=56;
for(y=0;y<sY;y++)for(x=0;x<sX;x++){mode[x][y]=getInt();letter[x][y]=getChar();getChar();msg[x][y]=getColor();color[x][y]="#FFFFFF";
}buildNodeList();for(x=0;x<5;x++)getString();for(x=0;x<nodeListLength;x++){nodeList[x][nlWrd]=getString();nodeList[x][nlClu]=getString();
for(;;){i=nodeList[x][nlClu].indexOf('<',0);j=nodeList[x][nlClu].indexOf('>',0);if(i>=0&&j>i)nodeList[x][nlClu]=nodeList[x][nlClu].slice(0,i)+nodeList[x][nlClu].slice(j+1);
else break;}}for(numkeys=y=0;y<sY;y++)for(x=0;x<sX;x++){ch=letter[x][y];if(ch>' '){for(i=0;i<numkeys;i++)if(ch==kbChar[i])break;if(i==numkeys)
{kbChar[i]=ch;numkeys++;}}}for(x=0;x<numkeys-1;x++)for(y=x+1;y<numkeys;y++)if(kbChar[x]>kbChar[y]){i=kbChar[x];kbChar[x]=kbChar[y];kbChar[y]=i;}
stdkb=false;if(kbChar[0]>='A'&&kbChar[numkeys-1]<='Z'){for(x=0,i='A';x<26;x++,i=String.fromCharCode(i.charCodeAt(0)+1))kbChar[x]=i;stdkb=true;}
if(kbChar[0]>='a'&&kbChar[numkeys-1]<='z'){for(x=0,i='a';x<26;x++,i=String.fromCharCode(i.charCodeAt(0)+1))kbChar[x]=i;stdkb=true;}
if(stdkb){kbChar[26]=' ';numkeys=27;}else{kbChar[numkeys]=' ';numkeys++;}getCookie();building=false;draw();}};req.open('GET',fileExists==true ? theFile:"puzzle.crossword");
req.responseType="arraybuffer";req.send();}function getChar(){var i,k=0;for(i=0;i<4;i++)k=k*256+bytes[fileIndex+i];fileIndex+=4;return(String.fromCharCode(k));
}function getString(){var theString="",theChar,charCode,k,v,w;k=256*bytes[fileIndex]+bytes[fileIndex+1];fileIndex+=2;for(i=0;i<k;i++)
{v=bytes[fileIndex];if(v<128){charCode=v;fileIndex++;}else if(v<224){charCode=(v%32)*64+bytes[fileIndex+1]%64;fileIndex+=2;i++;}else if(v<240){charCode=(v%16)*4096+(bytes[fileIndex+1]%64)*64+bytes[fileIndex+2]%64;fileIndex+=3;i+=2;}
theChar=String.fromCharCode(charCode);theString+=theChar;}theString+="";return theString;}function getInt(){var i,k=0;for(i=0;i<4;i++)
k=k*256+bytes[fileIndex+i];fileIndex+=4;return k;}function getColor(){var clr="#",i,k,hex="0123456789ABCDEF";for(i=1;i<4;i++){k=bytes[fileIndex+i];
clr+=hex.charAt(Math.floor(k/16));clr+=hex.charAt(k%16);}fileIndex+=4;return clr;}var BLOCK_RIGHT=0x01;var BLOCK_BOTTOM=0x02;var BLOCK_LEFT=0x04;
var BLOCK_TOP=0x08;var HAS_LETTER=0x10;var MODE_RTOL=0x20;var MODE_BTOT=0x40;var CELL_MODE=[HAS_LETTER,BLOCK_TOP|BLOCK_RIGHT|BLOCK_BOTTOM|BLOCK_LEFT,
BLOCK_TOP|BLOCK_RIGHT|BLOCK_BOTTOM|BLOCK_LEFT,HAS_LETTER|BLOCK_LEFT,HAS_LETTER|BLOCK_TOP,HAS_LETTER|BLOCK_LEFT|BLOCK_TOP,BLOCK_TOP|BLOCK_BOTTOM,
BLOCK_LEFT|BLOCK_RIGHT,BLOCK_BOTTOM|BLOCK_LEFT,BLOCK_TOP|BLOCK_LEFT,BLOCK_RIGHT|BLOCK_BOTTOM,BLOCK_TOP|BLOCK_RIGHT,BLOCK_TOP|BLOCK_RIGHT|BLOCK_BOTTOM|BLOCK_LEFT|MODE_RTOL,
BLOCK_TOP|BLOCK_RIGHT|BLOCK_BOTTOM|BLOCK_LEFT|MODE_BTOT,BLOCK_TOP|BLOCK_RIGHT|BLOCK_BOTTOM|BLOCK_LEFT|MODE_RTOL|MODE_BTOT,0x00];function cellSignature(xP,yP)
{var signature=CELL_MODE[mode[xP][yP]]&HAS_LETTER;if((xP==sX-1)||((CELL_MODE[mode[xP+1][yP]]&BLOCK_RIGHT)==BLOCK_RIGHT)||(mode[xP][yP]==3)||(mode[xP][yP]==5))
signature|=BLOCK_RIGHT;if(xP<sX-1)signature|=(CELL_MODE[mode[xP+1][yP]]&MODE_RTOL);if((yP==sY-1)||((CELL_MODE[mode[xP][yP+1]]&BLOCK_BOTTOM)==BLOCK_BOTTOM)||(mode[xP][yP]==4)||(mode[xP][yP]==5))
signature|=BLOCK_BOTTOM;if(yP<sY-1)signature|=(CELL_MODE[mode[xP][yP+1]]&MODE_BTOT);if(xP==0||(CELL_MODE[mode[xP-1][yP]]&BLOCK_LEFT)==BLOCK_LEFT)
signature|=BLOCK_LEFT;if(yP==0||(CELL_MODE[mode[xP][yP-1]]&BLOCK_TOP)==BLOCK_TOP)signature|=BLOCK_TOP;return signature;}function buildNodeList()
{var sig,id;var found,item;nodeListLength=0;for(y=0;y<sY;y++)for(x=0;x<sX;x++)horz[x][y]=vert[x][y]=-1;for(y=0;y<sY;y++)for(x=0;x<sX;x++)
{control[x][y]=0;sig=cellSignature(x,y);if((sig&HAS_LETTER)==HAS_LETTER){if((sig&(BLOCK_LEFT|BLOCK_RIGHT))!=(BLOCK_LEFT|BLOCK_RIGHT))
++control[x][y];if((sig&(BLOCK_TOP|BLOCK_BOTTOM))!=(BLOCK_TOP|BLOCK_BOTTOM))++control[x][y];}}for(item=0,id=1,y=0;y<sY;y++)for(x=0;x<sX;x++)
{found=0;sig=cellSignature(x,y);if((sig&(HAS_LETTER|BLOCK_LEFT|BLOCK_RIGHT))==(HAS_LETTER|BLOCK_LEFT)){found++;buildNode(item,id,DIR_ACROSS,x,y);
item++;}if((sig&(HAS_LETTER|BLOCK_TOP|BLOCK_BOTTOM))==(HAS_LETTER|BLOCK_TOP)){found++;buildNode(item,id,DIR_DOWN,x,y);item++;}if(found>0)
id++;}xNew=xCur=nodeList[0][nlX];yNew=yCur=nodeList[0][nlY];nodeListLength=item;nNew=nCur=0;}function buildNode(item,id,direction,xP,yP)
{var result,count;var xNew=xP,yNew=yP,newDir=direction;for(count=1;;count++){--control[xNew][yNew];nodeList[item][nlLocX][count-1]=xNew;
nodeList[item][nlLocY][count-1]=yNew;if(newDir==DIR_ACROSS||newDir==DIR_BACK)horz[xNew][yNew]=item;else vert[xNew][yNew]=item;result=stepToNextCell(xNew,yNew,newDir);
if((result&0x040000)==0x040000)break;xNew=result&0xFF;yNew=(result&0xFF00)/0x100;newDir=(result&0x030000)/0x10000;}nodeList[item][nlId]=id;
nodeList[item][nlDir]=direction;nodeList[item][nlX]=xP;nodeList[item][nlY]=yP;nodeList[item][nlLen]=count;}function stepToNextCell(i,j,dir)
{var sig,rev;var stepCont=new Array(15);stepCont[0]=[0x0100,0x0205,0x040A,0x080F];stepCont[1]=[0x0000,0x0000,0x0000,0x0000];stepCont[2]=[0x0000,0x0000,0x0000,0x0000];
stepCont[3]=[0x0020,0x0205,0x040A,0x080F];stepCont[4]=[0x0100,0x0020,0x040A,0x080F];stepCont[5]=[0x0020,0x0020,0x040A,0x080F];stepCont[6]=[0x0110,0x0000,0x041A,0x0000];
stepCont[7]=[0x0000,0x0215,0x0000,0x081F];stepCont[8]=[0x0215,0x0000,0x0000,0x041A];stepCont[9]=[0x081F,0x041A,0x0000,0x0000];stepCont[10]=[0x0000,0x0000,0x0215,0x0110];
stepCont[11]=[0x0000,0x0110,0x081F,0x0000];stepCont[12]=[0x0000,0x0000,0x0000,0x0000];stepCont[13]=[0x0000,0x0000,0x0000,0x0000];
stepCont[14]=[0x0000,0x0000,0x0000,0x0000];var theControl;var tx=[0x01,0x02,0x04,0x08];for(;;){theControl=stepCont[mode[i][j]][dir];
if((theControl&0x0020)==0x0020)return 0x040000;sig=cellSignature(i,j);if((sig&tx[(theControl&0x000C)/4])==tx[dir])if((theControl&0x0010)==0x0010)
return 0x080000;else{rev=(sig&(MODE_RTOL|MODE_BTOT))==0 ? 0:0x0100000;return 0x040000|rev;}switch(theControl&0x0F00){case 0x0100:i++;break;
case 0x0200:j++;break;case 0x0400:i--;break;case 0x0800:j--;break;}dir=(theControl&0x000C)/4;if((cellSignature(i,j)&HAS_LETTER)==HAS_LETTER)
break;}return(dir*256+j)*256+i;}function hasLetter(x,y){return(CELL_MODE[mode[x][y]]&HAS_LETTER)==HAS_LETTER;}function setCookie()
{var i,j;document.cookie=theFile+'=;expires=Thu,01 Jan 1970 00:00:01 GMT;';var cdata="x";for(j=0;j<sY;j++)for(i=0;i<sX;i++)if(sol[i][j]==""||sol[i][j]==" ")cdata+=" ";
else cdata+=sol[i][j];var d=new Date();d.setTime(d.getTime()+7*24*60*60*1000);var expires=";expires="+d.toUTCString();var path=";path=/";
document.cookie=theFile+"="+encodeURIComponent(cdata)+path+expires;}function getCookie(){var cky,i,j,k,letterCount,errorCount;var name=theFile+"=";
var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1);c=decodeURIComponent(c);
if(c.indexOf(name)==0){var cky=c.substring(name.length,c.length);if(cky.length-1!=sX*sY)return;letterCount=errorCount=0;for(k=1,j=0;j<sY;j++)
for(i=0;i<sX;i++,k++)if(cky.charAt(k)>" "){letterCount++;if(cky.charAt(k)!=letter[i][j])errorCount++;}if(errorCount>letterCount/3)return;
for(k=1,j=0;j<sY;j++)for(i=0;i<sX;i++)sol[i][j]=cky.charAt(k++);break;}}return;}function clearSol(){for(y=0;y<50;y++)for(x=0;x<50;x++)
sol[x][y]=" ";solved=false;}function checkSol(){var x,y;if(solved)return;for(y=0;y<sY;y++)for(x=0;x<sX;x++)if(hasLetter(x,y)&&sol[x][y]!=letter[x][y])return false;
solved=true;draw();solveTimer=setInterval(function(){congrat();},60);return true;}function congrat(){var grd,v,w,lx,ly;var j=0;var clr=["#B4CE9A","#B9CB98","#BEC796","#C3C396","#C7BE96","#CBB998",
"#CEB49A","#D0AF9D","#D2AAA1","#D2A5A5","#D2A1AA","#D09DAF","#CE9AB4","#CB98B9","#C796BE","#C396C3","#BE96C7","#B998CB","#B49ACE","#AF9DD0","#AAA1D2","#A5A5D2","#A1AAD2","#9DAFD0",
"#9AB4CE","#98B9CB","#96BEC7","#96C3C3","#96C7BE","#98CBB9","#9ACEB4","#9DD0AF","#A1D2AA","#A5D2A5","#AAD2A1","#AFD09D"];j=(j+1)%36;
grd=ctx.createLinearGradient(gx+50,gy+50,gx+50,gy-50+sY*c);for(i=0;i<36;i++)grd.addColorStop((i*0.027).toString(10),clr[(i+j)%36]);
ctx.fillStyle=grd;ctx.lineWidth=2;w=sX*c-100;lx=gx+50;ly=gy+50;ctx.fillRect(lx,ly,w,w);ctx.strokeStyle="#000000";ctx.strokeRect(lx,ly,w,w);
ctx.font="bold "+w/15+"px Serif";ctx.fillStyle=congratsText;v=ctx.measureText(congrats).width;ctx.fillText(congrats,lx+(w-v)/2,ly+sY*c/3);
v=ctx.measureText(congrats2).width;ctx.fillText(congrats2,lx+(w-v)/2,ly+sY*c/2);}function clearColor(){for(y=0;y<50;y++)for(x=0;x<50;x++)
color[x][y]="#FFFFFF";}var bannerH,butH,buildH,clueH,kbH,butCnt,txtF,bSp,bSep;function draw(){bannerH=Math.floor(canvas.width*0.067);
butH=canvas.width/18;buildH=Math.floor(canvas.width/14);clueH=Math.floor(canvas.width*0.1);bSp=Math.floor(canvas.width*0.009);kbH=butH*3+bSp*2+20;
txtF=canvas.width/45;if(iPad){puzW=canvas.width*0.73;c=Math.floor((puzW-10)/sX);gx=Math.floor((puzW-c*sX)/2);canvas.height=bannerH*1.2+canvas.width/80+buildH+sY*c+10+clueH+kbH+canvas.width*0.045;
}ctx.lineWidth=3;ctx.fillStyle=canvasBgC;ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle=bannerBgC;ctx.fillRect(0,0,canvas.width,bannerH);
ctx.strokeStyle=canvasOlC;ctx.strokeRect(1,1,canvas.width-2,canvas.height-2);ctx.beginPath();ctx.moveTo(0,bannerH);ctx.lineTo(canvas.width,bannerH);ctx.stroke();
ctx.font="bold "+bannerH*0.7+"px Serif";ctx.fillStyle=bannerTextC;w=Math.floor((2*canvas.width/3-ctx.measureText(title).width)/2);
ctx.fillText(title,w,bannerH*0.75);ctx.fillStyle=adTextC;ctx.font=""+bannerH*0.35+"px Arial";w=Math.floor(5*canvas.width/6-ctx.measureText(ad1).width/2);
ctx.fillText(ad1,w,bannerH*0.4);w=Math.floor(5*canvas.width/6-ctx.measureText(ad2).width/2);ctx.fillText(ad2,w,bannerH*0.8);datum=Math.floor(bannerH*1.2);
if(iPad){datum=Math.floor(datum+canvas.width/80);drawBuild();drawButtons();}else {drawButtons();datum=Math.floor(datum+canvas.width/130);
drawBuild();colW=Math.floor((canvas.width-40)/3);c=Math.floor((2*colW+10)/sX);gx=Math.floor((2*colW+30-c*sX)/2);}gy=datum;if(iPad)
{datum=Math.floor(datum+sY*c+10);memDatum=datum;roundRect(ctx,10,datum,canvas.width-20,clueH,8,2,selBgC,buttonEdgeC,clueC,nodeList[nCur][nlId]+". "+nodeList[nCur][nlClu],txtF);
datum+=clueH;drawKb();}drawPuzzle(0);canvas.focus();}function drawPuzzle(drawmode){var str,str2,c3,v,clr;var x1,y1,w1,h1,x2,y2,h2,t,l,b,r,T,B,j;
var cut;if(building)return;solFontSize=Math.floor(8*c/10);c3=Math.floor(5*c/14);v=c-c3;ctx.lineWidth=2;ctx.strokeStyle=gridC;for(y=0;y<sY;y++)
for(x=0;x<sX;x++){if(hasLetter(x,y)||(mode[x][y]>5&&mode[x][y]<12)){if(drawmode>0){clr="#FFFFFF";if(msg[x][y]!="#FFFFFF")clr=msg[x][y];
}else{clr=cellBgC;if(msg[x][y]!="#FFFFFF")clr=msg[x][y];if(nCur==horz[x][y]||nCur==vert[x][y])clr=focusC;if(showErrors&&sol[x][y]!=" "&&sol[x][y]!=letter[x][y])clr=errorC;
}ctx.fillStyle=clr;ctx.fillRect(gx+x*c,gy+y*c,c,c);}ctx.fillStyle=gridC;switch(mode[x][y]){case 1:ctx.fillRect(gx+x*c,gy+y*c,c,c);ctx.strokeRect(gx+x*c,gy+y*c,c,c);break;
case 6:ctx.fillRect(gx+x*c,gy+y*c,c,c3);ctx.fillRect(gx+x*c,gy+y*c+v,c,c3);break;case 7:ctx.fillRect(gx+x*c,gy+y*c,c3,c);ctx.fillRect(gx+x*c+v,gy+y*c,c3,c);break;
case 8:ctx.fillRect(gx+x*c,gy+y*c,c,c3);ctx.fillRect(gx+x*c+v,gy+y*c,c3,c);ctx.fillRect(gx+x*c,gy+y*c+v,c3,c3);break;case 9:ctx.fillRect(gx+x*c+v,gy+y*c,c3,c);ctx.fillRect(gx+x*c,gy+y*c+v,c,c3);ctx.fillRect(gx+x*c,gy+y*c,c3,c3);break;
case 10:ctx.fillRect(gx+x*c,gy+y*c,c,c3);ctx.fillRect(gx+x*c+v,gy+y*c+v,c3,c3);ctx.fillRect(gx+x*c,gy+y*c,c3,c);break;case 11:ctx.fillRect(gx+x*c,gy+y*c,c3,c);ctx.fillRect(gx+x*c,gy+y*c+v,c,c3);ctx.fillRect(gx+x*c+v,gy+y*c,c3,c3);break;
}if(mode[x][y]!=2)ctx.strokeRect(gx+x*c,gy+y*c,c,c);if(sol[x][y]!=0){ctx.fillStyle=drawmode>0?"#000000":letterC;ctx.font=""+solFontSize+"px Arial";
w=Math.floor((c-ctx.measureText(sol[x][y]).width)/2);ctx.fillText(sol[x][y],gx+x*c+w,gy+y*c+solFontSize+1);}}ctx.lineWidth=4;for(y=0;y<sY;y++)
for(x=0;x<sX;x++){if(mode[x][y]!=2){if(y==0||mode[x][y-1]==2){ctx.beginPath();ctx.moveTo(gx+x*c-1,gy+y*c);ctx.lineTo(gx+x*c+c,gy+y*c);ctx.stroke();}
if(x==0||mode[x-1][y]==2){ctx.beginPath();ctx.moveTo(gx+x*c,gy+y*c-1);ctx.lineTo(gx+x*c,gy+y*c+c);ctx.stroke();}if(y==sY-1||mode[x][y+1]==2){ctx.beginPath();ctx.moveTo(gx+x*c-1,gy+y*c+c);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();}
if(x==sX-1||mode[x+1][y]==2){ctx.beginPath();ctx.moveTo(gx+x*c+c,gy+y*c-1);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();}}}ctx.lineWidth=6;ctx.fillStyle=gridC;
for(y=0;y<sY;y++)for(x=0;x<sX;x++)switch(mode[x][y]){case 5:case 3:ctx.beginPath();ctx.moveTo(gx+x*c+c,gy+y*c);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();if(mode[x][y]==3)break;
case 4:ctx.beginPath();ctx.moveTo(gx+x*c,gy+y*c+c);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();break;}fontSize=Math.floor(c/2.6);ctx.font=""+fontSize+"px Arial";
ctx.fillStyle=drawmode>0?"#000000":clueIdC;for(i=z=0;z<nodeListLength;z++){if(i!=nodeList[z][nlId]){i=nodeList[z][nlId];str=nodeList[z][nlId];
ctx.fillText(str,gx+nodeList[z][nlX]*c+2,gy+nodeList[z][nlY]*c+fontSize-1);}}var Url="www.crAUSwords.com";if(prnt&&drawmode==2){ctx.font='18px Serif';
ctx.fillStyle="0";ctx.fillText(Url,(canvas.width-ctx.measureText(Url).width)/2,canvas.height-1);}if(drawmode==0){ctx.lineWidth=4;ctx.strokeStyle=cursorC;
ctx.strokeRect(gx+xCur*c+1,gy+yCur*c+1,c-2,c-2);}for(fontSize=22,z=0;z<nodeListLength;z++){str=nodeList[z][nlId]+". ";if(nodeList[z][nlId]<10)
str=" "+" "+str;ctx.font="bold "+fontSize+"px Arial";inset=ctx.measureText(str).width;str=nodeList[z][nlClu];for(i=0,j=1;j<=str.length;j++)
if(j==str.length||str.charAt(j)==' '){str2=str.slice(i,j);i=j+1;while(ctx.measureText(str2).width>=colW-inset){fontSize--;ctx.font=""+fontSize+"px Arial";
}}if(j==str.length+1&&str.charAt(j-2)==')'&&str.charAt(j-3)<='9'&&str.charAt(j-3)>='0'){for(;str.charAt(j)!=' ';j--){};for(--j;str.charAt(j)!=' '&&j>0;j--){};
str2=str.slice(j+1);while(ctx.measureText(str2).width>=colW-inset){fontSize--;ctx.font=""+fontSize+"px Arial";}}}fontSp=7*fontSize/4;
ctx.fillStyle=clueC;if((!iPad&&drawmode==0)||drawmode==1)for(printSt=0;;){clueColTop=gy+c*sY;w1=(clueColTop-gy)%fontSp;if(w1>0)clueColTop+=(fontSp-w1);
for(lX=10,lY=clueColTop,pass=0;pass<2;pass++){if(pass==0)lY+=fontSp;else{if(lY==gy)lY+=fontSp;else if(lY+3*fontSp<=canvas.height)
lY+=(2*fontSp);else{lX+=(colW+10);lY=lX>2*colW ? gy+fontSp:clueColTop;}}ctx.font="bold "+fontSize+"px Arial";if(printSt==2)ctx.fillText(pass==0 ? dirAcross:dirDown,lX,lY);
for(z=0;z<nodeListLength;z++)if(pass==nodeList[z][nlDir]){if(z==nCur&&printSt==2){ctx.fillStyle=drawmode==0?clueBgC:"#FFFFFF";ctx.strokeStyle=drawmode==0?clueOlC:"#FFFFFF";
ctx.lineWidth=1;t=nodeList[nCur][nlCt];l=nodeList[nCur][nlCl];b=nodeList[nCur][nlCb];r=nodeList[nCur][nlCr];T=nodeList[nCur][nlTop];
B=nodeList[nCur][nlBot];x1=l-0.5;y1=t+2.5;if(nodeList[z][nlCb]<nodeList[z][nlCt]){w1=Math.floor((r-l-10)/2);x2=r-w1-0.5;y2=T+2.5;
h1=B-t;h2=b-T;ctx.fillRect(x1,y1,w1,h1);ctx.strokeRect(x1,y1,w1,h1);ctx.fillRect(x2,y2,w1,h2);ctx.strokeRect(x2,y2,w1,h2);}else{w1=r-l+1;h1=b-t;
ctx.fillRect(x1,y1,w1,h1);ctx.strokeRect(x1,y1,w1,h1);}ctx.fillStyle=curClueC;}str=nodeList[z][nlId]+". ";if(nodeList[z][nlId]<10)
str=" "+str;ctx.font="bold "+fontSize+"px Arial";inset=ctx.measureText(str).width;if(printSt==2)ctx.fillText(str,lX,lY+fontSp);ctx.font=""+fontSize+"px Arial";
str=nodeList[z][nlClu];nodeList[z][nlCt]=Math.floor(lY+fontSp/6);nodeList[z][nlCl]=Math.floor(lX-3);nodeList[z][nllY]=lY+fontSp;nodeList[z][nllX]=lX;
for(;;){if(ctx.measureText(str).width<colW-inset){lY+=fontSp;if(printSt==2)ctx.fillText(str,lX+inset,lY);else{nodeList[z][nlCb]=Math.floor(lY+fontSp/6);
nodeList[z][nlCr]=Math.floor(lX+colW+3);}if((lY+fontSp)>(canvas.height-fontSp/2)){lX+=(colW+10);lY=lX>2*colW ? gy:clueColTop;}break;
}else {if(str.charAt(str.length-1)==')'&&str.charAt(str.length-2)<='9'&&str.charAt(str.length-2)>='0')cut=str.lastIndexOf(' ');else cut=str.length;
for(--cut;cut>0;cut--)if(str.charAt(cut)==' '){str2=str.slice(0,cut);if(ctx.measureText(str2).width<colW-inset){lY+=fontSp;if(printSt==2)
ctx.fillText(str2,lX+inset,lY);else{nodeList[z][nlCb]=Math.floor(lY+fontSp/6);nodeList[z][nlCr]=lX+colW;}if((lY+fontSp)>(canvas.height-fontSp/2))
{nodeList[z][nlBot]=Math.floor(lY+fontSp/6);lX+=(colW+10);lY=lX>2*colW ? gy:clueColTop;nodeList[z][nlTop]=Math.floor(lY+fontSp/6);
}str=str.slice(cut+1);break;}}}}ctx.fillStyle=clueC;}}if(printSt==2)break;if((lX>4*colW)||((lX>3*colW)&&(lY>gy)))if(printSt==0)fontSp=7*(--fontSize)/6;
else--fontSp;else if(printSt==0){printSt=1;fontSp+=5;}else printSt=2;}}function drawButtons(){var i,n,t,l,r1,count,adj=0;if(iPad)
{btg=10,btt=datum,l=0.73*canvas.width,btw=canvas.width/4;for(i=n=0;n<numbut;n++){btx[n]=bty[n]=0;if(butlab[n].length>0){t=btt+(butH+btg)*i;
roundRect(ctx,l,t,btw,butH,8,2,buttonC,buttonEdgeC,n==btn ? textOvrC:buttonTextC,butlab[n],txtF);i++;btx[n]=l;bty[n]=t;}}}else {for(count=n=0;n<numbut;n++)
if(butlab[n].length>0)count++;r1=Math.ceil(count/2);btg=10,btt=datum,btw=(canvas.width-(r1+1)*btg)/r1;for(i=n=0;n<numbut;n++){btx[n]=bty[n]=0;
if(butlab[n].length>0){if(i%r1==0&&(count-i)<=r1+1)adj=((canvas.width-20)-((count-i)*(btw+btg)-btg))/2;t=btt+(butH+btg)*Math.floor(i/r1);l=adj+10+(i%r1)*(btw+btg);
roundRect(ctx,l,t,btw,butH,8,2,buttonC,buttonEdgeC,n==btn ? textOvrC:buttonTextC,butlab[n],n==9?18:txtF);i++;btx[n]=l;bty[n]=t;}}
datum=t+butH+btg+txtF;}}function drawBuild(){var i,sp,w,text;var mth=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
ctx.font=txtF+"px Arial";ctx.fillStyle=selTextC;w=Math.floor((canvas.width-ctx.measureText(build).width)/2);ctx.fillText(build,w,datum);
datum=Math.floor(datum+canvas.width/150);bll=10,blt=datum,blw=canvas.width-20,blh=canvas.width/20,sp=blw/11;roundRect(ctx,bll,blt,blw,blh,8,2,selBgC,buttonEdgeC,buttonTextC,building ? bip:"",txtF);
if(building)return;if(fileExists==true){var myDate=new Date();for(i=0;i<7;i++){sp=blw/7;ctx.fillStyle=bln==i? selItemC:itemC;text=mth[myDate.getMonth()]+" "+myDate.getDate();
w=Math.floor((sp-ctx.measureText(text).width)/2);ctx.fillText(text,bll+i*sp+w,blt+(blh+canvas.width/40)/2);myDate.setDate(myDate.getDate()-1);
}}else {ctx.fillStyle=itemC;text="Demonstration Puzzle";w=Math.floor((blw-ctx.measureText(text).width)/2);ctx.fillText(text,w,blt+(blh+canvas.width/40)/2);
}datum+=buildH;}function drawKb(){var i;bSep=butH+bSp;sbw=butH*3+bSp*2;roundRect(ctx,10,datum+10,canvas.width-20,kbH,8,2,"#CCDDCC","#FFFFFF","#000000","");
for(i=0;i<numkeys;i++)if(stdkb)roundRect(ctx,20+(bSep * locY[i])/2+bSep * locX[i],datum+20+locY[i]*bSep,i==26 ?sbw:butH,butH,4,1,cellBgC,"#000000","#000000",kbChar[i],butH/2);
else roundRect(ctx,i==(numkeys-1)?(20+arwX[0]*bSep):(20+bSep *(i%10)),datum+20+bSep*Math.floor(i/10),i==(numkeys-1)?sbw:butH,butH,4,1,cellBgC,"#000000","#000000",kbChar[i],butH/2);
for(i=0;i<4;i++)roundRect(ctx,20+arwX[i]*bSep,datum+20+arwY[i]*bSep,butH,butH,4,1,cellBgC,"#000000","#000000",arw[i],butH/2);}function roundRect(ctx,x,y,w,h,r,lw,fill,stroke,textC,text,fontSize)
{var v1,cut,str,str2,i,len,lines;ctx.shadowOffsetX=2;ctx.shadowOffsetY=2;ctx.shadowBlur=3;ctx.shadowColor="rgba(0,0,0,0.5)";ctx.beginPath();ctx.moveTo(x+r,y);
ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();ctx.lineWidth=lw;ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.fill();ctx.stroke();
ctx.shadowOffsetX=0;ctx.shadowOffsetY=0;ctx.shadowBlur=0;ctx.font=fontSize+"px Arial";ctx.fillStyle=textC;len=ctx.measureText(text).width;
lines=1;{if(len>0.95*w)lines=2;if(len>1.6*w)lines=3;}len=len/lines+50;str=text;var firstLine=(h-(lines * 1.2 * fontSize+0.4*fontSize))/2;
for(i=0;i<lines;i++){for(cut=str.length;cut>0;cut--){if(str.charAt(cut)==' '||cut==str.length){str2=str.slice(0,cut);if(ctx.measureText(str2).width>len)
continue;}else if(cut==0)str2=str;else continue;v1=(w-ctx.measureText(str2).width)/2;if(lines==1)ctx.fillText(str2,x+v1,y+(h+fontSize)/2);
else ctx.fillText(str2,x+v1,h==35 ? y+24:h==40 ? y+27:y+firstLine+(i+1)*1.2*fontSize);str=str.slice(cut);break;}}}function mouseMove(ev)
{var ka,kb,i,k,x,y,r,mouseStyle;if(prnt)return;mouseStyle="default";r=canvas.getBoundingClientRect();x=ev.clientX-r.left;y=ev.clientY-r.top;
for(k=-1,i=0;i<numbut;i++){if(btx[i]!=bty[i]&&x>btx[i]&&y>bty[i]&&x<btx[i]+btw&&y<bty[i]+butH){mouseStyle="pointer";k=i;if(solved)clearInterval(solveTimer);
}}if(k!=btn){btn=k;draw();}if(x>bll&&y>blt&&x<bll+blw&&y<blt+blh)mouseStyle="pointer";canvas.style.cursor=mouseStyle;if(!iPad)return;
for(i=0;i<numkeys;i++){if(stdkb){ka=20+(bSep * locY[i])/2+bSep * locX[i];kb=datum+20+locY[i]*bSep;}else{ka=i==(numkeys-1)?660:(20+bSep *(i%10));kb=datum+20+bSep*Math.floor(i/10);}
w=i==numkeys-1?170:butH;if(x>ka&&y>kb&&x<ka+w&&y<kb+butH)mouseStyle="pointer";}for(i=0;i<4;i++){ka=20+arwX[i]* bSep;kb=datum+20+arwY[i]* bSep;
if(x>ka&&y>kb&&x<ka+butH&&y<kb+butH)mouseStyle="pointer";}canvas.style.cursor=mouseStyle;}function touchDown(ev){var x,y;ev.preventDefault();
ev.stopPropagation();x=ev.targetTouches[0].pageX-canvas.offsetLeft;y=ev.targetTouches[0].pageY-canvas.offsetTop;action(x,y);}function mouseDown(ev)
{var x,y,r;ev.preventDefault();r=canvas.getBoundingClientRect();x=ev.clientX-r.left;y=ev.clientY-r.top;action(x,y);}function keyUp(ev)
{if(ev.keyCode==224||ev.keyCode==17)commandDown=false;}function redrawClue(theN,theColor){var yLoc,xLoc;ctx.fillStyle=theColor;ctx.font=""+fontSize+"px Arial";
str=nodeList[theN][nlId]+". ";if(nodeList[theN][nlId]<10)str=" "+str;ctx.font="bold "+fontSize+"px Arial";xLoc=nodeList[theN][nllX];
yLoc=nodeList[theN][nllY];ctx.fillText(str,xLoc,yLoc);inset=ctx.measureText(str).width;xLoc+=inset;ctx.font=""+fontSize+"px Arial";
str=nodeList[theN][nlClu];for(;;)if(ctx.measureText(str).width<colW-inset){ctx.fillText(str,xLoc,yLoc);break;}else{if(str.charAt(str.length-1)==')'
&&str.charAt(str.length-2)<='9'&&str.charAt(str.length-2)>='0')cut=str.lastIndexOf(' ');else cut=str.length;for(--cut;cut>0;cut--)
if(str.charAt(cut)==' '){str2=str.slice(0,cut);if(ctx.measureText(str2).width<colW-inset){ctx.fillText(str2,xLoc,yLoc);yLoc+=fontSp;
if(yLoc>(canvas.height-fontSp/2)){xLoc+=(colW+10);yLoc=(xLoc>2*colW ? gy:clueColTop)+fontSp;}str=str.slice(cut+1);break;}}}}function redrawWord(theN,theColor)
{ctx.fillStyle=theColor;for(i=0;i<nodeList[theN][nlLen];i++){x=nodeList[theN][nlLocX][i];y=nodeList[theN][nlLocY][i];ctx.fillRect(gx+x*c,gy+y*c,c,c);
}for(i=0;i<nodeList[theN][nlLen];i++){x=nodeList[theN][nlLocX][i];y=nodeList[theN][nlLocY][i];ctx.strokeStyle=gridC;ctx.lineWidth=2;
ctx.strokeRect(gx+x*c,gy+y*c,c,c);ctx.lineWidth=3;if(y==0||mode[x][y-1]==2){ctx.beginPath();ctx.moveTo(gx+x*c-1,gy+y*c);ctx.lineTo(gx+x*c+c,gy+y*c);ctx.stroke();}
if(x==0||mode[x-1][y]==2){ctx.beginPath();ctx.moveTo(gx+x*c,gy+y*c-1);ctx.lineTo(gx+x*c,gy+y*c+c);ctx.stroke();}if(y==sY-1||mode[x][y+1]==2){ctx.beginPath();ctx.moveTo(gx+x*c-1,gy+y*c+c);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();}
if(x==sX-1||mode[x+1][y]==2){ctx.beginPath();ctx.moveTo(gx+x*c+c,gy+y*c-1);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();}if(sol[x][y]!=0)
{ctx.fillStyle=letterC;ctx.font=""+solFontSize+"px Arial";w=Math.floor((c-ctx.measureText(sol[x][y]).width)/2);ctx.fillText(sol[x][y],gx+x*c+w,gy+y*c+solFontSize+1);
}}}function newFocus(){if(nCur!=nNew&&!iPad){ctx.fillStyle="#F7FFF7";ctx.strokeStyle="#F7FFF7";t=nodeList[nCur][nlCt];l=nodeList[nCur][nlCl];
b=nodeList[nCur][nlCb];r=nodeList[nCur][nlCr];T=nodeList[nCur][nlTop];B=nodeList[nCur][nlBot];x1=l-0.5;y1=t;if(nodeList[nCur][nlCb]<nodeList[nCur][nlCt])
{w1=Math.floor((r-l-10)/2);x2=r-w1-0.5;y2=T+2.5;h1=B-t;h2=b-T;ctx.fillRect(x1-2,y1-2,w1+4,h1+6);ctx.fillRect(x2-2,y2-2,w1+4,h2+6);
}else{w1=r-l+1;h1=b-t;ctx.fillRect(x1-2,y1,w1+4,h1+4);}redrawClue(nCur,clueC);ctx.fillStyle=clueBgC;ctx.strokeStyle=clueOlC;ctx.lineWidth=1;
t=nodeList[nNew][nlCt];l=nodeList[nNew][nlCl];b=nodeList[nNew][nlCb];r=nodeList[nNew][nlCr];T=nodeList[nNew][nlTop];B=nodeList[nNew][nlBot];
x1=l-0.5;y1=t+2.5;if(nodeList[nNew][nlCb]<nodeList[nNew][nlCt]){w1=Math.floor((r-l-10)/2);x2=r-w1-0.5;y2=T+2.5;h1=B-t;h2=b-T;ctx.fillRect(x1,y1,w1,h1);
ctx.strokeRect(x1,y1,w1,h1);ctx.fillRect(x2,y2,w1,h2);ctx.strokeRect(x2,y2,w1,h2);}else{w1=r-l+1;h1=b-t;ctx.fillRect(x1,y1,w1,h1);
ctx.strokeRect(x1,y1,w1,h1);}redrawClue(nNew,curClueC);}else if(iPad){ctx.fillStyle=canvasBgC;ctx.fillRect(5,memDatum,canvas.width-10,clueH+10);
roundRect(ctx,10,memDatum,canvas.width-20,clueH,8,2,selBgC,buttonEdgeC,clueC,nodeList[nNew][nlId]+". "+nodeList[nNew][nlClu],txtF);
}redrawWord(nCur,cellBgC);redrawWord(nNew,focusC);ctx.lineWidth=6;ctx.fillStyle=gridC;for(y=0;y<sY;y++)for(x=0;x<sX;x++)switch(mode[x][y])
{case 5:case 3:ctx.beginPath();ctx.moveTo(gx+x*c+c,gy+y*c);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();if(mode[x][y]==3)break;case 4:ctx.beginPath();ctx.moveTo(gx+x*c,gy+y*c+c);ctx.lineTo(gx+x*c+c,gy+y*c+c);ctx.stroke();break;
}ctx.lineWidth=4;ctx.strokeStyle=cursorC;ctx.strokeRect(gx+xNew*c+1,gy+yNew*c+1,c-2,c-2);idSize=Math.floor(c/2.6);ctx.font=""+idSize+"px Arial";
ctx.fillStyle=clueIdC;for(i=z=0;z<nodeListLength;z++){x=nodeList[z][nlX];y=nodeList[z][nlY];if(nNew==horz[x][y]||nNew==vert[x][y]||nCur==horz[x][y]||nCur==vert[x][y])
if(i!=nodeList[z][nlId]){i=nodeList[z][nlId];str=nodeList[z][nlId];ctx.fillText(str,gx+x*c+2,gy+y*c+idSize-1);}}xCur=xNew;yCur=yNew;
nCur=nNew;}function returnSolve(){restart();getCookie();prnt=false;hlp=false;el.innerHTML=oldHTML;el2.innerHTML=oldHTML2;canvas.height=hMem;
canvas.width=wMem;draw();}function keyDown(ev){var a,keyCode;if(prnt){returnSolve();return;}keyCode=ev.keyCode;if(keyCode==224||keyCode==17)commandDown=true;
switch(keyCode){case 46:sol[xCur][yCur]=" ";for(a=0;a<nodeList[nCur][nlLen];a++)if(xCur==nodeList[nCur][nlLocX][a]&&yCur==nodeList[nCur][nlLocY][a])break;
if(a<nodeList[nCur][nlLen]-1){xNew=nodeList[nCur][nlLocX][a+1];yNew=nodeList[nCur][nlLocY][a+1];nNew=nCur;}break;case 8:ev.preventDefault();
sol[xCur][yCur]=" ";for(a=0;a<nodeList[nCur][nlLen];a++)if(xCur==nodeList[nCur][nlLocX][a]&&yCur==nodeList[nCur][nlLocY][a])break;
if(a>0){xNew=nodeList[nCur][nlLocX][a-1];yNew=nodeList[nCur][nlLocY][a-1];nNew=nCur;}break;case 37:for(a=xCur-1;a>=0;a--)if(hasLetter(a,yCur)){xNew=a;nNew=horz[xNew][yCur];if(nNew==-1)nNew=vert[xNew][yCur];break;}break;
case 38:for(a=yCur-1;a>=0;a--)if(hasLetter(xCur,a)){yNew=a;nNew=vert[xCur][yNew];if(nNew==-1)nNew=horz[xCur][yNew];break;}break;case 39:for(a=xCur+1;a<sX;a++)if(hasLetter(a,yCur)){xNew=a;nNew=horz[xNew][yCur];if(nNew==-1)nNew=vert[xNew][yCur];break;}break;
case 40:for(a=yCur+1;a<sY;a++)if(hasLetter(xCur,a)){yNew=a;nNew=vert[xCur][yNew];if(nNew==-1)nNew=horz[xCur][yNew];break;}break;case 13:nNew=nCur==horz[xCur][yCur]? vert[xCur][yCur]:horz[xCur][yCur];if(nNew==-1)nNew=nCur;break;
}newFocus();setCookie();}function keyPress(ev){if(commandDown||ev.keyCode==8||ev.keyCode==13||ev.which==0)return;var keyPress=String.fromCharCode(ev.which).toUpperCase();
sol[xCur][yCur]=(letter[xCur][yCur]==letter[xCur][yCur].toUpperCase())? keyPress.toUpperCase():keyPress.toLowerCase();for(i=0;i<nodeList[nCur][nlLen];i++)
if(xCur==nodeList[nCur][nlLocX][i]&&yCur==nodeList[nCur][nlLocY][i]&&i<nodeList[nCur][nlLen]-1){xNew=nodeList[nCur][nlLocX][i+1];
yNew=nodeList[nCur][nlLocY][i+1];nNew=nCur;break;}if(checkSol())return;newFocus();setCookie();}function processKey(keyCode,keyPress)
{var i;switch(keyCode){case 37:for(a=xCur-1;a>=0;a--)if(hasLetter(a,yCur)){xNew=a;nNew=horz[xNew][yCur];if(nNew==-1)nNew=vert[xNew][yCur];break;}break;
case 38:for(a=yCur-1;a>=0;a--)if(hasLetter(xCur,a)){yNew=a;nNew=vert[xCur][yNew];if(nNew==-1)nNew=horz[xCur][yNew];break;}break;case 39:for(a=xCur+1;a<sX;a++)if(hasLetter(a,yCur)){xNew=a;nNew=horz[xNew][yCur];if(nNew==-1)nNew=vert[xNew][yCur];break;}break;
case 40:for(a=yCur+1;a<sY;a++)if(hasLetter(xCur,a)){yNew=a;nNew=vert[xCur][yNew];if(nNew==-1)nNew=horz[xCur][yNew];break;}break;case 0:sol[xCur][yCur]=(letter[xCur][yCur]==letter[xCur][yCur].toUpperCase())? keyPress:keyPress.toLowerCase();
for(i=0;i<nodeList[nCur][nlLen];i++)if(xCur==nodeList[nCur][nlLocX][i]&&yCur==nodeList[nCur][nlLocY][i]&&i<nodeList[nCur][nlLen]-1)
{xNew=nodeList[nCur][nlLocX][i+1];yNew=nodeList[nCur][nlLocY][i+1];nNew=nCur;break;}if(checkSol())return;break;}newFocus();setCookie();
}function action(x,y){var m,n,i,ka,kb;var fun=[revealLetter,revealWord,revealSol,restart,revealerr,mobMode,printP,printS,showHelp,linkCWE];
if(solved)clearInterval(solveTimer);if(prnt||hlp){returnSolve();return;}for(i=0;i<numbut;i++)if(btx[i]!=bty[i]&&x>btx[i]&&y>bty[i]&&x<btx[i]+btw&&y<bty[i]+butH)
{fun[i]();return;}if(x>bll&&y>blt&&x<bll+blw&&y<blt+blh){if(buildTouched){bln=(Math.floor((x-bll)/(blw/7)));buildTouched=false;getPuzzle(bln);
return;}buildTouched=true;timer=setInterval(function(){clearInterval(timer);buildTouched=false;},500);return;}if(solved){draw();return;}
if(iPad){for(i=0;i<numkeys;i++){if(stdkb){ka=20+(bSep * locY[i])/2+bSep * locX[i];kb=datum+20+locY[i]*bSep;}else{ka=i==(numkeys-1)?660:(20+bSep *(i%10));kb=datum+20+bSep*Math.floor(i/10);}
w=i==numkeys-1?170:butH;if(x>ka&&y>kb&&x<ka+w&&y<kb+butH){processKey(0,kbChar[i]);return;}}for(i=0;i<4;i++){ka=20+arwX[i]* bSep;kb=datum+20+arwY[i]* bSep;
if(x>ka&&y>kb&&x<ka+butH&&y<kb+butH){processKey(i+37,0);return;}}}if(solved)return;m=Math.floor((x-gx)/c);n=Math.floor((y-gy)/c);
if(m>=0&&n>=0&&m<sX&&n<sY&&hasLetter(m,n)){if(xCur==m&&yCur==n){xNew=xCur;yNew=yCur;if(nCur==horz[xCur][yCur]&&vert[xCur][yCur]!=-1)nNew=vert[xCur][yCur];
else if(nCur==vert[xCur][yCur]&&horz[xCur][yCur]!=-1)nNew=horz[xCur][yCur];}else{xNew=m;yNew=n;nNew=horz[xNew][yNew]==-1 ? vert[xNew][yNew]:horz[xNew][yNew];
}newFocus();return;}else if(!iPad){for(z=0;z<nodeListLength;z++){if(nodeList[z][nlCb]<nodeList[z][nlCt]){w=Math.floor((nodeList[z][nlCr]-nodeList[z][nlCl]-10)/2);
if((x>nodeList[z][nlCl]&&x<nodeList[z][nlCl]+w&&y>nodeList[z][nlCt]&&y<nodeList[z][nlBot])||(x>nodeList[z][nlCr]-w&&x<nodeList[z][nlCr]&&y>nodeList[z][nlTop]&&y<nodeList[z][nlCb]))
{xNew=nodeList[z][nlX];yNew=nodeList[z][nlY];nNew=z;break;}}else if(x>nodeList[z][nlCl]&&x<nodeList[z][nlCr]&&y>nodeList[z][nlCt]&&y<nodeList[z][nlCb])
{xNew=nodeList[z][nlX];yNew=nodeList[z][nlY];nNew=z;break;}}if(z<nodeListLength&&nNew==nCur)window.location="http://www.google.com/search?q="+nodeList[nCur][nlClu];
newFocus();return;}draw();}function revealLetter(){sol[xCur][yCur]=letter[xCur][yCur];for(a=0;a<nodeList[nCur][nlLen];a++)if(xCur==nodeList[nCur][nlLocX][a]&&yCur==nodeList[nCur][nlLocY][a]&&a<nodeList[nCur][nlLen]-1)
{xNew=nodeList[nCur][nlLocX][a+1];yNew=nodeList[nCur][nlLocY][a+1];nNew=nCur;break;}newFocus();setCookie();}function revealWord()
{for(var y=0;y<nodeList[nCur][nlLen];y++){var i=nodeList[nCur][nlLocX][y];var j=nodeList[nCur][nlLocY][y];sol[i][j]=letter[i][j];
}setCookie();draw();}function revealSol(){for(y=0;y<sY;y++)for(x=0;x<sX;x++)if(hasLetter(x,y))sol[x][y]=letter[x][y];solved=true;
if(!prnt){setCookie();draw();}}function restart(){clearSol();if(!prnt){setCookie();draw();}}function revealerr(){for(y=0;y<sY;y++)
for(x=0;x<sX;x++)if(sol[x][y]!=" "&&sol[x][y]!=letter[x][y]){timer=setTimeout(function(){clearTimeout(timer);showErrors=false;draw();},3000);
showErrors=true;draw();return;}}function mobMode(){iPad=!iPad;canvas.width=iPad ? canvasIW:canvasW;canvas.height=iPad ? canvasIH:canvasH;
butlab[5]=iPad ? dskM:mobM;draw();}function printP(){el=document.getElementById("hide1");oldHTML=el.innerHTML;el.innerHTML="";el2=document.getElementById("hide2");
oldHTML2=el2.innerHTML;el2.innerHTML='';hMem=canvas.height;wMem=canvas.width;prnt=true;restart();canvas.width=canvasPW;canvas.height=canvasPH+16;
ctx.lineWidth=3;ctx.fillStyle="#FFFFFF";ctx.fillRect(0,0,canvasPW,canvas.height);colW=Math.floor((canvasPW-40)/3);c=Math.floor((2*colW+10)/sX);
gx=1.5;gy=1.5;drawPuzzle(1);window.print();canvas.style.cursor="default";}function printS(){el=document.getElementById("hide1");oldHTML=el.innerHTML;
el.innerHTML="";el2=document.getElementById("hide2");oldHTML2=el2.innerHTML;el2.innerHTML='';hMem=canvas.height;wMem=canvas.width;
prnt=true;revealSol();canvas.width=canvasPW;canvas.height=canvasPH+16;ctx.lineWidth=3;ctx.fillStyle="#FFFFFF";ctx.fillRect(0,0,canvasPW,canvas.height);
c=Math.floor(canvasPW/sX);gx=1.5;gy=1.5;drawPuzzle(2);window.print();canvas.style.cursor="default";}function linkCWE(){window.location="http://www.crauswords.com";
}function showHelp(){helpText="<table style='width:900px;margin:0 auto;background-color:#F9FFFF;padding:10px'>"+"<tr><td><div class='header'>USER INSTRUCTIONS</div></td></tr></table>"+
"<table style='width:900px;margin:0 auto;background-color:#007777'><tr><td>"+"<table style='width:894px;margin:0 auto;background-color:#FFFFFF;padding:10px'><tr><td>"+
"<ul>"+"<li/><span class='menuhead'>How to enter your solution</span><br/>"+"The solution process is guided by a red cursor which surrounds one of the cells called the focus cell. This cell represents one of the letters "+
"of the focus word which is colored green. Any character you type on the keyboard will be entered into the focus cell and the cursor will "+
"advance to the next letter of the focus word.<p/>"+"<li/><span class='menuhead'>Navigating the puzzle</span><br/>"+"The mouse can be used to change the location of the focus cell. A click in any cell will move the focus to that cell, and one of the words "+
"passing through that cell will become the focus word. A second click (or pressing the Enter key) will change focus to the other word passing "+
"through the cell (if such a word exists). Alternatively, the four arrow keys can be use to move the cursor cell around the puzzle. A mouse "+
"click on any of the clues will move the focus to the word corresponding to that clue. Finally, a mouse click on the clue which is currently "+
"highlighted will provide you with the results of a Google search based on the contents of the clue.<p/>"+"<li/><span class='menuhead'>Puzzle selection.</span><br/>"+
"A number of puzzles are listed in the selection panel. A double click (or double tap for a mobile device) on any of the listed puzzles will "+
"select that puzzle, and display it ready for you to solve. (A double click is required to avoid the possibility on a touch device of accidently "+
"selecting a new puzzle, and destroying the puzzle you are currently trying to solve).<p/>"+"<li/><span class='menuhead'>Buttons</span><br/>"+
"The puzzle is equipped with a set of buttons which provide the following services. (Note that in some cases, the web-master may have elected "+
"to omit some of these buttons.):-<p/>"+"<ul>"+"<li/><span class='menusub'>Reveal Letter</span><br/>"+"Click this button to reveal the letter under the cursor.<p/>"+
"<li/><span class='menusub'>Reveal Word</span><br/>"+"This button reveals the current word.<p/>"+"<li/><span class='menusub'>Reveal Solution</span><br/>"+
"Reveal the complete solution of the puzzle.<p/>"+"<li/><span class='menusub'>Start Again</span><br/>"+"This button allows you to clear the entire puzzle.<p/>"+
"<li/><span class='menusub'>Reveal Errors</span><br/>"+"Check your progress at any time using this button. Cells containing incorrect letters will be highlighted for a period of around three "+
"seconds.<p/>"+"<li/><span class='menusub'>Mobile Mode</span><br/>"+"The puzzles are mainly intended for use on personal computers. The Mobile Mode button expands the puzzle layout to make it more suitable "+
"for use on Mobile Devices. In particular, a simulated keyboard is provided which automatically adapts itself to the character set required "+
"by the selected puzzle. Users of iPads, and similar tablets should find it very convenient to use, but it really doesn't lend itself "+
"for use on Smart-Phones due to the small amount of space available on the screen.<p/>"+"<li/><span class='menusub'>Print Puzzle.</span><br/>"+
"A single click of this button will redraw the entire screen so that it contains a black and white version of the puzzle, and nothing else. "+
"It is then possible to use the File/Print menu function of your browser to obtain a printed copy of the puzzle. When printing is complete, "+
"a single mouse click (or a touch operation) within the puzzle will return you to the normal screen.<p/>"+"<li/><span class='menusub'>Print Solution.</span><br/>"+
"This operates identically to the <b>Print Puzzle</b> button, except that it enables printing of the Solution to the puzzle.<p/>"+
"<li/><span class='menusub'>Help</span><br/>"+"Not surprisingly, the Help button will lead you to the screen you are now reading.<p/>"+
"<li/><span class='menusub'>Crossword Express Web Site</span><br/>"+"Link to the web site of Crossword Express to discover the full range of features offered by the prigram."+
"</ul>"+"</ul>"+"</td></tr></table>"+"</td></tr></table>";el2=document.getElementById("hide1");oldHTML2=el2.innerHTML;el=document.getElementById("hide2");
oldHTML=el.innerHTML;el.innerHTML=helpText;hMem=canvas.height;wMem=canvas.width;hlp=true;}
