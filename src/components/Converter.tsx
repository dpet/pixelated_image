import { useEffect, useRef, useState } from 'react';
import { generateElement } from '../assets/elementGenerator.ts';
import '../assets/style/element.scss';

export default function Converter(){
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let [ imageFile, setImageFile ] = useState<File | null>(null)!

    useEffect(() => {
        (async () => {
            const canvas: HTMLCanvasElement = canvasRef.current!
            const ctx = canvas.getContext("2d")!;
            if (imageFile){
                const img = new Image()
                img.src = URL.createObjectURL(imageFile);
                await new Promise(res => img.onload = () => {res(img)})

                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
            }
        })()
    }, [imageFile])

    return <div>
        <canvas width="0" height="0" ref={canvasRef}></canvas>
        <div id="img-grid-container"></div>
        <input
            type="file"
            name="myImage"
            onChange={(event) => {
                setImageFile(event.target.files![0]);
            }}
        />
        <button onClick={processImage}>Process</button>
    </div>

    async function processImage(){
        const canvas: HTMLCanvasElement = canvasRef.current!
        const ctx = canvas.getContext("2d")!;
        generateElement(canvas, ctx)
    }
}