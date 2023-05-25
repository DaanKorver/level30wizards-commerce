import {useFrame, useThree} from '@react-three/fiber';
import {Suspense, useMemo, useRef} from 'react';
import {Euler, InstancedMesh, Matrix4, Quaternion, Vector3} from 'three';
import {Donut} from './Donut_instance';
import {Environment, Stats, useGLTF} from '@react-three/drei';
import {DonutNoInstance} from './Donut_normal';

export function Scene() {
  const {size} = useThree();
  const mesh = useRef<InstancedMesh>(null);
  const meshRefs = useRef([]);

  const {nodes} = useGLTF('/models/scene-transformed.glb');
  const {viewport, camera} = useThree();
  const z = -1;

  const {width, height} = viewport.getCurrentViewport(camera, [0, 0, z]);
  const count = 10;
  const depth = 80;
  return (
    <Suspense fallback={null}>
      <Stats />
      {/* <color attach="background" args={['#ff80ad']} /> */}
      <Donut count={count} depth={depth} />
      {/* {Array.from({length: count}, (_, i) => (
        <DonutNoInstance key={i} z={-(i / count) * depth - 8} />
      ))} */}
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} scale={2} intensity={1} />
      <Environment preset="sunset" />
    </Suspense>
  );
}
