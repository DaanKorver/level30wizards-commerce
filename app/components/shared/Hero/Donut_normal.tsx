import {useGLTF} from '@react-three/drei';
import {useFrame, useThree} from '@react-three/fiber';
import {useRef, useState} from 'react';
import {MathUtils} from 'three';

interface DonutProps {
  z: number;
}

export function DonutNoInstance(props: DonutProps) {
  const {nodes, materials} = useGLTF('/models/donut.glb');

  const {z, depth} = props;
  const {viewport, camera} = useThree();
  const {height, width} = viewport.getCurrentViewport(camera, [0, 0, z]);

  const ref = useRef(null);

  const [data] = useState({
    x: MathUtils.randFloatSpread(2), // -1 to 1
    y: MathUtils.randFloatSpread(height), // -1 to 1
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.set(
      (data.rX += 0.006),
      (data.rY += 0.006),
      (data.rZ += 0.006),
    );
    ref.current.position.set(data.x * width, (data.y += 0.025), z);
    if (data.y > height) data.y = -height;
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes['Donut_obj'].geometry}
      material={materials['Scene_-_Root']}
      rotation={[Math.PI, 0, 0]}
    ></mesh>
  );
}
