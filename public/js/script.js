window.onload = function(){
  console.log("script linked");
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("cam1", 5, 2, -15, new BABYLON.Vector3(0,1,0), scene);
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
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../skybox/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;




  // var ground = BABYLON.Mesh.CreateGround("ground", 500,500, 2, scene);
  // ground.checkCollisions = true;

  // var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
  // groundMaterial.diffuseTexture = new BABYLON.Texture("../texture_imgs/dirt_two.jpg", scene);
  // groundMaterial.diffuseTexture.uScale = 1000;
  // groundMaterial.diffuseTexture.vScale = 1000;
  // ground.material = groundMaterial;
//////////////////////////////////////////////////
  // var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
  // var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
  // extraGroundMaterial.diffuseTexture = new BABYLON.Texture("../texture_imgs/dirt_two.jpg", scene);
  // extraGroundMaterial.diffuseTexture.uScale = 60;
  // extraGroundMaterial.diffuseTexture.vScale = 60;
  // extraGround.position.y = -2.05;
  // extraGround.material = extraGroundMaterial;

var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../texture_imgs/hm.png", 800, 800, 500, -25, 25, scene, false);
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

BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.babylon", scene, function (mesh) {
  var m = mesh[0];
  console.log(m);
  m.position.x = 210;
  m.position.z = 220;

  scene.registerBeforeRender(function(){
    camera.target = m

    if (accelerate){
      m.position.z += 0.5
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
    }
    if (breaking) {
      m.position.z -= 0.5
    }
    if (accelerate && left){
      m.rotation.y -= 0.02;
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
    }
    if (accelerate && right) {
      m.rotation.y += 0.02;
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
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
