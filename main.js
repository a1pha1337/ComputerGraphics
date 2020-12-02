// Window size
const WIDTH = window.innerWidth - 15;
const HEIGHT = window.innerHeight - 100;

// Camera properties
const FOV = 90;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 1000;

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
    
	var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	camera.position.z = -5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Camera controls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
    
    loadMTLplusOBJ(URL + "objects/shop.mtl", URL + "objects/shop.obj", (shop)=>{
        shop.position.set(0, 0, 0);
        scene.add(shop);
	});

	var width = 5;
	var height = 5;
	var depth = 5;

	var geometry = new THREE.BoxGeometry(width, height, depth);
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide
	});

	var cube = new THREE.Mesh(geometry, material);
	cube.position.set(30, 20, 35);

	scene.add(cube);

	var pointLightIntensity = 1;
	var pointLightDistance = 40;
	const pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(12, 20, 35);
	pointLight.castShadow = true;
	scene.add(pointLight);

	var ambLightIntensity = 0.2;
	const ambLight = new THREE.AmbientLight( 0xffffff, ambLightIntensity);
	scene.add(ambLight);

	// Animation loop
	var animate = function() {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();