import {Instance, Instances, useGLTF} from '@react-three/drei';
import {useFrame, useThree} from '@react-three/fiber';
import {useMemo, useRef, useState} from 'react';
import {
  BoxGeometry,
  BufferGeometry,
  Euler,
  Material,
  MathUtils,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  NormalBufferAttributes,
  Quaternion,
  Vector3,
} from 'three';
import {Model} from './Donut';

interface DonutProps {
  count: number;
  depth: number;
}

export function Donut(props: DonutProps) {
  const {count, depth} = props;
  const {nodes, materials} = useGLTF('/models/donut-transformed.glb');

  const refs = useRef([]);

  const {viewport, camera} = useThree();

  const data = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const z = -(i / count) * depth - 5;
      const {width, height} = viewport.getCurrentViewport(camera, [0, 0, z]);

      temp.push({
        x: MathUtils.randFloatSpread(2) * width,
        y: MathUtils.randFloatSpread(height),
        z,
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
        height,
      });
    }
    return temp;
  }, [camera, count, depth, viewport]);

  useFrame(() => {
    if (!refs.current) return;
    // for (let i = 0; i < count; i++) {
    //   data[i].rX += 0.006;
    //   data[i].rY += 0.006;
    //   data[i].rZ += 0.006;

    //   data[i].y += 0.025;

    //   if (data[i].y > data[i].height) data[i].y = -data[i].height;

    //   refs.current.setMatrixAt(
    //     i,
    //     new Matrix4().compose(
    //       new Vector3(data[i].x, data[i].y, data[i].z),
    //       new Quaternion().setFromEuler(
    //         new Euler(data[i].rX, data[i].rY, data[i].rZ),
    //       ),
    //       new Vector3(1, 1, 1),
    //     ),
    //   );

    //   refs.current.instanceMatrix.needsUpdate = true;
    // }
  });

  const box = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial();
  // nodes['Donut_obj'];
  console.log(nodes['Donut_obj']);

  return (
    <>
      {/* <instancedMesh
        args={[nodes['Donut_obj'].geometry, material, count]}
        ref={refs}
      /> */}
      <Instances
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
      >
        <Model />
        <Instance />
      </Instances>
    </>
  );
}
