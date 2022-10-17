export const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      ['link', 'image', 'video', 'formula', 'file'],            // add's image support
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
    
      ['clean'] 
    ],
    clipboard: {
      matchVisual: false,
    }
  }

export const formats = [
    "header",
    "size",
    "bold",
    "color",
    "background",
    "code",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "align",
    "code-block",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "formula",
    "file",
    "script",
    "direction",
    "clean"
  ];