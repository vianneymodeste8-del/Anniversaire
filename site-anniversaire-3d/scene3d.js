/* ============================================================
   SCENE3D — toute la logique Three.js du site
   Expose window.Scene3D avec : setActiveScene, openGiftBox,
   openDoor, triggerConfetti
   ============================================================ */

const Scene3D = (() => {
  let renderer, scene, camera;
  let particles;
  let giftBox, giftLid, giftRibbonV, giftRibbonH;
  let mirrorRing;
  let doorLeft, doorRight;
  let confettiGroup = null;
  let clock;
  let mouseX = 0, mouseY = 0;
  let activeScene = 1;
  let giftOpened = false;
  let doorOpened = false;

  const COLORS = {
    gold: 0xc9a24b,
    goldLight: 0xe9d9ad,
    bordeaux: 0x7a1a2e,
    rose: 0xd998a6,
    black: 0x0b0509
  };

  function init(){
    const canvas = document.getElementById('webgl');
    renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    clock = new THREE.Clock();

    addLights();
    addParticles();
    addGiftBox();
    addMirror();
    addDoor();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('deviceorientation', onTilt);

    setActiveScene(1);
    animate();
  }

  function addLights(){
    const amb = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(amb);
    const key = new THREE.PointLight(COLORS.goldLight, 1.4, 30);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(COLORS.bordeaux, 1.1, 30);
    rim.position.set(-4, -2, -3);
    scene.add(rim);
  }

  /* ---------- particules dorées ---------- */
  function addParticles(){
    const count = 500;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for(let i=0;i<count;i++){
      positions[i*3]   = (Math.random()-0.5) * 16;
      positions[i*3+1] = (Math.random()-0.5) * 12;
      positions[i*3+2] = (Math.random()-0.5) * 10;
      speeds[i] = 0.15 + Math.random()*0.35;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: COLORS.goldLight,
      size: 0.035,
      transparent:true,
      opacity:0.75,
      depthWrite:false
    });
    particles = new THREE.Points(geo, mat);
    particles.userData.speeds = speeds;
    scene.add(particles);
  }

  /* ---------- scène 1 : coffret cadeau ---------- */
  function addGiftBox(){
    giftBox = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: COLORS.bordeaux, metalness:0.3, roughness:0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: COLORS.gold, metalness:0.6, roughness:0.3 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 1.6), bodyMat);
    giftBox.add(base);

    giftLid = new THREE.Group();
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.28, 1.7), goldMat);
    lidMesh.position.set(0, 0.15, 0);
    giftLid.add(lidMesh);
    giftLid.position.set(0, 0.6, -0.85); // pivot au fond, pour ouverture façon couvercle
    giftBox.add(giftLid);

    giftRibbonV = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.24, 1.64), goldMat);
    giftBox.add(giftRibbonV);
    giftRibbonH = new THREE.Mesh(new THREE.BoxGeometry(2.24, 1.24, 0.22), goldMat);
    giftBox.add(giftRibbonH);

    const bowGeo = new THREE.TorusGeometry(0.22, 0.07, 12, 24);
    const bowL = new THREE.Mesh(bowGeo, goldMat);
    bowL.position.set(-0.16, 0.68, 0);
    bowL.rotation.y = Math.PI/2.3;
    const bowR = bowL.clone();
    bowR.position.x = 0.16;
    bowR.rotation.y = -Math.PI/2.3;
    giftBox.add(bowL, bowR);

    giftBox.position.set(0, -0.3, 0);
    giftBox.rotation.y = 0.4;
    scene.add(giftBox);
  }

  /* ---------- scène 5 : miroir ---------- */
  function addMirror(){
    const ringMat = new THREE.MeshStandardMaterial({ color: COLORS.gold, metalness:0.7, roughness:0.25 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x1a0f14, metalness:0.9, roughness:0.05 });
    mirrorRing = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.12, 16, 48), ringMat);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(1.45, 48), glassMat);
    glass.position.z = -0.02;
    mirrorRing.add(ring, glass);
    mirrorRing.visible = false;
    scene.add(mirrorRing);
  }

  /* ---------- scène 6 : porte ---------- */
  function addDoor(){
    const doorMat = new THREE.MeshStandardMaterial({ color: COLORS.bordeaux, metalness:0.2, roughness:0.5 });
    const trimMat = new THREE.MeshStandardMaterial({ color: COLORS.gold, metalness:0.7, roughness:0.25 });

    doorLeft = new THREE.Group();
    const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.2, 0.12), doorMat);
    leftPanel.position.x = 0.65;
    const leftTrim = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.14), trimMat);
    leftTrim.position.set(0.65, 0.9, 0.01);
    const leftTrim2 = leftTrim.clone(); leftTrim2.position.y = -0.9;
    doorLeft.add(leftPanel, leftTrim, leftTrim2);
    doorLeft.position.x = -1.3;

    doorRight = new THREE.Group();
    const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(1.3, 3.2, 0.12), doorMat);
    rightPanel.position.x = -0.65;
    const rightTrim = leftTrim.clone(); rightTrim.position.set(-0.65, 0.9, 0.01);
    const rightTrim2 = leftTrim.clone(); rightTrim2.position.set(-0.65, -0.9, 0.01);
    doorRight.add(rightPanel, rightTrim, rightTrim2);
    doorRight.position.x = 1.3;

    doorLeft.visible = false;
    doorRight.visible = false;
    scene.add(doorLeft, doorRight);
  }

  /* ---------- confettis (scène 7) ---------- */
  function triggerConfetti(){
    if(confettiGroup) scene.remove(confettiGroup);
    confettiGroup = new THREE.Group();
    const colors = [COLORS.gold, COLORS.goldLight, COLORS.rose, COLORS.bordeaux];
    const count = 140;
    for(let i=0;i<count;i++){
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        side: THREE.DoubleSide
      });
      const piece = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.14), mat);
      piece.position.set((Math.random()-0.5)*6, 4 + Math.random()*3, (Math.random()-0.5)*3);
      piece.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
      piece.userData.fallSpeed = 0.8 + Math.random()*1.4;
      piece.userData.spin = (Math.random()-0.5)*4;
      piece.userData.drift = (Math.random()-0.5)*0.6;
      confettiGroup.add(piece);
    }
    scene.add(confettiGroup);
  }

  /* ---------- interactions publiques ---------- */
  function openGiftBox(){
    if(giftOpened) return;
    giftOpened = true;
    const start = performance.now();
    const duration = 1200;
    function step(now){
      const t = Math.min(1, (now-start)/duration);
      const ease = 1 - Math.pow(1-t, 3);
      giftLid.rotation.x = -ease * (Math.PI*0.62);
      giftBox.position.y = -0.3 + ease*0.15;
      giftRibbonV.scale.y = 1-ease;
      giftRibbonH.scale.x = 1-ease;
      if(t<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function openDoor(){
    if(doorOpened) return;
    doorOpened = true;
    const start = performance.now();
    const duration = 1400;
    function step(now){
      const t = Math.min(1, (now-start)/duration);
      const ease = 1 - Math.pow(1-t, 3);
      doorLeft.rotation.y = ease * 1.9;
      doorRight.rotation.y = -ease * 1.9;
      if(t<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function setActiveScene(n){
    activeScene = n;
    giftBox.visible = (n === 1);
    mirrorRing.visible = (n === 5);
    doorLeft.visible = (n === 6);
    doorRight.visible = (n === 6);
    if(n === 7) triggerConfetti();
    else if(confettiGroup){ scene.remove(confettiGroup); confettiGroup = null; }
  }

  function onResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(e){
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  }

  function onTilt(e){
    if(e.gamma == null) return;
    mouseX = THREE.MathUtils.clamp(e.gamma/45, -1, 1) * 0.5;
    mouseY = THREE.MathUtils.clamp((e.beta-45)/45, -1, 1) * 0.5;
  }

  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // parallaxe douce caméra
    camera.position.x += (mouseX*0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY*0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    // particules : flottement
    const pos = particles.geometry.attributes.position;
    const speeds = particles.userData.speeds;
    for(let i=0;i<pos.count;i++){
      let y = pos.getY(i) + speeds[i]*0.003;
      if(y > 6) y = -6;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t*0.5 + i)*0.0006);
    }
    pos.needsUpdate = true;

    if(giftBox.visible && !giftOpened){
      giftBox.rotation.y += 0.0035;
    }
    if(mirrorRing.visible){
      mirrorRing.rotation.z = Math.sin(t*0.3)*0.05;
    }
    if(confettiGroup){
      confettiGroup.children.forEach(p=>{
        p.position.y -= p.userData.fallSpeed * 0.016;
        p.position.x += p.userData.drift * 0.016;
        p.rotation.z += p.userData.spin * 0.016;
        if(p.position.y < -4) p.position.y = 6;
      });
    }

    renderer.render(scene, camera);
  }

  return { init, setActiveScene, openGiftBox, openDoor, triggerConfetti };
})();
