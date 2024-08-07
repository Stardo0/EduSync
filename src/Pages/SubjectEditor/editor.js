import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './editor.css';
import firebase from '../../fierbase';
import Button from '@mui/material/Button';
import { ref, set, push } from 'firebase/database';
import database from '../../fierbase';

const Editor = ({ initialContent, selectedOption, setedit }) => {
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

  const Save = () => {
    const editorContent = document.getElementById('editor').innerHTML;
  
    if (!selectedOption || typeof selectedOption.label !== 'string' || selectedOption.label.trim() === '') {
      console.error('Invalid selectedOption:', selectedOption);
      return;
    }
  
    const contentRef = ref(database, `subjects/${selectedOption.label}/requests`);
  
    push(contentRef, {
      html: editorContent
    })
    .then(() => {
      console.log('HTML content saved successfully.');
      setedit(false);
    })
    .catch((error) => {
      console.error('Error saving HTML content:', error);
    });
  };


  return (
    <>
      <div id="editor"></div>
      <Button variant="contained" style={{ marginTop: '10px' }} onClick={Save}>Save</Button>
    </>

                        
  );
};

export default Editor;