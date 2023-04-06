import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { CgArrowsExchangeV } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { Nullable } from "remirror";
import SingleImageUploadInput from "../SingleImageUploadInput/SingleImageUploadInput";
import { motion } from "framer-motion";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useIsDraggingOnElement } from "src/utils/hooks";

type Value = ComponentProps<typeof SingleImageUploadInput>["value"];

interface Props {
  value: Value;
  rounded?: string;
  onChange: (new_value: Nullable<Value>) => void;
}

export default function CoverImageInput(props: Props) {
  const dropAreaRef = useRef<HTMLDivElement>(null!);
  const isDragging = useIsDraggingOnElement({ ref: dropAreaRef });

  return (
    <div
      className="overflow-hidden cursor-pointer w-full h-full"
      ref={dropAreaRef}
    >
      <SingleImageUploadInput
        value={props.value}
        onChange={props.onChange}
        wrapperClass="h-full"
        render={({ img, isUploading, isDraggingOnWindow }) => (
          <div className="w-full h-full group relative ">
            {!img && (
              <div
                className={`w-full h-full flex flex-col justify-center items-center bg-gray-100 border-dashed border-2 border-gray-200  ${
                  props.rounded ?? "rounded-12"
                }`}
              >
                <p className="text-center text-gray-800 text-body1 md:text-h1 mb-8">
                  <FaImage />
                </p>
                <div className={`text-gray-700 text-center text-body4`}>
                  Drop a <span className="font-bold">COVER IMAGE</span> here or{" "}
                  <br />{" "}
                  <button
                    className="text-blue-400 underline"
                    aria-label="Upload Cover Image"
                    type="button"
                  >
                    Click to browse
                  </button>
                </div>
              </div>
            )}
            {img && (
              <>
                <img
                  src={img.url}
                  className={`w-full h-full ${
                    props.rounded ?? "rounded-12"
                  } object-cover`}
                  alt=""
                />
                {!isUploading && (
                  <div className="flex flex-wrap gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <button
                      type="button"
                      className="w-42 h-42 flex justify-center items-center rounded-full bg-gray-800 bg-opacity-60 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity text-white text-body3"
                    >
                      <CgArrowsExchangeV />
                    </button>
                    <button
                      type="button"
                      className="w-42 h-42 flex justify-center items-center rounded-full bg-gray-800 bg-opacity-60 opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity text-white text-body3"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.onChange(null);
                      }}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                )}
              </>
            )}
            {isUploading && (
              <div
                className={`absolute inset-0 bg-gray-400  ${
                  props.rounded ?? "rounded-12"
                } bg-opacity-60 flex flex-col justify-center items-center text-white font-bold transition-transform`}
              >
                <RotatingLines
                  strokeColor="#fff"
                  strokeWidth="3"
                  animationDuration="0.75"
                  width="48"
                  visible={true}
                />
              </div>
            )}
            {isDraggingOnWindow && (
              <div
                className={`absolute inset-0 ${
                  isDragging ? "bg-primary-600" : "bg-primary-400"
                } bg-opacity-80 flex flex-col justify-center items-center text-white font-bold transition-transform`}
              >
                <motion.div
                  initial={{ y: 0 }}
                  animate={
                    isDragging
                      ? {
                          y: 5,
                          transition: {
                            duration: 0.4,
                            repeat: Infinity,
                            repeatType: "mirror",
                          },
                        }
                      : {
                          y: 0,
                        }
                  }
                  className="text-center text-body1"
                >
                  <AiOutlineCloudUpload className="scale-150 text-h1 mb-16" />
                  <br />
                  Drop here to upload
                </motion.div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
