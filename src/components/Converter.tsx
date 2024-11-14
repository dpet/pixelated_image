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
        <div className="demoImages">
            <img className="demoImage" src="./public/world_white_50.png" onClick={() => addDemoImage("./public/world_white_50.png")}/>
        </div>
        {image && <div className="">This image will generate {image.width * image.height} nodes.</div>}
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