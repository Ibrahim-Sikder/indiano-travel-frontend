// components/TinyMCEEditor.tsx
"use client";

import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useRef, useState } from "react";

declare global {
  interface Window {
    tinymce: any;
  }
}

interface TinyMCEEditorProps {
  value: string;
  onEditorChange: (content: string, editor: any) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  value,
  onEditorChange,
}) => {
  const [loading, setLoading] = useState(false);
  const imagePlaceholderRef = useRef(null);

  const uploadImageToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/uploads",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response?.data?.data?.location; // Ensure your backend returns the image URL in this field
    } catch (error) {
      console.error("Error uploading image:", error);
      return ""; // Handle upload errors gracefully (e.g., display an error message)
    } finally {
      setLoading(false);
    }
  };

  const handleFilePicker = async (cb: any, value: string, meta: any) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      if (!input.files) {
        return;
      }

      const file = input.files[0];

      // Show a loading image placeholder while uploading
      const placeholderImage = document.createElement("img");
      placeholderImage.src = "/loadingImage.gif"; // Replace with your loading image path
      // imagePlaceholderRef.current.appendChild(placeholderImage);
      if (!imagePlaceholderRef.current) {
        console.error(
          "imagePlaceholderRef is null, cannot append loading image"
        );
        return; // Handle the error gracefully, e.g., display an error message to the user
      }

      try {
        const imageUrl = await uploadImageToServer(file);

        // Replace the loading image with the uploaded image URL
        placeholderImage.src = imageUrl;
        cb(imageUrl, { title: file.name });
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle upload errors gracefully (e.g., display an error message)
      } finally {
        // Ensure the placeholder element is cleared even if upload fails
        imagePlaceholderRef.current.innerHTML = ""; // Clear the placeholder container
      }
    };

    input.click();
  };

  return (
    <div>
      <Editor
        apiKey="wjt71aic3l7nnjxunkr3ldgczs6v28d71auha64j3xhrzonn"
        value={value}
        init={{
          height: 600,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "autoresize",
            "save",
            "emoticons",
            "pagebreak",
            "textpattern",
            "code",
            "image",
            "media",
            "imagetools",
            "filepicker",
          ],
          toolbar: ` undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | link unlink image media | forecolor backcolor | emoticons | pagebreak | code | preview `,
          content_style:
            "body { font-family:Arial,Helvetica,sans-serif; font-size:14px; height: 300px; overflow-y: auto; }",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image media",
          file_picker_callback: handleFilePicker,
          paste_data_scripts: false,
          paste_preprocess: function (plugin, args) {
            return args.content;
          },
        }}
        onEditorChange={onEditorChange}
      />
    </div>
  );
};

export default TinyMCEEditor;
