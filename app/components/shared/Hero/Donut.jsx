/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/models/donut.glb -T
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/donut-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Donut_obj.geometry} material={materials['Scene_-_Root']} position={[-0.01, -0.04, -0.01]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
    </group>
  )
}

useGLTF.preload('/models/donut-transformed.glb')
