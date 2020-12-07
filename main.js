// Window size
const WIDTH = window.innerWidth - 15;
const HEIGHT = window.innerHeight - 100;

// Camera properties
const FOV = 90;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 1000;

const LIGHT_SMOOTHING = 10000;

const SOURCE = "https://a1pha1337.github.io/ComputerGraphics/"

function main() {
	// Create scene, camera and renderer
	var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
    
	var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	camera.position.z = -5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // OrbitControls
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(SOURCE + "objects/shop.mtl", (materials) => {
		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(SOURCE + "objects/shop.obj", (shop) => {
			shop.position.set(0, 0, 0);
			shop.traverse((child)=>{
				child.castShadow = true;
				child.receiveShadow = true;
			})
			scene.add(shop);
		});
	})
	var geometry = new THREE.BoxGeometry(2, 2, 2);
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide
	});

	var cube = new THREE.Mesh(geometry, material);
	cube.receiveShadow = true;
	cube.position.set(25, 19, 4);
	scene.add(cube);

	// The first outside light
	var pointLightIntensity = 1;
	var pointLightDistance = 50;
	var pointLight = new THREE.PointLight(0xffffff, pointLightIntensity, pointLightDistance);
	pointLight.position.set(12, 20, 32);
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
	var pointLight = new THREE.PointLight(0xfffacd, pointLightIntensity, pointLightDistance);
	pointLight.position.set(0, 15, 0);
	pointLight.castShadow = true;
	pointLight.shadow.radius = LIGHT_SMOOTHING;
	scene.add(pointLight);

	// Ambient light
	var ambLightIntensity = 0.3;
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