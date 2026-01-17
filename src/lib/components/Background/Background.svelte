<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let container;

  onMount(() => {
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const gridHelper = new THREE.GridHelper(100, 100, 0x00ff00, 0x003300);
    gridHelper.position.y = -15;
    scene.add(gridHelper);

    camera.position.set(0, 5, 20);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const networkGroup = new THREE.Group();
    const nodes = [];
    const numNodes = 120;

    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      const radius = 10 + Math.random() * 30;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const nodeSize = 0.12 + Math.random() * 0.15;
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(nodeSize, 0),
        new THREE.MeshPhongMaterial({
          color: 0x00ff00,
          emissive: 0x00ff00,
          emissiveIntensity: 0.7,
          shininess: 100,
          transparent: true,
          opacity: 0.9
        })
      );

      node.position.set(x, y, z);
      networkGroup.add(node);
      nodes.push({ mesh: node, pos: new THREE.Vector3(x, y, z) });
    }

    const MAX_DIST = 20;
    const MAX_CONNECTIONS = 10;

    for (let i = 0; i < nodes.length; i++) {
      const candidates = [];

      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < MAX_DIST) candidates.push({ j, d });
      }

      candidates
        .sort((a, b) => a.d - b.d)
        .slice(0, MAX_CONNECTIONS)
        .forEach(({ j, d }) => {
          const opacity = Math.min(0.12, Math.max(0.0, (1 - d / MAX_DIST) * 0.15));
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity
          });

          const lineGeometry = new THREE.BufferGeometry().setFromPoints([nodes[i].pos, nodes[j].pos]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          networkGroup.add(line);
        });
    }

    scene.add(networkGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff00, 1.5, 100);
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff00, 1.5, 100);
    pointLight2.position.set(-8, -8, 8);
    scene.add(pointLight2);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 400;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x00ff00,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      networkGroup.rotation.y += 0.002;
      networkGroup.rotation.x = Math.sin(Date.now() * 0.0002) * 0.15;

      nodes.forEach((node, i) => {
        const pulse = Math.sin(Date.now() * 0.002 + i * 0.5) * 0.3 + 1;
        node.mesh.scale.set(pulse, pulse, pulse);
        node.mesh.rotation.x += 0.008;
        node.mesh.rotation.y += 0.008;
      });

      particlesMesh.rotation.y += 0.0003;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 + 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  });
</script>

<div bind:this={container} class="background"></div>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
</style>
