window.onload = function(){
  console.log("script linked");
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);
  var pauseButton = document.getElementById('pause')
  var restartButton = document.getElementById('restart')
  var laps = document.getElementById('laps')
  var highscore = document.getElementById('timescore')

  var time = 7

  var game = {
    score: 0,
    checkpointNumber: 0,
    lapsCompleted: 0,
    pause: false,
    isOver: false,
    checkForTime: function(){
      if (time < 0.5){
        this.endGame()
        this.isOver = true
      }
    },
    endGame: function(){
      if (this.lapsCompleted !== 3){
        highscore.innerHTML = "Game Over! You Lose!";
        this.isOver = true;
        alert("Game Over! You Lose!")
      } else {
        highscore.innerHTML = "Game Over! Your score is: " + Math.round(time);
        this.isOver = true
        alert("Game Over! Nice Job!")
      }
    }

  };


var checkLaps = function(){
  if (game.score === 25){
    game.lapsCompleted = 1
  }
  if (game.score === 49) {
    game.lapsCompleted = 2
  }
  if (game.score === 74) {
    game.lapsCompleted = 3;
    game.endGame();
    game.isOver = true;
  }
  laps.innerHTML = "Laps Completed: " + game.lapsCompleted + "/3";
}

  pauseButton.addEventListener('click', function(){
    game.pause = !game.pause;
    console.log(game.pause);
  })
  restartButton.addEventListener('click', function(){
    window.location.reload()
  })



