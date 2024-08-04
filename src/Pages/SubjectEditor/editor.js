import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = ({ initialContent }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill('#editor', {
        theme: 'snow'
      });
      if (initialContent) {
        quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
      }
    }
  }, [initialContent]);

  return (
    <div id="editor"></div>
  );
};

export default Editor;