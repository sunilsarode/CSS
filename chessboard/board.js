let board =document.getElementById('board');
console.log(board);
let white=false;
let rowChange=false;

let arr=[]
const map =new Map();
let counter=0;
for(let i=0;i<8;i++){
    let inArr=[];

    for(let j=0;j<8;j++){
        counter++;
        inArr.push(Number(counter));
        map.set(counter,[i,j]);
    }
    arr.push(inArr);
}

//console.log(arr);
console.log(map);
//console.log(map.get(Number(19))[0]);

function drawDiagonal(id){

   let coordinateArr= map.get(Number(id));
//    let i=coordinateArr[0];
//    let j=coordinateArr[1];
//    let squareId=arr[i][j];
   document.getElementById(id).classList.add('gray');
   goLeftUp(coordinateArr);
   goRightUp(coordinateArr);
   goLeftDown(coordinateArr);
   goRightDown(coordinateArr); 
}


function goLeftUp(coordinateArr){
    let i=coordinateArr[0];
    let j=coordinateArr[1];
    i--;
    j--;
    while(i>=0 && j>=0){
        let id=arr[i][j];
        document.getElementById(id).classList.add('blue');
        i--;
        j--;

    }
}

function goRightUp(coordinateArr){
    let i=coordinateArr[0];
    let j=coordinateArr[1];
    i--;
    j++;
    while(i>=0 && j<8){
        let id=arr[i][j];
        document.getElementById(id).classList.add('blue');
        i--;
        j++;

    }
}
function goLeftDown(coordinateArr){
    let i=coordinateArr[0];
    let j=coordinateArr[1];
    i++;
    j--;
    while(i<8 && j>=0){
        let id=arr[i][j];
        document.getElementById(id).classList.add('blue');
        i++;
        j--;

    }
}

function goRightDown(coordinateArr){
    let i=coordinateArr[0];
    let j=coordinateArr[1];
    i++;
    j++;
    while(i<8 && j<8){
        let id=arr[i][j];
        document.getElementById(id).classList.add('blue');
        i++;
        j++;

    }
}


for(let i=1;i<=64;i++){

    const square=document.createElement('div');
    square.classList.add('square');
    square.setAttribute('id',i);
    
    square.addEventListener('click',()=>{
        console.log(square.id);
        drawDiagonal(square.id);
    })

    white=!white;

    if(rowChange){
        white=!white;
        rowChange=false;
    }
    if(i%8==0){
        rowChange=true;
    }

    if(white){
        square.classList.add('white');
    }else{
        square.classList.add('black');
    }
    board.appendChild(square);
}