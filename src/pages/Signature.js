import React, { useState, useRef } from 'react';
import './Signature.css'; // Import the CSS file
import SignatureCanvas from 'react-signature-canvas';
import trimCanvas from 'trim-canvas';

const Signature = () => {
  const signatureRef = useRef(null);  // Use ref for SignatureCanvas
  const [result, setResult] = useState(null);

  const clearHandler = () => {
    signatureRef.current.clear();  // Clear the canvas
    setResult(null);
  };

  const saveHandler = () => {
    // Get the canvas from SignatureCanvas
    const canvas = signatureRef.current.getCanvas();

    // Clone and trim the canvas
    const trimmedCanvas = trimCanvas(canvas);

    // Convert trimmed canvas to Data URL
    const res = trimmedCanvas.toDataURL('image/jpeg');

    // Set the trimmed canvas result
    setResult(res);
  };

  return (
    <>
    <div className='sy'>
      <div className='sign-container'>
        <h1 className='title'>E-signature</h1>
        <div className="sign">
          <SignatureCanvas 
            ref={signatureRef}
            penColor='green'
            backgroundColor='rgba(255,255,255,1)'
            canvasProps={{ className: 'sigCanvas' }}
          />
        </div>
        <div className='betw-butt'>
        <button className='butt-sign' onClick={clearHandler}>Clear</button>
        <button className='butt-sign' onClick={saveHandler}>Save</button>
        </div>
        {result && (
          <div>
            <img className='image-sign' src={result} alt="Trimmed signature" />
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default Signature;
