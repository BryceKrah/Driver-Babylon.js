window.onload = function(){
  console.log("script linked");
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);

  var createScene = function(){
    var scene = new BABYLON.Scene(engine);

    // creates a FreeCamera (first person), and sets position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10), scene);
    camera.checkCollisions = true;

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);


    // takes in 5 paramaters - (name for mesh, folder or path, filename, scene to render to, and callback)
    BABYLON.SceneLoader.ImportMesh("", "../assets/", "car.babylon", scene, function (meshes) {
      var m = meshes[0];
      // m.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
      camera.target = m;
      console.log(m);
    }); // end of SceneLoader

  // creates built in "ground" shape - takes 5 params (name, width, depth, subdivisions, scene)
  var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene);
  ground.checkCollisions = true;

  // returns created scene
  return scene;
  } // end of createScene

  // call the createScene function
  var scene = createScene();

  // run the render loop
  engine.runRenderLoop(function () {
    scene.render()
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
    engine.resize();
  });


} // end of window.onload
