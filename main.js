const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

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

	const ambLight = new THREE.AmbientLight( 0xffffff, 1);
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