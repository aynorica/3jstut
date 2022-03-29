import React, {useRef} from "react";
import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg';
import {useLoader, useFrame} from "@react-three/fiber";
import {TextureLoader} from 'three';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';

export interface EarthInputContainer {
    props: any
}



export const Earth:React.FC<EarthInputContainer> = (input:EarthInputContainer) => {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]);

    const earthRef = useRef();
    const cloudsRef = useRef();

    useFrame(({ clock }) => {
        const elapseTime = clock.getElapsedTime();

        // @ts-ignore
        earthRef.current.rotation.y = elapseTime / 6;
        // @ts-ignore
        cloudsRef.current.rotation.y = elapseTime / 6;
    })
    return (
        <React.Fragment>
            {/*<ambientLight intensity={1}/>*/}
            <pointLight color={"#e7efcc"} position={[2, 0, 6]} intensity={1.2}/>
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true}/>
            <mesh ref={cloudsRef} position={[0,0,3]}>
                <sphereGeometry args={[ 1.005, 32, 32 ]}/>
                <meshPhongMaterial map={cloudsMap} opacity={0.4} depthWrite={true} transparent={true} side={THREE.DoubleSide}/>
            </mesh>
            <mesh ref={earthRef} position={[0,0,3]}>
                <sphereGeometry args={[ 1, 32, 32 ]}/>
                <meshPhongMaterial specularMap={specularMap}/>
                <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7}/>
                {/*<OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.7}/>*/}
            </mesh>
        </React.Fragment>
    )
}