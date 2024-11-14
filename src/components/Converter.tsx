import { useEffect, useRef, useState } from 'react';
import { generateElement } from '../assets/elementGenerator.ts';
import Instructions from './Instructions.tsx';
import '../assets/style/element.scss';
import '../assets/style/instructions.scss';

export default function Converter(){
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let elementRef = useRef<HTMLDivElement>(null)
    let [ imageFile, setImageFile ] = useState<File | null>(null)
    let [ image, setImage ] = useState<HTMLImageElement | null>(null)
    let [ mode, setMode ] = useState("White")
    let [ animateOption, setAnimateOption ] = useState(true)
    let [ svgOption, setSvgOption ] = useState(false)

    let modeDescriptions: {[key: string]: string} = {
        White: 'nodes are generated from non-white pixels. White pixels are left empty.',
        Transparent: 'nodes are generated from non-transparent pixels. Transparent pixels are left empty.',
        Color: 'nodes get their background styled with the pixel color'
    }

    useEffect(() => {
        (async () => {
            if (imageFile){
                const img = new Image()
                img.src = URL.createObjectURL(imageFile);
                await new Promise(res => img.onload = () => {res(img)})
                addImageToCanvas(img)
            }
        })()
    }, [imageFile])

    return <div>
        <div className="mb-6">Try these demos</div>
        <div className="demoImages">
            <img className="demoImage" src="./public/world_white_50.png" onClick={() => addDemoImage("./public/world_white_50.png")}/>
            <img className="demoImage" src="./public/438_100.png" onClick={() => addDemoImage("./public/438_100.png")}/>
        </div>

        <div className="mb-6">Mode: {mode} - {modeDescriptions[mode]}</div>
        <div className="modes mb-20">
            <button className={`modeButton ${mode == 'White' ? 'modeSelected' : ''}`} onClick={() => setMode("White")}>White</button>
            <button className={`modeButton ${mode == 'Transparent' ? 'modeSelected' : ''}`} onClick={() => setMode("Transparent")}>Transparent</button>
            <button className={`modeButton ${mode == 'Color' ? 'modeSelected' : ''}`} onClick={() => setMode("Color")}>Color</button>
        </div>

        <div className="mb-6">Options</div>
        <div className="modes mb-6">
            <button className={`optionButton ${animateOption ? 'optionSelected' : ''}`} onClick={() => setAnimateOption(!animateOption)}>Animate</button>
            <button className={`optionButton optionSelected`} onClick={() => setSvgOption(!svgOption)}>{svgOption ? 'SVG' : 'Divs'}</button>
        </div>
        {animateOption && <div className="mb-6">Animate: Animates the demo and adds animation JS and CSS to the output</div>}
        {svgOption && <div className="mb-6">SVG: output will be an svg</div>}
        {!svgOption && <div className="mb-6">Divs: output will be divs arranged with CSS Grid</div>}

        {image && <div>This image is {image.width} by {image.height} pixels and will generate {image.width * image.height} nodes.</div>}
        {checkPixels() && <div className="warning">This image has too many pixels.</div>}
        <canvas width="0" height="0" ref={canvasRef}></canvas><br />

        <label className="imageInputLabel">
            Upload image
            <input className="imageInput" type="file" onChange={(event) => { setImageFile(event.target.files![0]) }} />
        </label>

        <button className="generateButton" onClick={processImage} disabled={checkPixels()}>Process</button>
        <Instructions element={elementRef.current!} />
        <div id="img-grid-container" ref={elementRef}></div>
    </div>

    async function processImage(){
        const canvas: HTMLCanvasElement = canvasRef.current!
        const ctx = canvas.getContext("2d")!;
        generateElement(canvas, ctx)
    }

    function checkPixels(){
        if (!image) return false
        return image.width * image.height > 20000
    }

    async function addDemoImage(url: string){
        const img = new Image()
        img.src = url;
        await new Promise(res => img.onload = () => {res(img)})
        addImageToCanvas(img)
    }

    function addImageToCanvas(img: HTMLImageElement){
        const canvas: HTMLCanvasElement = canvasRef.current!
        const ctx = canvas.getContext("2d")!;

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        setImage(img)
    }
}