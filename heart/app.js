// Инициализация сцены, камеры и рендерера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание геометрии сердца
function createHeartGeometry() {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.4, x + 0.5, y + 2.0);
    shape.bezierCurveTo(x + 1.2, y + 1.4, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// Создание материалов и объектов
const heartMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff0000, 
    wireframe: true 
});

const heart = new THREE.Mesh(createHeartGeometry(), heartMaterial);
scene.add(heart);

// Система частиц
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xff69b4
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Настройка камеры
camera.position.z = 5;

// Анимация
let time = 0;
function animate() {
    requestAnimationFrame(animate);

    // Вращение сердца
    heart.rotation.x += 0.01;
    heart.rotation.y += 0.005;

    // Пульсация
    heart.scale.set(1 + Math.sin(time) * 0.1, 1 + Math.sin(time) * 0.1, 1 + Math.sin(time) * 0.1);

    // Движение частиц
    const positions = particlesGeometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.001;
        positions[i + 0] += Math.cos(time + i) * 0.001;
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    time += 0.05;
    renderer.render(scene, camera);
}

// Обработчики событий
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousemove', (e) => {
    camera.position.x = (e.clientX - window.innerWidth/2) * 0.005;
    camera.position.y = -(e.clientY - window.innerHeight/2) * 0.005;
    camera.lookAt(scene.position);
});

// Запуск анимации
animate();