var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("cam1", -1.5, 1.7179, -40, new BABYLON.Vector3(0,1,0), scene);

    // free camera for looking around entire area, not attached to mesh
    // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // // This targets the camera to scene origin
    // // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);
    // camera.checkCollisions = true;

  engine.displayLoadingUI();
  // scene.enablePhysics();

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

  var water = BABYLON.Mesh.CreateGround("water", 2000,2000, 0, scene, false);
  var waterMaterial = new BABYLON.StandardMaterial("water", scene, new BABYLON.Vector2(512, 512))
  waterMaterial.diffuseTexture = new BABYLON.Texture("../texture_imgs/water.jpg", scene);
  waterMaterial.diffuseTexture.uScale = 25;
  waterMaterial.diffuseTexture.vScale = 25;
  waterMaterial.bumpTexture = new BABYLON.Texture("texture_imgs/waterNormal.png", scene);
  water.material = waterMaterial;


  var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../texture_imgs/hm.png", 800, 800, 500, 10.09, 68, scene, false);
  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("../texture_imgs/dirt_two.jpg", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.position.y = -10.05;
  ground.material = groundMaterial;
  ground.checkCollisions = true;

var boulder = BABYLON.Mesh.CreateSphere("sphere1", 16, 14, scene);
var boulderMat = new BABYLON.StandardMaterial("marker", scene)
boulder.material = boulderMat
boulderMat.diffuseTexture = new BABYLON.Texture("../texture_imgs/dirt_two.jpg", scene);
boulderMat.diffuseTexture.uScale = 6;
boulderMat.diffuseTexture.vScale = 6;
boulder.position.x = 245;
boulder.position.y = 2;
boulder.position.z = 195;



var timeBillboard = BABYLON.Mesh.CreatePlane("timeBillboard", 85, scene, false);
timeBillboard.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
timeBillboard.material = new BABYLON.StandardMaterial("timeBillboard", scene);
timeBillboard.position = new BABYLON.Vector3(-25, 65, 25);
timeBillboard.scaling.y = 0.3;
timeBillboard.scaling.x = 0.7;

var timeBillboardTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
timeBillboard.material.diffuseTexture = timeBillboardTexture;
timeBillboard.material.specularColor = new BABYLON.Color3(0, 0, 0);
timeBillboard.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
timeBillboard.material.backFaceCulling = false;

timeBillboardTexture.drawText("Time Remaining", null, 145, "bold 44px verdana", "white", "#000000");
var context2D = timeBillboardTexture.getContext();
var updateTimeText = function(data) {
  context2D.clearRect(0, 200, 512, 512);
  timeBillboardTexture.drawText(data, null, 380, "140px verdana", "white", null);
}


var checkpoint = BABYLON.Mesh.CreateBox("checkpoint", 2.0, scene);
checkpoint.position.x = 200;
checkpoint.position.y = 0;
checkpoint.position.z = 200;
var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
particleSystem.particleTexture = new BABYLON.Texture("../texture_imgs/Flare.png", scene);
particleSystem.emitter = checkpoint;
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
BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.babylon", scene, function (mesh) {
  var m = mesh[0];
  console.log(m);
  m.position.x = 190;
  m.position.z = 350;
  camera.target = m
  engine.hideLoadingUI()


  var checkWater = function(){
    if (m.position.y === 1){
      game.endGame()
    }
  }


  var checkpointReached = function(){
    if (BABYLON.Vector3.Distance(m.position, particleSystem.emitter.position) < 20) {

      switch (game.checkpointNumber) {

        case 0:
        time += 2
        checkpoint.position.x = 267;
        checkpoint.position.y = 0;
        checkpoint.position.z = -5;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 1:
        time += 2
        checkpoint.position.x = 267;
        checkpoint.position.y = 0;
        checkpoint.position.z = -5;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 2:
        time += 2
        checkpoint.rotation.y = 1
        checkpoint.position.x = 125;
        checkpoint.position.y = 0;
        checkpoint.position.z = -159;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 3:
        time += 2
        checkpoint.rotation.y = 2
        checkpoint.position.x = -87;
        checkpoint.position.y = 0;
        checkpoint.position.z = -218;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 4:
        time += 2
        checkpoint.position.x = -323;
        checkpoint.position.y = 0;
        checkpoint.position.z = -110;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 5:
        time += 2
        checkpoint.rotation.y = 3
        checkpoint.position.x = -321;
        checkpoint.position.y = 0;
        checkpoint.position.z = 106;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 6:
        checkpoint.position.x = -262;
        checkpoint.position.y = 0;
        checkpoint.position.z = 283;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 7:
        time += 2
        checkpoint.rotation.y = 5
        checkpoint.position.x = -79;
        checkpoint.position.y = 0;
        checkpoint.position.z = 345;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 8:
        time += 2
        checkpoint.rotation.y = 5
        checkpoint.position.x = 112;
        checkpoint.position.y = 0;
        checkpoint.position.z = 326;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 9:
        time += 2
        checkpoint.position.x = 270;
        checkpoint.position.y = 0;
        checkpoint.position.z = 231;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 10:
        // NEEDS ROTATION
        time += 2
        checkpoint.position.x = 289;
        checkpoint.position.y = 0;
        checkpoint.position.z = 85;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 11:
        time += 2
        checkpoint.position.x = 138;
        checkpoint.position.y = 0;
        checkpoint.position.z = -111;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 12:
        time += 2
        checkpoint.position.x = 25;
        checkpoint.position.y = 0;
        checkpoint.position.z = -274;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 13:
        time += 2
        checkpoint.position.x = 129;
        checkpoint.position.y = 0;
        checkpoint.position.z = -328;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 14:
        time += 2
        checkpoint.position.x = 298;
        checkpoint.position.y = 0;
        checkpoint.position.z = -321;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 15:
        time += 2
        checkpoint.position.x = 321;
        checkpoint.position.y = 0;
        checkpoint.position.z = -119;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 16:
        time += 2
        checkpoint.position.x = 100;
        checkpoint.position.y = 0;
        checkpoint.position.z = -120;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 17:
        time += 2
        checkpoint.position.x = 12;
        checkpoint.position.y = 0;
        checkpoint.position.z = -224;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 18:
        time += 2
        checkpoint.position.x = -186;
        checkpoint.position.y = 0;
        checkpoint.position.z = -230;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 19:
        time += 2
        checkpoint.position.x = -301;
        checkpoint.position.y = 0;
        checkpoint.position.z = -146;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 20:
        time += 2
        checkpoint.position.x = -343;
        checkpoint.position.y = 0;
        checkpoint.position.z = 63;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 21:
        time += 2
        checkpoint.position.x = -290;
        checkpoint.position.y = 0;
        checkpoint.position.z = 250;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 22:
        time += 2
        checkpoint.position.x = -87;
        checkpoint.position.y = 0;
        checkpoint.position.z = 345;
        game.score += 1;
        game.checkpointNumber += 1;
        break;

        case 23:
        time += 2
        checkpoint.position.x = 161;
        checkpoint.position.y = 0;
        checkpoint.position.z = 318;
        game.score += 1
        game.checkpointNumber = 0;
        break;

        default:
        return
        break;
      }
    }
  }

  // things to update before each render
  scene.registerBeforeRender(function(){
    checkWater()
    checkpointReached()
    checkLaps()
    game.checkForTime()
    // var bb = time=time+(1/BABYLON.Tools.GetFps())
    var updatedTime = Math.round(time -= 0.02)

    updateTimeText(updatedTime)
    timeBillboard.position.x = checkpoint.position.x
    timeBillboard.position.z = checkpoint.position.z
    timeBillboard.position.y = 30


    var waterray = new BABYLON.Ray(new BABYLON.Vector3(m.position.x, water.getBoundingInfo().boundingBox.maximumWorld.y + 1, m.position.z), new BABYLON.Vector3(0,-1,0)); // direction
    var waterworldInverse = new BABYLON.Matrix();
    water.getWorldMatrix().invertToRef(waterworldInverse);
    waterray = BABYLON.Ray.Transform(waterray, waterworldInverse);
    var waterpickInfo = water.intersects(waterray);
    if (waterpickInfo.hit) {
      m.position.y = waterpickInfo.pickedPoint.y + 1;
    }


    // Ray constructor takes 3 params (origin, direction, and length)
    // origin is type vector
    // direction is type vector, describes direction of Ray
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


    ////////////////////////////////////////////
    /// http://www.html5gamedevs.com/topic/2264-move-forward-and-rotation/
    /// reference for using math.cos and math.sin
    ////////////////////////////////////////////

    if (accelerate){
      m.position.z -= Math.cos(m.rotation.y) * 2.2;
      m.position.x -= Math.sin(m.rotation.y) * 2.2;
    }
    if (reverse) {
      m.position.z += Math.cos(m.rotation.y);
      m.position.x += Math.sin(m.rotation.y);
    }
    if (left){
      m.rotation.y -= 0.02;
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
      scene.activeCamera.alpha += 0.02;
    }
    if (right) {
      m.rotation.y += 0.02;
      m.position.z -= Math.cos(m.rotation.y);
      m.position.x -= Math.sin(m.rotation.y);
      scene.activeCamera.alpha -= 0.02;
    }
  })
})

// keys
var speed = 0;
var left = false;
var right = false;
var accelerate = false;
var reverse = false;

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
    reverse = false;
  }
  if (event.keyCode === 40) {
    accelerate = false;
    reverse = true;
  }
}); // end of keydown event listener

window.addEventListener("keyup", function(event){
  if (event.keyCode == 37 || event.keyCode === 39){
      left = false;
      right = false;
  }
  if (event.keyCode == 38 || event.keyCode === 40){
      accelerate = false;
      reverse = false;
  }

})

  // returns created scene
  return scene;
} // end of createScene

// call the createScene function
var scene = createScene();

// run the render loop
engine.runRenderLoop(function () {
  if (!game.pause && game.isOver === false) {
    scene.render()
  } else {
    return
  }
});

//the canvas/window resize event handler
window.addEventListener('resize', function(){
  engine.resize();
});

} // end of window.onload
