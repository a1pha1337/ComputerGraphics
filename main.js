// Window size
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Camera properties
const FOV = 90;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 1000;

// Shadows smoothing
const LIGHT_SMOOTHING = 20000;

const SOURCE = "https://a1pha1337.github.io/ComputerGraphics/"

function main() {
	// Create scene
	var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
	
	// Create camera
	var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	camera.position.z = -5;

	// Create renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Create OrbitControls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();

	// Load object with material
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(SOURCE + "objects/shop.mtl", (materials) => {
		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(SOURCE + "objects/shop.obj", (shop) => {
			shop.position.set(0, 0, 0);

			// Shadows properties
			shop.traverse((child)=>{
				child.castShadow = true;
				child.receiveShadow = true;
			})
			scene.add(shop);
		});
	})
	// var geometry = new THREE.BoxGeometry(2, 2, 2);
	// var material = new THREE.MeshPhongMaterial({
	// 	color: 0xffffff,
	// 	side: THREE.DoubleSide
	// });

	// var cube = new THREE.Mesh(geometry, material);
	// cube.receiveShadow = true;
	// cube.position.set(-10, 15, -10);
	// scene.add(cube);

	// The first outside light
	var pointLightIntensity = 1;
	var pointLightDistance = 50;
	var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(4, 19, 26);
	pointLight.castShadow = true;
	pointLight.shadow.radius = LIGHT_SMOOTHING;
	scene.add(pointLight);

	// The second outside light
	var pointLightIntensity = 1;
	var pointLightDistance = 50;
	var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(25, 19, 4);
	pointLight.castShadow = true;
	pointLight.shadow.radius = LIGHT_SMOOTHING;
	scene.add(pointLight);

	// Inside light
	var pointLightIntensity = 1;
	var pointLightDistance = 20;
	var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(-10, 16, -10);
	pointLight.castShadow = true;
	pointLight.shadow.radius = LIGHT_SMOOTHING;
	scene.add(pointLight);

	// Ambient light
	var ambLightIntensity = 0.25;
	var ambLight = new THREE.AmbientLight( 0xffffff, ambLightIntensity);
	scene.add(ambLight);

	// Animation loop
	var animate = () => {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();