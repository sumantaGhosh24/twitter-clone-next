"use client";

import React, {useState, useCallback, useEffect} from "react";
import Image from "next/image";
import {useDropzone} from "react-dropzone";

interface DropzoneProps {
  label: string;
  value?: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
}

const ImageUpload: React.FC<DropzoneProps> = ({
  label,
  value,
  disabled,
  onChange,
}) => {
  const [base64, setBase64] = useState(value);

  useEffect(() => {
    setBase64(value);
  }, [value]);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-2 text-white text-center border-2 border-dotted rounded-md border-neutral-700 mb-3",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image
            src={base64}
            height={100}
            width={100}
            alt="Upload image"
            className="w-full h-full"
          />
        </div>
      ) : (
        <p className="text-primary">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
