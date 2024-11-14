import './App.scss'
import Converter from './components/Converter.tsx';

function App() {

  return (
    <div>
      <div className="container">
        <h3 className="title">Image Pixelater</h3>

        <p className="description">This app lets you convert an image into an HTML element. Each pixel of the image becomes a div positioned with CSS grid. Web developers can simply copy the generated code. It is best to use small images. An image of 200 x 100 pixels will give you 20,000 elements which is a lot for the browser to handle. For now you have to scale the images down yourself before uploading them. If the image below is a colorless square then try color mode.</p>

        <Converter />
      </div>
      <div className="footer">
        See my developer portfolio at <a href="https://www.danielpetersen.ca" target="_blank">danielpetersen.ca</a>
      </div>
    </div>
  )
}

export default App
