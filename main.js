// Window size
const WIDTH = window.innerWidth - 15;
const HEIGHT = window.innerHeight - 100;

// Camera properties
const FOV = 90;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 1000;

const SOURCE = "https://a1pha1337.github.io/ComputerGraphics/"

function main() {
	// Create scene, camera and render
	var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
    
	const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	camera.position.z = -5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // OrbitControls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(SOURCE + "objects/shop.mtl", (materials)=>{
		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(SOURCE + "objects/shop.obj", (shop)=>{
			shop.position.set(0, 0, 0);
			scene.add(shop);
		});
	})

	// The first outside lamp
	var pointLightIntensity = 1;
	var pointLightDistance = 80;
	var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(12, 20, 35);
	scene.add(pointLight);

	// The second outside lamp
	var pointLightIntensity = 1;
	var pointLightDistance = 80;
	var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(34, 20, 13);
	scene.add(pointLight);

	// Inside lamp
	var pointLightIntensity = 1;
	var pointLightDistance = 20;
	var pointLight = new THREE.PointLight(0xfffacd, pointLightIntensity, pointLightDistance);
	pointLight.position.set(0, 15, 0);
	scene.add(pointLight);

	// // Ambient light
	// var ambLightIntensity = 0.2;
	// var ambLight = new THREE.AmbientLight( 0xffffff, ambLightIntensity);
	// scene.add(ambLight);

	// Animation loop
	var animate = function() {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();