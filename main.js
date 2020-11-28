const WIDTH = window.innerWidth - 15;
const HEIGHT = window.innerHeight - 100;

const URL = "https://a1pha1337.github.io/ComputerGraphics/"

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

    const objLoader = new THREE.OBJLoader();

    objLoader.load(URL + "objects/shop.obj", (root)=>{
        scene.add(root);
    });

	// Animation loop
	var animate = function() {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();