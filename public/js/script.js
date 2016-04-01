window.onload = function(){
  console.log("script linked");
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

  var game = {
    score: 0,
  };




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

  engine.displayLoadingUI();

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

var fountain = BABYLON.Mesh.CreateBox("foutain", 2.0, scene);
fountain.position.x = 200;
fountain.position.y = 0;
fountain.position.z = 200;
var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
particleSystem.particleTexture = new BABYLON.Texture("../texture_imgs/Flare.png", scene);
particleSystem.emitter = fountain;
particleSystem.minEmitBox = new BABYLON.Vector3(-30, 0, 0); // Starting all from
particleSystem.maxEmitBox = new BABYLON.Vector3(30, 0, 0); // To...
// Size of each particle (random between...
particleSystem.minSize = 0.3;
particleSystem.maxSize = 1.5;

// Life time of each particle (random between...
particleSystem.minLifeTime = 0.8;
particleSystem.maxLifeTime = 2.5;

// Emission rate
particleSystem.emitRate = 1500;
// Angular speed, in radians
particleSystem.minAngularSpeed = 0;
particleSystem.maxAngularSpeed = Math.PI;

// Speed
particleSystem.minEmitPower = 20;
particleSystem.maxEmitPower = 50;
particleSystem.updateSpeed = 0.005;
particleSystem.start();


// imports car mesh from .babylon file, created in Blender
// takes 5 params
BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.babylon", scene, function (mesh) {
  var m = mesh[0];
  console.log(m);
  m.position.x = 190;
  m.position.z = 350;
  camera.target = m
  engine.hideLoadingUI()


  var checkpointReached = function(){
    if (BABYLON.Vector3.Distance(m.position, particleSystem.emitter.position) < 20) {
      switch (game.score) {
        case 0:
        // do the stuff
        fountain.position.x = 267;
        fountain.position.y = 0;
        fountain.position.z = -5;
        game.score += 1;
        break;

        case 1:
        // do the stuff
        fountain.position.x = 267;
        fountain.position.y = 0;
        fountain.position.z = -5;
        game.score += 1;
        break;

        case 2:
        // do the stuff
        fountain.position.x = 125;
        fountain.position.y = 0;
        fountain.position.z = -159;
        game.score += 1;
        console.log("case 2:", fountain.rotation);
        break;

        case 3:
        // do the stuff
        fountain.position.x = -87;
        fountain.position.y = 0;
        fountain.position.z = -218;
        game.score += 1;
        console.log("case 3:", fountain.rotation);
        break;

        case 4:
        // do the stuff
        fountain.position.x = -323;
        fountain.position.y = 0;
        fountain.position.z = -110;
        game.score += 1;
        console.log("case 4:", fountain.rotation);
        break;

        case 5:
        // do the stuff
        fountain.position.x = -321;
        fountain.position.y = 0;
        fountain.position.z = 106;
        game.score += 1;
        break;

        case 6:
        // do the stuff
        fountain.position.x = -262;
        fountain.position.y = 0;
        fountain.position.z = 283;
        game.score += 1;
        break;

        case 7:
        // do the stuff
        fountain.position.x = -79;
        fountain.position.y = 0;
        fountain.position.z = 345;
        game.score += 1;
        break;

        case 8:
        // do the stuff
        fountain.position.x = 112;
        fountain.position.y = 0;
        fountain.position.z = 326;
        game.score += 1;
        console.log("case 8:", fountain.rotation);
        break;

        case 9:
        // do the stuff
        fountain.position.x = 270;
        fountain.position.y = 0;
        fountain.position.z = 231;
        game.score += 1;
        console.log("case 9:", fountain.rotation);
        break;

        case 10:
        // do the stuff
        fountain.position.x = 289;
        fountain.position.y = 0;
        fountain.position.z = 85;
        game.score += 1
        console.log("case 10:", fountain.rotation);

        break;

        case 11:
        // do the stuff
        fountain.position.x = 138;
        fountain.position.y = 0;
        fountain.position.z = -111;
        game.score += 1
        console.log("case 11:", fountain.rotation);

        break;

        case 12:
        // do the stuff
        fountain.position.x = 25;
        fountain.position.y = 0;
        fountain.position.z = -274;
        game.score += 1;
        console.log("case 12:", fountain.rotation);

        break;

        case 13:
        // do the stuff
        fountain.position.x = 129;
        fountain.position.y = 0;
        fountain.position.z = -328;
        game.score += 1;
        console.log("case 13:", fountain.rotation);

        break;

        case 14:
        // do the stuff
        fountain.position.x = 298;
        fountain.position.y = 0;
        fountain.position.z = -321;
        game.score += 1;
        console.log("case 14:", fountain.rotation);
        break;

        case 15:
        // do the stuff
        fountain.position.x = 321;
        fountain.position.y = 0;
        fountain.position.z = -119;
        game.score += 1
        console.log("case 15:", fountain.rotation);

        break;

        case 16:
        // do the stuff
        fountain.position.x = 100;
        fountain.position.y = 0;
        fountain.position.z = -120;
        game.score += 1
        console.log("case 16: ", fountain.rotation);

        break;

        case 17:
        console.log(m.position.x, m.position.z);
        // do the stuff
        fountain.position.x = 12;
        fountain.position.y = 0;
        fountain.position.z = -224;
        game.score += 1
        console.log("case 17");
        break;

        case 18:
        // do the stuff
        console.log(m.position.x, m.position.z);
        fountain.position.x = -186;
        fountain.position.y = 0;
        fountain.position.z = -230;
        game.score += 1
        console.log("case 18:", fountain.rotation);

        break;

        case 19:
        // do the stuff
        fountain.position.x = -301;
        fountain.position.y = 0;
        fountain.position.z = -146;
        game.score += 1
        console.log("case 19:", fountain.rotation);

        break;

        case 20:
        // do the stuff
        fountain.position.x = -343;
        fountain.position.y = 0;
        fountain.position.z = 63;
        game.score += 1
        console.log("case 20:", fountain.rotation);

        break;

        case 21:
        // do the stuff
        fountain.position.x = -290;
        fountain.position.y = 0;
        fountain.position.z = 250;
        game.score += 1
        console.log("case 21:", fountain.rotation);

        break;

        case 22:
        // do the stuff
        fountain.position.x = -87;
        fountain.position.y = 0;
        fountain.position.z = 345;
        game.score += 1
        break;

        case 23:
        // do the stuff
        fountain.position.x = 161;
        fountain.position.y = 0;
        fountain.position.z = 318;
        game.score += 1
        break;

        default:
        return
        break;
      }
    }
  }






  // things to update before each render
  scene.registerBeforeRender(function(){
    checkpointReached()

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
