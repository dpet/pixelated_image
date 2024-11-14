export function generateElement(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mode: string){

    let imgArray: number[][][] = []
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < canvas.height; y++){
        imgArray.push([])
        for (let x = 0; x < canvas.width; x++){
            const arrStart = (y * canvas.width + x) * 4
            imgArray[y].push([pixelData.data[arrStart], pixelData.data[arrStart + 1], pixelData.data[arrStart + 2], pixelData.data[arrStart + 3]])
        }
    }

    displayMap(imgArray, mode)
}

function displayMap(imgArray: number[][][], mode: string){
    const imgContainer = document.getElementById('img-grid-container')!
    imgContainer.innerHTML = ''
    imgContainer.style.grid = `repeat(${imgArray.length}, 1fr) / repeat(${imgArray[0].length}, 1fr)`
    imgContainer.style.aspectRatio = `${imgArray[0].length} / ${imgArray.length}`

    for (let y = 0; y < imgArray.length; y++){
        let row = imgArray[y]
        for (let x = 0; x < row.length; x++){

            if (mode == "Monotone"){
                if (checkWhiteOrTrans(row[x])){
                    let div = document.createElement('div');
                    div.classList.add('img-grid-item', mode);
                    div.style.gridArea = `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`
                    imgContainer.appendChild(div);
                }
            }
            else if (mode == "Color"){
                if (checkTransparent(row[x])){
                    let div = document.createElement('div');
                    div.classList.add('img-grid-item', mode);
                    div.style.gridArea = `${y + 1} / ${x + 1} / ${y + 2} / ${x + 2}`
                    imgContainer.appendChild(div);
                    div.style.background = `rgba(${row[x][0]}, ${row[x][1]}, ${row[x][2]}, ${row[x][3]})`
                }
            }
        }
    }

    function checkWhiteOrTrans(pixel: number[]){
        if (pixel[3] == 0) return false
        return (pixel[0] != 255 && pixel[1] != 255 && pixel[2] != 255)
    }

    function checkTransparent(pixel: number[]){
        return (pixel[3] != 0)
    }
}