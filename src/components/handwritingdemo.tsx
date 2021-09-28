import { useRef, useState } from "react";
import { SketchField, Tools } from "react-sketch2";
import "./handwritingdemo.css";
import { browser, LayersModel, loadLayersModel, unstack } from "@tensorflow/tfjs";

export default function HandwritingDemo() {
  const sketchref = useRef();
  const [results, setResults] = useState("");

  function ClearImage() {
    console.log(sketchref.current);
    (sketchref.current as any).clear();
  }

  async function InterpetImage() {
    const tensor = preprocessCanvas((sketchref.current as any)._canvas);
    const model = await loadModel();
    const predictions = model.predict(tensor);
    console.log(predictions.toString())
    const arr = (predictions as any).arraySync()[0]
    console.log(arr)
    let highestIndex = 0;
    for (let i=0; i<arr.length; i++) {
      if (arr[i]>arr[highestIndex]) {
        highestIndex = i
      }
    }

    setResults(`You wrote the number ${highestIndex} with ${Math.floor(arr[highestIndex]*100)}% certainty)`)
  }

  return (
    <div>
      <div id="sketchcontainer">
        <SketchField
          width="75px"
          height="75px"
          tool={Tools.Pencil}
          lineColor="grey"
          lineWidth={3}
          ref={sketchref}
        />
      </div>
      <div id="handwriting-button-container">
        <button onClick={InterpetImage}>
          Interpret
        </button>
        <button onClick={ClearImage}>
          Clear
        </button>
      </div>

      <h4>Results</h4>
      <p>{results}</p>
    </div>
  );
}

function preprocessCanvas(data: any) {
  // resize the input image to target size of (1, 28, 28)
  let tensor = browser
    .fromPixels(data)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat();

  const d = tensor.dataSync();
  console.log(d, d.includes(1));
  return tensor.div(255.0);
}

let model: LayersModel | null = null;
async function loadModel() {
  // clear the model variable
  // load the model using a HTTPS request (where you have stored your model files)
  if (!model) model = await loadLayersModel("/models/handwriting.json");
  return model;
}
