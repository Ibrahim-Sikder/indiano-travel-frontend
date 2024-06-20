'use client'

import { Box } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"]
];

const TextEditor = () => {
  const [value, setValue] = useState("");

  return (
    <Box sx={{ width: '1000px', margin: '20px auto' }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
        formats={[
          "header", "font", "size",
          "bold", "italic", "underline", "strike",
          "color", "background",
          "script",
          "blockquote", "code-block",
          "list", "bullet", "check",
          "indent",
          "direction", "align",
          "link", "image", "video",
          "clean"
        ]}
        style={{ height: '300px', }}
      />
    </Box>
  );
};

export default TextEditor;
