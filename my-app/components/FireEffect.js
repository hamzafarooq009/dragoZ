// components/FireEffect.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Extend THREE to include PlaneGeometry
extend({ PlaneGeometry: THREE.PlaneGeometry });

const Fire = () => {
  const fireRef = useRef();
  const texture = useTexture('/fire-texture.png');

  useFrame(({ clock }) => {
    if (fireRef.current) {
      fireRef.current.material.uniforms.time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (fireRef.current) {
      fireRef.current.material.uniforms.map.value = texture;
    }
  }, [texture]);

  return (
    <mesh ref={fireRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={{
          time: { value: 1.0 },
          map: { value: texture },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform sampler2D map;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            uv.y += time * 0.1;
            vec4 color = texture2D(map, uv);
            gl_FragColor = color;
          }
        `}
        transparent
      />
    </mesh>
  );
};

const FireEffect = () => {
  return (
    <Canvas>
      <Fire />
    </Canvas>
  );
};

export default FireEffect;