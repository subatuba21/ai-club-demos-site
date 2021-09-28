import { useRef, useState } from "react";
import { SketchField, Tools } from "react-sketch2";
import "./handwritingdemo.css";
import {browser, LayersModel, loadLayersModel} from "@tensorflow/tfjs";

export default function HandwritingDemo() {
  const sketchref = useRef();
  const [results, setResults] = useState("")

  function ClearImage() {
    console.log(sketchref.current);
    (sketchref.current as any).clear();
  }

  async function InterpetImage() {
    const tensor = preprocessCanvas((sketchref.current as any)._canvas)
    console.log(tensor)
    const model = await loadModel()
    const predictions = model.predict(tensor);
    setResults(predictions.toString())
  }

  return (
    <div>
      <div id="sketchcontainer">
        <SketchField
          width="75px"
          height="75px"
          tool={Tools.Pencil}
          lineColor="black"
          lineWidth={3}
          ref={sketchref}
        />
      </div>
      <button id="handwritinginterpretbutton" onClick={InterpetImage}>
        Interpret
      </button>
      <button id="handwritingclearbutton" onClick={ClearImage}>
        Clear
      </button>
      <h4>Results</h4>
      <p>{results}</p>
    </div>
  );
}

function preprocessCanvas(canvas: any) {
  // resize the input image to target size of (1, 28, 28)
  let tensor = browser
    .fromPixels(canvas)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat();
  return tensor.div(255.0);
}

let model : LayersModel | null = null;
async function loadModel()  {
    // clear the model variable
    // load the model using a HTTPS request (where you have stored your model files)
    if (!model)
     model = await loadLayersModel("/models/handwriting.json");
    return model
  }
