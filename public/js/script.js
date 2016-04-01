window.onload = function(){
  console.log("script linked");
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("cam1", -1.5, 1.8479, -35, new BABYLON.Vector3(0,1,0), scene);
    // camera.applyGravity = true;
    // camera.checkCollisions = true;

  // free camera for looking around entire area, not attached to mesh
  // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  // // This targets the camera to scene origin
  // camera.setTarget(BABYLON.Vector3.Zero());
  // // This attaches the camera to the canvas
  // camera.attachControl(canvas, true);


  var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(-100,150,10), scene);


    // Skybox
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../skybox/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;


var grass = BABYLON.Mesh.CreateGround("grass", 2000,2000, 0, scene, false);
var grassMaterial = new BABYLON.StandardMaterial("grassMat", scene);
grassMaterial.diffuseTexture = new BABYLON.Texture("../texture_imgs/water.jpg", scene);
grassMaterial.diffuseTexture.uScale = 25;
grassMaterial.diffuseTexture.vScale = 25;
grass.material = grassMaterial;



var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../texture_imgs/hm.png", 800, 800, 500, 10.09, 68, scene, false);
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("../texture_imgs/dirt_two.jpg", scene);
groundMaterial.diffuseTexture.uScale = 6;
groundMaterial.diffuseTexture.vScale = 6;
groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
ground.position.y = -10.05;
ground.material = groundMaterial;
////////////////////////////////////////////
/// http://www.html5gamedevs.com/topic/2264-move-forward-and-rotation/
/// reference for using math.cos and math.sin


// imports car mesh from .babylon file, created in Blender
// takes 5 params
BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.babylon", scene, function (mesh) {
  var m = mesh[0];
  console.log(m);
  m.position.x = 210;
  m.position.z = 220;
  camera.target = m
  // things to update before each render
  scene.registerBeforeRender(function(){
    // Ray constructor takes 3 params (origin, direction, and length)
    // origin is type vector
    // direction is type vector, describes directino of Ray
    // length is optional param
    var ray = new BABYLON.Ray(new BABYLON.Vector3(m.position.x, ground.getBoundingInfo().boundingBox.maximumWorld.y + 1, m.position.z), new BABYLON.Vector3(0,-1,0)); // direction

    // creates a new 4 by 4 matrix
    var worldInverse = new BABYLON.Matrix();

    // inverts matrix and puts it into another matrix
    ground.getWorldMatrix().invertToRef(worldInverse);

    // Ray.Transform takes 2 params (ray, matrix)
    // the given ray
    // the given matrix to apply
    ray = BABYLON.Ray.Transform(ray, worldInverse);

    // setting var for where the ground will intersect with the ray being cast by car
    var pickInfo = ground.intersects(ray);

    // hit is boolean that returns true if touched
    if (pickInfo.hit) {
      m.position.y = pickInfo.pickedPoint.y + 1;
    }

    if (accelerate){
      m.position.z -= Math.cos(m.rotation.y) * 2.2;
      m.position.x -= Math.sin(m.rotation.y) * 2.2;
    }

    if (breaking) {
      m.position.z += Math.cos(m.rotation.y);
      m.position.x += Math.sin(m.rotation.y);
    }
    if (accelerate && left){
      m.rotation.y -= 0.02;
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
      scene.activeCamera.alpha += 0.02;
      // pans camera to stay behind car while turning
    }
    if (accelerate && right) {
      m.rotation.y += 0.02;
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
      scene.activeCamera.alpha -= 0.02;
      // pans camera to stay behind car while turning
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
