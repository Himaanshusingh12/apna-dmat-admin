import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const JoditTextEditor = ({ value, onChange }) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    toolbarSticky: false,
    width: "100%",
    height: 400,
    buttons:
      "bold,italic,|,ul,ol,|,link,image,|,left,center,right,|,undo,redo,source",
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
};

export default JoditTextEditor;
