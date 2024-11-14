import { useState } from 'react'

export default function Instructions({ element }: {element: HTMLDivElement}){
    let [ open, setOpen ] = useState(false)

    return <div className="instructions">
        <div className="toggle" onClick={() => setOpen(!open)}>Code</div>
        {open && <div>
            <div className="content">
                <h3>Instructions</h3>
                <p>Copy this code to use the graphic. Javascipt is just for the animation and is optional. The idea is to allow the divs to be styled however you want, this is just a demo. I plan to also allow for outputting absolute positioned divs which might make it easier to animate or morph from one image to another and a svg option for better performance. I tried to animate all the divs using anime.js but the performance was too low.</p>
            </div>

            <div className="content">
                <h3>Starter CSS</h3>
                <pre><code>
{`#img-grid-container{
    display: grid;
    width: 100%;
    background: #111;
    padding: 20px;
    margin: auto;
}

.img-grid-item{
    border: 1px solid black;
    margin: 2px;
    border-radius: 50%;
    background: linear-gradient(-200deg,#222 3%,#080808);
    box-shadow: -1px -1px 2px #080808,1px 1px 2px #222;
    transition: box-shadow 4s ease-in-out, transform 4s ease-in-out;
}

.img-grid-item.highlight{
    transform: scale(2);
    box-shadow: 5px 5px 2px #0004, 0px 0px 2px #3330;
}`}
                </code></pre>
            </div>

            <div className="content">
                <h3>Starter Js</h3>
                <pre><code>
{`setInterval(() => {
    let elemParent = document.getElementById('#img-grid-container')
    let elem = elemParent?.children[Math.floor(Math.random() * elemParent?.children.length)]
    elem?.classList.add('highlight')
    setTimeout(() => {elem?.classList.remove('highlight')}, 4000)
}, 1000)`}
                </code></pre>
            </div>

            <div className="content">
                <h3>HTML Element</h3>
                {element.innerHTML}
            </div>
        </div>}
    </div>
}