
var puzzletile;
var puzzle;
var images;
var empty = '300px';
var spaceout = '300px';
var img= "url('wolf.jpg')";

window.onload = function ()
{
    
    setPuzzleTiles();
    shuffle();
    newImg();
    
};

/*Multiple Background Images*/
function newImg(){
  var area = document.getElementById("controls");
  var i=0;
  var btn = document.createElement("BUTTON");
  var p = document.createTextNode("Next Image");
  btn.appendChild(p);
  area.appendChild(btn);
  images= ["url('eye.jpg')","url('nature.jpg')","url('goku.jpg')","url('wolf.jpg')"];
  btn.onclick= function(){
   img= images[i];
   i++;
   if(i>3){
    i=0;
   }
   setPuzzleTiles();

  }
}

/*Set Puzzle Tiles */ 
function setPuzzleTiles(){
    puzzle = document.getElementById('puzzlearea');
    puzzletile = puzzle.getElementsByTagName('div');

    for (var i=0; i<puzzletile.length; i++)
    {
        puzzletile[i].style.backgroundImage=img;
        puzzletile[i].style.backgroundSize ="400px 400px";        
        puzzletile[i].className = 'puzzlepiece';
        puzzletile[i].style.color="white"
        puzzletile[i].style.left = (i%4*100)+'px';
        puzzletile[i].style.top = (parseInt(i/4)*100) + 'px';
        puzzletile[i].webkitTransition = "all 1000ms ease";
        puzzletile[i].mozTransition = "all 1000ms ease";
        puzzletile[i].msTransition = "all 1000ms ease";
        puzzletile[i].oTransition = "all 1000ms ease";
        puzzletile[i].style.transition = "all 1000ms ease";
        puzzletile[i].style.backgroundPosition= '-' + puzzletile[i].style.left + ' ' + '-' + puzzletile[i].style.top;
        puzzletile[i].onmouseover = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        puzzletile[i].onmouseout = function()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        puzzletile[i].onclick = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                if (finish())
                {
                    youWin();
                }
                return;
            }
        };
    }
}


/* Shuffle Puzzle Tiles */
function shuffle(){
    var shuffle = document.getElementById('shufflebutton');
    shuffle.onclick = function()
    {

        for (var i=0; i<250; i++)
        {
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                var mve = mveUp(empty,spaceout);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }
            if (rand == 1)
            {
                var mve = mveDown(empty, spaceout);
                if ( mve != -1) 
                {
                    swap(mve);
                }
            }

            if (rand == 2)
            {
                var mve = mveLeft(empty, spaceout);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }

            if (rand == 3)
            {
                var mve = mveRight(empty, spaceout);
                if (mve != -1)
                {
                    swap(mve);
                }
            }
        }
    };
}

/*Function to Move Tiles */
function move(pos)
{
    if (mveLeft(empty, spaceout) == (pos-1))
    {
        return true;
    }

    if (mveDown(empty, spaceout) == (pos-1))
    {
        return true;
    }

    if (mveUp(empty, spaceout) == (pos-1))
    {
        return true;
    }

    if (mveRight(empty, spaceout) == (pos-1))
    {
        return true;
    }
}


/*Alert when you complete the puzzle */
function youWin()
{
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#0000FF";
    //body[0].style.backgroundImage = "url('winner.jpg')";
    alert('CONGRATULATIONS,YOU WON!!!!');
}

/*Function that test when you have completed the puzzle */
function finish()
{
    var flag = true;
    for (var i = 0; i < puzzletile.length; i++) {
        var y = parseInt(puzzletile[i].style.top);
        var x = parseInt(puzzletile[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

/* Function the controls the puzzle swaps */
function swap (pos) {
    var temp = puzzletile[pos].style.top;
    puzzletile[pos].style.top = spaceout;
    spaceout = temp;

    temp = puzzletile[pos].style.left;
    puzzletile[pos].style.left = empty;
    empty = temp;
}

/* Function to control movement of tiles to the right */
function mveRight (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var i =0; i<puzzletile.length; i++){
            if (parseInt(puzzletile[i].style.left) - 100 == xx && parseInt(puzzletile[i].style.top) == yy) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

/* Function to control movement of tiles to the left */
function mveLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var i = 0; i < puzzletile.length; i++) 
        {
            if (parseInt(puzzletile[i].style.left) + 100 == xx && parseInt(puzzletile[i].style.top) == yy)
            {
                return i;
            } 
        }
    }
    else 
    {
        return -1;
    }
}

/* Function to control downward movement of tiles*/
function mveDown (x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var i=0; i<puzzletile.length; i++)
        {
            if (parseInt(puzzletile[i].style.top) - 100 == yy && parseInt(puzzletile[i].style.left) == xx) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

/* Function to control upward movement of tiles */
function mveUp (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<puzzletile.length; i++)
        {
            if (parseInt(puzzletile[i].style.top) + 100 == yy && parseInt(puzzletile[i].style.left) == xx) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}

