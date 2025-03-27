import React, { useState, useRef } from 'react';
<<<<<<< HEAD
import './Signature.css';
import SignatureCanvas from 'react-signature-canvas';
import trimCanvas from 'trim-canvas';
import { uploadFile } from '../config/cloudinary';
import { db } from '../config/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';

const Signature = ({ userId }) => {
  const signatureRef = useRef(null);
  const [result, setResult] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { onSignatureComplete } = location.state || {};

  const clearHandler = () => {
    signatureRef.current.clear();
    setResult(null);
  };

  const saveHandler = async () => {
    if (signatureRef.current.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }

    try {
      // Step 1: Capture the signature as an image
      const canvas = signatureRef.current.getCanvas();
      const trimmedCanvas = trimCanvas(canvas);
      const signatureDataURL = trimmedCanvas.toDataURL('image/jpeg');

      // Step 2: Upload the image to Cloudinary
      const signatureUrl = await uploadFile(signatureDataURL, 'image');

      // Step 3: Save the Cloudinary URL to Firestore
      await setDoc(doc(db, 'contracts', `${userId}_active`), {
        pdfURL: signatureUrl, // Save the signature URL as the contract PDF
        signed: true, // Mark the contract as signed
        timestamp: new Date(),
      });

      // Step 4: Update the signature status
      if (onSignatureComplete) {
        onSignatureComplete(signatureUrl); // Pass the Cloudinary URL back
      }

      // Display the uploaded image
      setResult(signatureUrl);
      alert('Signature saved successfully!');

      // Redirect back to the contract page
      navigate('/contract');
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('Failed to save signature.');
    }
  };

  return (
    <div className="sy">
      <div className="sign-container">
        <h1 className="title">E-signature</h1>
        <div className="sign">
          <SignatureCanvas
            ref={signatureRef}
            penColor="green"
            backgroundColor="rgba(255,255,255,1)"
            canvasProps={{ className: 'sigCanvas' }}
          />
        </div>
        <div className="betw-butt">
          <button className="butt-sign" onClick={clearHandler}>
            Clear
          </button>
          <button className="butt-sign" onClick={saveHandler}>
            Save
          </button>
        </div>
        {result && (
          <div>
            <img className="image-sign" src={result} alt="Trimmed signature" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Signature;
=======
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
>>>>>>> origin/iheb
