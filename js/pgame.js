/** Penguin game */
alert("Use the arrow keys to play The Penguin game!");

var mypenguin;
var myobstacles=[];
var floor;
var water;
var ground=[[500,240]];
var lastx=0;
var currentx;
var falldown=0;
var penguinh=32;
var babypenguins=[];
var myscore;

function startgame() {
    gameover();
    myobstacles=[];
    babypenguins=[];
    mypenguin = new component(30,30,"./images/favicon-32x32.png",250,120,"myimage");
    floor = new component(500,10,"white",0,240,"floor");
    water = new component(500,10,"aqua",0,250);
    myscore = new component("20px","Helvetica","black",30,30,"text");
    mygamearea.start();
}

var mygamearea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.points=0
        this.canvas.width=500;
        this.canvas.height=260;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas)
        /**document.body.insertBefore(this.canvas,document.body.childNodes[0]);*/
        this.frameno=0;
        this.interval=setInterval(updategamearea,5);
        window.addEventListener('keydown', function(e) {
            mygamearea.keys = (mygamearea || []);
            mygamearea.keys[e.code] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function(e) {
            mygamearea.keys[e.code] = (e.type == "keydown");
        })
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width,height,color,x,y,type) {
    this.width = width;
    this.height = height;
    this.type = type;
    if (type==="myimage") {
        this.image=new Image();
        this.image.src=color;
        this.stop=0;
    }
    if (type==="image") {
        this.image=new Image();
        this.image.src=color;
    }
    this.speedx = 0;
    this.speedy = 0;
    this.x = x;
    this.y = y;
    this.jump=0;
    this.jumpstart=1;
    this.belly=0;
    this.melted=0;
    this.update = function() {
        ctx = mygamearea.context;
        if (type==="floor") {
            ctx.fillStyle=color;
            ctx.fillRect(this.x+this.melted,this.y, this.width,this.height); 
        } else if (type==="image" || type==="myimage") { 
            ctx.drawImage(this.image,this.x,this.y);
        } else if (type==="text") { 
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle=color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        /**ctx.fillStyle=color
        ctx.fillRect(this.x,this.y, this.width,this.height); */
    }
    this.newpos = function() {
        if (this.x<10 && this.speedx>0) {
            this.x += this.speedx;
        } else if (this.x>400 && this.speedx<0) {
            this.x += this.speedx;

        } else if (this.x>5 && this.x<405) {
            this.x += this.speedx;
        }
        this.y += this.speedy;
    }
    this.newposo = function() {
        if (mypenguin.stop===0) {
             this.x += this.speedx;
        }
        this.y += this.speedy;
    }
}
function clear() {
    mygamearea.clear();
}
function updategamearea() {
    mypenguin.stop=0;
    if (mypenguin.y>250) {
        mygamearea.stop();
        gameover();
        return;
    }
    mygamearea.clear();
    if (mygamearea.keys && mygamearea.keys["ArrowLeft"]) {mypenguin.speedx = -1; }
    if (mygamearea.keys && mygamearea.keys["ArrowRight"]) {mypenguin.speedx = 1; }
    if (mygamearea.keys && mygamearea.keys["ArrowUp"]) {
        if (mypenguin.speedy===0) {
            mypenguin.jumpstart=0;
        }
    }
    /**if (mygamearea.keys && mygamearea.keys[40]) {mypenguin.speedy = 1; }*/

    jumper()
    if (mypenguin.jumpstart===1) {
        faller();
    }
    water.update();
    floor.update();
    mygamearea.frameno+=1;
    if (everyinterval(140)) {
        mygamearea.points += 1;
        var boxheight = 20;
        if (myobstacles.length>0) {
            if (myobstacles[myobstacles.length-1].x>450) {
                boxheight = 50;
            }
        }
        if (babypenguins.length>0) {
            if (babypenguins[0].x<450) {
                myobstacles.push(new component(20, boxheight, "white", 500, 240-boxheight));
            }
        } else {
            myobstacles.push(new component(20, boxheight, "white", 500, 240-boxheight));
        }
    }
    if (everyinterval(250)) {
        if (myobstacles.length>0) {
            if (myobstacles[0].x>470) {
                babypenguins.push(new component(20,20,"./images/bp-16x16.png",500,myobstacles[0].y-16,"image"));
            } else {
                babypenguins.push(new component(20,20,"./images/bp-16x16.png",500,224,"image"));           
            }
        } else {
            babypenguins.push(new component(20,20,"./images/bp-16x16.png",500,224,"image"));
        }
    }
    for (ii=0;ii<myobstacles.length;ii++) {
        myobstacles[ii].speedx = 0;
        if (mypenguin.x+33>myobstacles[ii].x && mypenguin.x+31<myobstacles[ii].x && mypenguin.speedx>0 && mypenguin.y+32>myobstacles[ii].y) {
            mypenguin.speedx=0;
            mypenguin.stop=1;
        } else if (mypenguin.x>200 && mypenguin.speedx>0 && floor.melted>0) {
            myobstacles[ii].speedx = -1;
        }
    }
    for (ii=0;ii<babypenguins.length;ii++) {
        babypenguins[ii].speedx = 0;
        if (mypenguin.x>200 && mypenguin.speedx>0 && floor.melted>0) {
            babypenguins[ii].speedx = -1;
        }
    }
    for (ii=0;ii<myobstacles.length;ii++) {
        myobstacles[ii].newposo();
        myobstacles[ii].update();
        if (myobstacles[ii].x<floor.x+floor.melted) {
            var removed=myobstacles.splice(0,ii+1);
        }
    }
    for (ii=0;ii<babypenguins.length;ii++) {
        babypenguins[ii].newposo();
        babypenguins[ii].update();
        babypenguins[ii].speedy=0
        if (babypenguins[ii].x+16<floor.x+floor.melted) {
            babypenguins[ii].speedy=1
        }
        if (babypenguins[ii].y>260) {
            var removed=babypenguins.splice(0,ii+1);
            mygamearea.stop();
            gameover();
            return;
        }
        if (babypenguins[ii].x>mypenguin.x && babypenguins[ii].x+16<mypenguin.x+32 && babypenguins[ii].y<mypenguin.y+32) {
            var removed=babypenguins.splice(ii,ii+1);
            mygamearea.points += 10;
        }
    }
    if (mypenguin.x>200 && mypenguin.speedx>0 && floor.melted>0) {
        floor.melted -= 0.5;
    } else {
        floor.melted += 0.5;
    }
    mypenguin.newpos();
    mypenguin.update();
    mypenguin.speedx=0;
    myscore.text=mygamearea.points+" Points";
    myscore.update();
    /**mypenguin.speedy=0*/
}

function jumper() {
    if (mypenguin.jumpstart===0) {
        mypenguin.jump += 1;
    }
    if (mypenguin.jump>0) {
        mypenguin.jump += 1;
        mypenguin.speedy = -2;
    }
    if (mypenguin.jump>50) {
        mypenguin.jump = 0;
        mypenguin.jumpstart = 1;
        mypenguin.speedy = 0;
    }
}
/**&& mypenguin.x<myobstacles.x+10 */
function faller() {
    lastx=0;
    falldown=0;
    for (ii=0;ii<ground.length;ii++) {
        currentx=ground[ii][0];
        if (mypenguin.x>lastx && mypenguin.x<=currentx) {
            if ((mypenguin.y+penguinh)<ground[ii][1]) {
                falldown=1;
            }
        }
        if (mypenguin.x<floor.melted) {
            falldown=1;
        }
        lastx=ground[ii][0];
    }
    for (jj=0;jj<myobstacles.length;jj++) {
        if (mypenguin.x+32>myobstacles[jj].x && mypenguin.x <myobstacles[jj].x+20) {
            falldown = 0;
            if (mypenguin.y+32<myobstacles[jj].y) {
                falldown = 1;
            }
        }
    }

    if (falldown>0) {
        mypenguin.speedy=1;
    } else {
        mypenguin.speedy=0;
    }
}

function everyinterval(n) {
    if ((mygamearea.frameno / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    /**mypenguin.speedy = -1; */
    if (mypenguin.speedy===0) {
        mypenguin.jumpstart=0;
    }
}

function movedown() {
    mypenguin.speedy = 0;
    mypenguin.belly=1;
}

function moveleft() {
    mypenguin.speedx = -1; 
}

function moveright() {
    mypenguin.speedx = 1; 
}

function clearmove() {
    mypenguin.speedx = 0; 
    mypenguin.speedy = 0;
    mypenguin.jumpstart=1;
    mypenguin.belly=1;
}

function gameover() {
    var over = document.getElementById("gameover")
    if (over.style.display==="none") {
        over.style.display = "block";
    } else {
        over.style.display = "none";
    }
}