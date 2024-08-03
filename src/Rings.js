import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

export function Rings() {
  const itemRef = useRef([]); // storing the position of ring

  useFrame((state) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemRef.current.length; i++) {
      let mesh = itemRef.current[i];
      let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      mesh.position.set(0, 0, -z);

      // far away from the scene
      let dist = Math.abs(z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      // setting color sacle when apart
      let colorScale = 1;
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      colorScale *= 0.5;

      if (i % 2 == 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(
          colorScale
        );
      } else {
        mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(
          colorScale
        );
      }
    }
  });
  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} /> // randius of ring,
          tublar part of geometery, size of triangle that is going to be used
          <meshStandardMaterial
            emissive={[0.5, 0.5, 0.5]}
            color={[0, 0, 0]}
          />{" "}
          // emissive is a type of light source
        </mesh>
      ))}
    </>
  );
}
