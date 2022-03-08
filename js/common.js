
/** noddies */
function myFunction() {
  var random=Math.random()
  if (random>0.5) {
    document.getElementById("myid").innerHTML="changed";
  } else {
     document.getElementById("myid").innerHTML="blah";
  }
}

/* function goback() {
  var slid=document.getElementById("slider")
}
function cimages()  {
  this.imagecount=1
}
var images = {
  canvas = document.createElement("canvas"),
  start : function() {
    this.canvas.height=500;
    document.body.appendChild(this.canvas);
    window.addEventListener('keyup', function(e) {
      mygamearea.keys[e.code] = (e.type == "keydown");
  })
  }
}

function startimages() {
  images.start()
}
 */
/** show the time */
var showtime = function() {
  var clock=document.getElementById("clock")
  var currenttime = new Date()
  var hours=currenttime.getHours()
  var mins=currenttime.getMinutes()
  var secs=currenttime.getSeconds()
  hours=addzero(hours)
  mins=addzero(mins)
  secs=addzero(secs)
  clock.innerText=hours+":"+mins+":"+secs
}
var addzero = function(data) {
  if (data.toString().length < 2) {
    return "0"+data
  } else {
    return data
  }
}
var updateclock = function() {
  showtime()
}
var second=1000
setInterval(updateclock,second)

/** animated thing */

/** select */
input.onfocus = function () {
    datalist.style.display="block";
}

for (let option of datalist.options) {
    option.onclick = function () {
      input.value = this.value;
      datalist.style.display="block";
    }
}

/**datalist.style.width = input.offsetWidth + 'px';*/
datalist.style.width = '100px';
datalist.style.left = input.offsetLeft + 'px';
datalist.style.top = input.offsetTop + input.offsetHeight + 'px';

/** datalist */
alert("This alert box was BLEH")
input.onfocus = function () {
    datalist.style.display="block";
}

for (let option of datalist.options) {
    option.onclick = function () {
      input.value = this.value;
      datalist.style.display="block";
    }
}
  
/**datalist.style.width = input.offsetWidth + 'px';*/
datalist.style.width = '100px';
datalist.style.left = input.offsetLeft + 'px';
datalist.style.top = input.offsetTop + input.offsetHeight + 'px';