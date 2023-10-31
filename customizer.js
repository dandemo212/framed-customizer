import * as THREE from 'three';

let scene, camera, cube, renderer, glass, glass_geo, glass_mat;

let geometry, material, texture;

function setStain(id,texture_path){
    for(var x=0;x<document.querySelectorAll(".stain-selection").length;x++){
        document.querySelectorAll(".stain-selection")[x].style.borderColor = "rgba(0,0,0,0)";
    }
    document.querySelectorAll(".stain-selection")[id].style.borderColor = "white";
    scene.remove(cube)
    texture = new THREE.TextureLoader().load(texture_path);
    material = new THREE.MeshBasicMaterial({ map: texture });
    glass.rotation.y = 0;
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.rotation.x = 3.14 / 2
    cube.position.y = -3
    cube.position.z = -3
}

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1000, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    texture = new THREE.TextureLoader().load("wood-darker.jpeg");
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(4, 4);

    geometry = new THREE.BoxGeometry(4, 2, 1.2);
    material = new THREE.MeshBasicMaterial({ map:texture });
    cube = new THREE.Mesh(geometry, material);

    glass_geo = new THREE.BoxGeometry(3.99, 6, 0.2)
    glass_mat = new THREE.MeshBasicMaterial({ wireframe: true })

    glass = new THREE.Mesh(glass_geo, glass_mat)

    cube.rotation.x = 3.14/2
    cube.position.y = -3
    cube.position.z = -3

    glass.position.z = -3
    glass.position.y = 0.5

    const frame = new THREE.Group();
    frame.add(glass);
    frame.add(cube);

    scene.add(cube);
    scene.add(glass)

    camera.position.z = 5;

    renderer.render(scene, camera);

    document.querySelector(".s-light").addEventListener("click",function(){
        setStain(0,'wood-darker.jpeg');
    })
    document.querySelector(".s-medium").addEventListener("click", function () {
        setStain(1,'wood.jpeg');
    })
    document.querySelector(".s-dark").addEventListener("click", function () {
        setStain(2,'wood-dark.jpeg');
    })
}

function animate() {
    requestAnimationFrame(animate);

    if(isMoving){
        cube.rotation.z += 0.005;
        glass.rotation.y -= 0.005;

        cube.rotation.x = 3.14 / 2
        cube.position.y = -3
        cube.position.z = -3

        glass.position.z = -3
        glass.position.y = 0.5

        document.getElementById("mid-block").style.display = "none";
    } else {
        cube.rotation.z = 0;
        glass.rotation.y = 0;
        cube.position.z = 1;
        glass.position.z = 1;
        cube.position.y = 0
        glass.position.y = 3.5
        var vFOV = camera.fov * Math.PI / 180;
        var h = 2 * Math.tan(vFOV / 2) * camera.position.z;
        var aspect = window.innerWidth / window.innerHeight;
        var w = h * aspect;
        var width_block = (window.innerWidth * ((1 / w) * 1.2))*1.7
        var height_block = (window.innerHeight * ((1 / h) * 4))*1.7
        document.getElementById("mid-block").style.display = "block";
        document.getElementById("mid-block").style.width = height_block + "px";
        document.getElementById("mid-block").style.height = width_block + "px";
        document.getElementById("mid-block").style.left = "-" + Number(height_block/2) + "px";
        document.getElementById("mid-block").style.top = "-" + Number(width_block/2) + "px";
    }

    renderer.render(scene, camera);
}

init();
animate();