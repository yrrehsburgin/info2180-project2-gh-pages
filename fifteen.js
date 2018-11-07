var tile;
var image;
var timer;
var empty = '300px';
var freeSpace1 = '300px';
var sessionStart = false;

window.onload = function ()
{
    setTiles();
    shuffle();
    

};



function setTiles(){
    var puzzle = document.getElementById('puzzlearea');
    
    tile = puzzle.getElementsByTagName('div');

    for (var i=0; i<tile.length; i++)
    {
        tile[i].style.backgroundImage="url('wolf.jpg')";
        tile[i].style.backgroundSize ="400px 400px";        
        tile[i].className = 'puzzlepiece';
        tile[i].style.left = (i%4*100)+'px';
        tile[i].style.top = (parseInt(i/4)*100) + 'px';
        tile[i].webkitTransition = "all 1000ms ease";
        tile[i].mozTransition = "all 1000ms ease";
        tile[i].msTransition = "all 1000ms ease";
        tile[i].oTransition = "all 1000ms ease";
        tile[i].style.transition = "all 1000ms ease";
        tile[i].style.backgroundPosition= '-' + tile[i].style.left + ' ' + '-' + tile[i].style.top;
        tile[i].onmouseover = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        tile[i].onmouseout = function()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        tile[i].onclick = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                if (finish())
                {
                    Gamewin();
                }
                return;
            }
        };
    }
}

function newImage(){
    var newImage = document.getElementById('newimg');
    newImage.onclick = function()
    {
        
    }
}
function shuffle(){
    var shuffle = document.getElementById('shufflebutton');
    shuffle.onclick = function()
    {

        for (var i=0; i<250; i++)
        {
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                var mve = mveUp(empty, freeSpace1);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }
            if (rand == 1)
            {
                var mve = mveDown(empty, freeSpace1);
                if ( mve != -1) 
                {
                    swap(mve);
                }
            }

            if (rand == 2)
            {
                var mve = mveLeft(empty, freeSpace1);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }

            if (rand == 3)
            {
                var mve = mveRight(empty, freeSpace1);
                if (mve != -1)
                {
                    swap(mve);
                }
            }
        }
    };
}

function move(pos)
{
    if (mveLeft(empty, freeSpace1) == (pos-1))
    {
        return true;
    }

    if (mveDown(empty, freeSpace1) == (pos-1))
    {
        return true;
    }

    if (mveUp(empty, freeSpace1) == (pos-1))
    {
        return true;
    }

    if (mveRight(empty, freeSpace1) == (pos-1))
    {
        return true;
    }
}

function Gamewin()
{
    var body = document.getElementsByTagName('body');
    body[0].style.background = "#FF0000";
    image = 10;
    timer = setTimeout(win, 100);
    var newtimer = setTimeout(reload, 2000);
}

function finish()
{
    var flag = true;
    for (var i = 0; i < tile.length; i++) {
        var y = parseInt(tile[i].style.top);
        var x = parseInt(tile[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

function swap (pos) {
    var temp = tile[pos].style.top;
    tile[pos].style.top = freeSpace1;
    freeSpace1 = temp;

    temp = tile[pos].style.left;
    tile[pos].style.left = empty;
    empty = temp;
}

function mveRight (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var i =0; i<tile.length; i++){
            if (parseInt(tile[i].style.left) - 100 == xx && parseInt(tile[i].style.top) == yy) 
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
function mveLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var i = 0; i < tile.length; i++) 
        {
            if (parseInt(tile[i].style.left) + 100 == xx && parseInt(tile[i].style.top) == yy)
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


function mveDown (x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var i=0; i<tile.length; i++)
        {
            if (parseInt(tile[i].style.top) - 100 == yy && parseInt(tile[i].style.left) == xx) 
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

function mveUp (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<tile.length; i++)
        {
            if (parseInt(tile[i].style.top) + 100 == yy && parseInt(tile[i].style.left) == xx) 
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

