const WIDTH = window.innerWidth - 15;
const HEIGHT = window.innerHeight - 100;

const URL = "https://a1pha1337.github.io/ComputerGraphics/"

// Load .obj model with .mtl
function loadMTLplusOBJ(mtlURL, objURL, loadFunction) {
	const objLoader = new THREE.OBJLoader();
	const mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(mtlURL, (materials) => {
		materials.preload();
		objLoader.setMaterials(materials);
		
		objLoader.load(objURL, loadFunction);
	})
}

function main() {
	// Create scene, camera and render
	var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    const FOV = 90;
	const ASPECT = WIDTH/HEIGHT;
	const NEAR = 0.1;
    const FAR = 1000;
    
    var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    camera.position.z = -5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Camera controls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
    
    // loadMTLplusOBJ(URL + "materials/shop.mtl", URL + "objects/shop.obj", (shop)=>{
    //     scene.add(shop);
    // });

    const objLoader = new THREE.OBJLoader();

    objLoader.load(URL + "objects/shop.obj", (root)=>{
        scene.add(shop);
    });

    // var lampIntensity = 0.9;
    // var lampLightDistance = 1;

    // const lamp = new THREE.AmbientLight(0xffffff, lampIntensity, lampLightDistance);
    // lamp.position.set(34, -12, 18);
    // lamp.castShadow = true;

    // scene.add(lamp);


	// Animation loop
	var animate = function() {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();