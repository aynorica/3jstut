import React, {Suspense} from 'react';
import './App.css';
import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import {Earth} from "./Components/Earth/earth";
const CanvasController = styled.div`
  width: 100%;
  height: 100%;
`;
function App() {
  return (
    <CanvasController>
      <Canvas>
        <Suspense fallback={() => <div>hello</div>}>
            <Earth props={null}/>
        </Suspense>
      </Canvas>
    </CanvasController>
  );
}

export default App;
