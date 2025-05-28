import React, { useState } from "react";
import "./ReportBin.css";
const ReportBin = () => {
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
    };
  
    return (
      <div className="report-bin-container">
        <header className="report-header">
          
          <h2>Report Bin</h2>
        </header>
  
        <h3 className="report-title">REPORT OVERFLOWING BIN</h3>
  
        <form onSubmit={handleSubmit} className="report-form">
          <div className="input-group">
            <span className="icon">👤</span>
            <input type="text" placeholder="NAME" required />
          </div>
  <div className="input-group">
<span className="icon">✉</span>
<input type="email" placeholder="EMAIL" required />
</div>

<div className="input-group">
<span className="icon">📞</span>
<input type="tel" placeholder="PHONE NUMBER" required />
</div>

<div className="input-group">
<span className="icon">📍</span>
<input type="text" placeholder="LOCATION" required />
</div>

<div className="input-group">
<textarea placeholder="Description" rows="4"></textarea>
</div>

<div className="input-group">
<button type="button" className="upload-button">📸 UPLOAD PHOTO</button>
</div>

<button type="submit" className="submit-button">✈ SUBMIT</button>
</form>

{submitted && <p className="success-message">Report Submitted Successfully!</p>}
</div>
);
}

export default ReportBin;