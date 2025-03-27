import React, { useState, useRef } from 'react';
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