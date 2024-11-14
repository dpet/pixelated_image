import { useEffect, useRef, useState } from 'react';
import { generateElement } from '../assets/elementGenerator.ts';
import Instructions from './Instructions.tsx';
import '../assets/style/element.scss';
import '../assets/style/instructions.scss';

export default function Converter(){
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let elementRef = useRef<HTMLDivElement>(null)
    let intervalRef = useRef<number>(0);
    let [ imageFile, setImageFile ] = useState<File | null>(null)
    let [ image, setImage ] = useState<HTMLImageElement | null>(null)
    let [ mode, setMode ] = useState("Monotone")

    let modeDescriptions: {[key: string]: string} = {
        Monotone: 'nodes are generated from non-white and non-transparent pixels. White and transparent pixels are left empty.',
        Color: 'nodes get their background styled with the pixel color. Transparent pixels are left empty.'
    }

    useEffect(() => {
        (async () => {
            await addDemoImage("./public/world_white_50.png")
            processImage()
        })()
    }, [])

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
        <div id="img-grid-container" ref={elementRef}></div>

        <div className="mb-6">Try these demos</div>
        <div className="demoImages">
            <img className="demoImage" src="./public/world_white_50.png" onClick={() => addDemoImage("./public/world_white_50.png")}/>
            <img className="demoImage" src="./public/hello.png" onClick={() => addDemoImage("./public/hello.png")}/>
            <img className="demoImage" src="./public/lotr.png" onClick={() => addDemoImage("./public/lotr.png")}/>
            <img className="demoImage" src="./public/hill.png" onClick={() => addDemoImage("./public/hill.png")}/>
        </div>

        <div className="mb-6">Mode: {mode} - {modeDescriptions[mode]}</div>
        <div className="modes mb-20">
            <button className={`modeButton ${mode == 'Monotone' ? 'modeSelected' : ''}`} onClick={() => setMode("Monotone")}>Monotone</button>
            <button className={`modeButton ${mode == 'Color' ? 'modeSelected' : ''}`} onClick={() => setMode("Color")}>Color</button>
        </div>

        <label className="imageInputLabel">
            Upload image
            <input className="imageInput" type="file" onChange={(event) => { setImageFile(event.target.files![0]) }} />
        </label>

        <button className="generateButton" onClick={processImage} disabled={checkPixels()}>Process</button>
        <Instructions element={elementRef.current!} />
        
        {image && <div>This image is {image.width} by {image.height} pixels and will generate up to {image.width * image.height} nodes.</div>}
        {checkPixels() && <div className="warning">This image has too many pixels.</div>}
        <canvas width="0" height="0" ref={canvasRef}></canvas><br />
    </div>

    async function processImage(){
        const canvas: HTMLCanvasElement = canvasRef.current!
        const ctx = canvas.getContext("2d")!;
        generateElement(canvas, ctx, mode)

        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            let elem = elementRef.current?.children[Math.floor(Math.random() * elementRef.current?.children.length)]
            elem?.classList.add('highlight')
            setTimeout(() => {elem?.classList.remove('highlight')}, 4000)
        }, 1000)
    }

    function checkPixels(){
        if (!image) return false
        return image.width * image.height > 50000
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