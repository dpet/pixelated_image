import './App.scss'
import Converter from './components/Converter.tsx';

function App() {

  return (
    <div className="container">
      <h3 className="title">Image Pixelater</h3>

      <p className="description">This app lets you convert an image into an HTML element. Each pixel of the image becomes a child element. Web developers can simply copy the element from the inspector. It is best to use small images. An image of 200 x 100 pixels will give you 20,000 elements which is a lot for the browser to handle. The generated element can be a div with the children positioned using css grid or a svg. Please watch the accompanying video for a demo.</p>
      
      <Converter />
    </div>
  )
}

export default App
