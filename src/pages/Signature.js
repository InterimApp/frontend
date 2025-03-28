import React, { useState, useRef } from 'react';
import './Signature.css';
import SignatureCanvas from 'react-signature-canvas';
import trimCanvas from 'trim-canvas';
import { uploadFile } from '../config/cloudinary';
import { db } from '../config/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './IWNavBar';

const Signature = ({ userId }) => {
  const signatureRef = useRef(null);
  const [result, setResult] = useState(null);
  const [isSigned, setIsSigned] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { onSignatureComplete } = location.state || {};

  const clearHandler = () => {
    signatureRef.current.clear();
    setResult(null);
    setIsSigned(false);
  };

  const saveHandler = async () => {
    if (signatureRef.current.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }

    try {
      // Step 1: Capture and trim the signature
      const canvas = signatureRef.current.getCanvas();
      const trimmedCanvas = trimCanvas(canvas);
      const signatureDataURL = trimmedCanvas.toDataURL('image/jpeg');

      // Step 2: Upload to Cloudinary
      const signatureUrl = await uploadFile(signatureDataURL, 'image');

      // Step 3: Save to Firestore (if userId exists)
      if (userId) {
        await setDoc(doc(db, 'contracts', `${userId}_active`), {
          pdfURL: signatureUrl,
          signed: true,
          timestamp: new Date(),
        });
      }

      // Step 4: Update state and callbacks
      setResult(signatureUrl);
      setIsSigned(true);
      
      if (onSignatureComplete) {
        onSignatureComplete(signatureUrl);
      }

      alert('Signature saved successfully!');
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('Failed to save signature.');
    }
  };

  const proceedToContract = () => {
    navigate('/iwcontract');
  };

  return (
    <>
      <NavBar />
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
          
          {isSigned && (
            <div>
              <img className="image-sign" src={result} alt="Trimmed signature" />
              <button className="butt-sign" onClick={proceedToContract}>
                Proceed to Contract
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signature;