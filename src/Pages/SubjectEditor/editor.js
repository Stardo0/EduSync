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

    const toolbarOptions = [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['clean'] // Entfernt Formatierungen
    ];

    if (!quillRef.current) {
      quillRef.current = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
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
  
    const Uid = '4c9U9MwCqSbydQU5M8HnPK82b9C2'; // Replace with the actual Uid variable if it's dynamic
  
    if (Uid === '4c9U9MwCqSbydQU5M8HnPK82b9C2') {
      const contentRef = ref(database, `subjects/${selectedOption.label}/content/HTML`);
  
      set(contentRef, editorContent)
        .then(() => {
          console.log('HTML content saved successfully.');
          setedit(false);
        })
        .catch((error) => {
          console.error('Error saving HTML content:', error);
        });
    } else {
      console.error('Invalid Uid:', Uid);
    }
  };


  return (
    <>
      <div id="editor"></div>
      <Button variant="contained" style={{ marginTop: '10px' }} onClick={Save}>Save</Button>
    </>

                        
  );
};

export default Editor;