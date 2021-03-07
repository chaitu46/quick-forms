import React, { useCallback, useRef } from "react";
import { BiCopyAlt } from "react-icons/bi";

export default function ShareUrl({ shareURL, label }) {
  const shareURLRef = useRef(null);
  const handleCopyClick = useCallback(() => {
    shareURLRef.current.focus();
    shareURLRef.current.setSelectionRange(0, shareURLRef.current.value.length);
    document.execCommand("copy");
  }, []);

  return (
    <div className="form-entry-share">
      <label>{label}</label>
      <div className="copy-text">
        <button className="button button--copy" onClick={handleCopyClick}>
          <BiCopyAlt />
        </button>
        <input type="text" ref={shareURLRef} value={shareURL} readOnly />
      </div>
    </div>
  );
}
