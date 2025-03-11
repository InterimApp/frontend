import React, { useState, useRef } from 'react';
import './Signature.css'; // Import the CSS file
import SignatureCanvas from 'react-signature-canvas';
import trimCanvas from 'trim-canvas';
import NavBar from './IWNavBar';
import { useNavigate } from "react-router-dom";

const Signature = () => {
  const signatureRef = useRef(null); 
  const [result, setResult] = useState(null);
  const [isSigned, setIsSigned] = useState(false);  // Track if signature is saved
  const navigate = useNavigate();

  const clearHandler = () => {
    signatureRef.current.clear();  // Clear the canvas
    setResult(null);
    setIsSigned(false);  // Reset signed state
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
    setIsSigned(true);  // Mark signature as saved
  };

  const proceedToContract = () => {
    // Navigate to the contract page after seeing the signature
    navigate("/iwcontract");
  };

  return (
    <>
      <div className='sy'>
        <NavBar />
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

          {isSigned && (
            <div>
              <p>Here's your signature:</p>
              <img className='image-sign' src={result} alt="Trimmed signature" />
              <div>
                <button className="butt-sign" onClick={proceedToContract}>Proceed to Contract</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signature;
