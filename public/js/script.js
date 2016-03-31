window.onload = function(){
  console.log("script linked");
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  // var camera = new BABYLON.ArcRotateCamera("arcCamera", 0,10, -10, new BABYLON.Vector3(0,1,0), scene);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.applyGravity = true;
    camera.checkCollisions = true;
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

  var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(-100,150,10), scene);

  var ground = BABYLON.Mesh.CreateGround("ground", 250,250, 2, scene);
  ground.checkCollisions = true;


BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.babylon", scene, function (mesh) {
  var m = mesh[0];
  console.log(m);
  m.position.x = 0

  scene.registerBeforeRender(function(){
    camera.target = m.position

    if (accelerate){
      m.position.z += 0.5
    }
    if (breaking) {
      m.position.z -= 0.5
    }

  })
})

// keys
var left = false;
var right = false;
var accelerate = false;
var breaking = false;

// left arrow = 37
// up arrow = 38
// right arrow = 39
// down arrow = 40

window.addEventListener("keydown", function(event){
  if (!scene){
    return;
  }
  if (event.keyCode === 37) {
    left = true;
    right = false;
  }
  if (event.keyCode === 39) {
    left = false;
    right = true;
  }
  if (event.keyCode === 38) {
    accelerate = true;
    breaking = false;
  }
  if (event.keyCode === 40) {
    accelerate = false;
    breaking = true;
  }
}); // end of keydown event listener

window.addEventListener("keyup", function(event){
  if (event.keyCode == 37 || event.keyCode === 39){
      left = false;
      right = false;
  }
  if (event.keyCode == 38 || event.keyCode === 40){
      accelerate = false;
      breaking = false;
  }

})

  // returns created scene
  return scene;
} // end of createScene

// call the createScene function
var scene = createScene();

// run the render loop
engine.runRenderLoop(function () {
  scene.render();
});
//the canvas/window resize event handler
window.addEventListener('resize', function(){
  engine.resize();
});

} // end of window.onload
