import { useState } from 'react'

export default function Instructions({ element }: {element: HTMLDivElement}){
    let [ open, setOpen ] = useState(false)

    return <div className="instructions">
        <div className="toggle" onClick={() => setOpen(!open)}>Instructions</div>
        {open && <div>
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
}`}
                </code></pre>
            </div>

            <div className="content">
                <h3>HTML Element</h3>
                {element.innerHTML}
            </div>
        </div>}
    </div>
}