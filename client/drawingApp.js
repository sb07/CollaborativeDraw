points = new Meteor.Collection('pointsCollection');
Large = new Meteor.Collection('saves');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data);
    }
  });
});

Template.wall.helpers({
    saved:function(){
      return Large.find().fetch();
    }
  })

Template.wall.events({
  "click .new": function(){
    //clear points
    while (points.findOne())
   {
    var id = points.findOne()._id;
    points.remove({_id:id});
   }
   var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data);
    }
   var count = Large.find().fetch();
   count = count.length;
   new_id = "canvas" + String(count);
   data = [];
   Large.update({_id:new_id},{data: data},{upsert:true});
   //could set session for canvas name
   Session.set("canvasId",new_id);
   var sess = Session.get("canvasId");
   $( ".can_name" ).html( sess );

  },

  "click .available_saves": function (event){
    console.log(event.currentTarget.innerHTML);
    var ident = event.currentTarget.innerHTML;

    //clear points
    while (points.findOne())
   {
    var id = points.findOne()._id;
    points.remove({_id:id});
   }
   var data = points.find({}).fetch();

   //Meteor.call('clear', function() {
   canvas.clear();
    //});

    //if (canvas) {
      //canvas.draw(data);
    //}

   //load points
   var d = Large.find({_id:ident}).fetch()[0].data;
   //console.log(d);

   var x =0;
   while ( x<d.length)
   {
    var y = d[x];
    //console.log(d[x]);
    points.insert(y);
    x++;
   }

   //draw
   var data = points.find({}).fetch();
   if (canvas) {
      canvas.draw(data);
    }

   //set session canvas name
   Session.set("canvasId",ident);
   var sess = Session.get("canvasId");
   $( ".can_name" ).html( sess );

  },


  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.
  "click .save": function() {
    savef();
    var sess = Session.get("canvasId");
   $( ".can_name" ).html( sess );

  },

  "click .load":function(){
   // take form input
   //var input = save_id//

   //clear points
   //hit clear button
   while (points.findOne())
   {
    var id = points.findOne()._id;
    points.remove({_id:id});
   }
   console.log(points.find());
   //while (points.findOne())
   //{
    //var id = points.findOne()._id
    //points.remove({id})
   //}
   
   //load points
   var d = Large.find({_id:"test"}).fetch()[0].data;
   console.log(d);

   var x =0;
   while ( x<d.length)
   {
    var y = d[x];
    console.log(d[x]);
    points.insert(y);
    x++;
   }

   

   
    
    //if (canvas) {
      //canvas.draw(data);

    //set points = data

  },

  "click .red": function () {
    lastX=0;
    lastY=0;
    strokeColor = "red";
  },

  "click .black": function () {
    lastX=0;
    lastY=0;
    strokeColor = "black";
  },

  "click .white": function () {
    lastX=0;
    lastY=0;
    strokeColor = "white";
  },

  "click .blue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "blue";
  },

  "click .green": function () {
    lastX=0;
    lastY=0;
    strokeColor = "green";
  },

  //
  "click .cyan": function () {
    lastX=0;
    lastY=0;
    strokeColor = "cyan";
  },

  "click .gray": function () {
    lastX=0;
    lastY=0;
    strokeColor = "gray";
  },
  "click .orange": function () {
    lastX=0;
    lastY=0;
    strokeColor = "orange";
  },
  "click .gold": function () {
    lastX=0;
    lastY=0;
    strokeColor = "gold";
  },
  "click .indigo": function () {
    lastX=0;
    lastY=0;
    strokeColor = "indigo";
  },
  "click .maroon": function () {
    lastX=0;
    lastY=0;
    strokeColor = "maroon";
  },
  "click .lime": function () {
    lastX=0;
    lastY=0;
    strokeColor = "lime";
  },
  "click .magenta": function () {
    lastX=0;
    lastY=0;
    strokeColor = "magenta";
  },
  "click .brown": function () {
    lastX=0;
    lastY=0;
    strokeColor = "brown";
  },
  "click .navy": function () {
    lastX=0;
    lastY=0;
    strokeColor = "navy";
  },
  "click .pink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "pink";
  },

  "click button.thicker": function () {

    thickness+=1;

  },

  "click button.thinner": function () {
    
    if (thickness > 0) {
      thickness-=1;
    }
  },

  "click .download_canvas": function () {
  alert( "first click" );
  var canvas = document.getElementById("canvas");
  //multiple users same url
  var img    = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  console.log(img);
  window.location.href = img;
  $( "#element-to-write-to" ).attr( "href", "image/png" );
  //window.location.href = image;
  //
  //$("#elememt-to-write-to").html('<img src="'+img+'"/>');
  $("#elememt-to-write-to").click(function() {
    alert( "Handler for .click() called." );
    });

  }


})

var savef = function() {
  var data = points.find({}).fetch();
  //console.log(data);
    //counter = Large.find().fetch().count()
    canvasn = Session.get("canvasId");
  Large.update({_id:canvasn},{data: data},{upsert:true});

}

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        // We could calculate the line thickness from the distance
        // between current position and last position
        //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,


      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});
