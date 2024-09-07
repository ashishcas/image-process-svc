/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"; // This is a client component 
import { connect } from "http2";
import { useState, useRef } from "react";

type cropType = {
    x: number,
    y: number,
    width: number,
    height: number
}

export default function CropImage({ imageSrc }: { imageSrc: string }) {
    const [crop, setCrop] = useState<cropType>({
        x: 50,
        y: 50,
        width: 200, 
        height: 200 
    });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const imgRef = useRef<HTMLImageElement | null>(null);
    const cropRef = useRef<HTMLInputElement>(null);
    const [croppedImage, setCroppedImage] = useState<string>();
    const startDrag = (e: any) => {
        e.preventDefault();
        // Calculate offset between the mouse pointer and the top-left corner of the crop box
        const rect = cropRef?.current?.getBoundingClientRect() as DOMRect;
        const { left, top} = rect;
        setOffset({
          x: e.clientX - left,
          y: e.clientY - top,
        });
        setDragging(true);
    };
    
      const endDrag = () => {
        setDragging(false);
      };

      const onDrag = (event: { clientX: number; clientY: number; }) => {
        if(!dragging){
            return
        }
        if(dragging){
            const { clientX, clientY } = event;
            // Calculate offset between the mouse pointer and the top-left corner of the crop box
            if(!imgRef){
                return;
            }
            const rect = imgRef?.current?.getBoundingClientRect?.() as DOMRect;
            const { left, top} = rect;
            const newX = clientX - left - offset.x;
            const newY = clientY - top - offset.y;
            setCrop((prev) => ({
                ...prev,
                x: Math.max(0, Math.min(newX, rect.width - prev.width)),
                y: Math.max(0, Math.min(newY, rect.height - prev.height)),
            }))
        }
      }

      const getCroppedImage = () => {
        const img = imgRef.current;
        const canvas = document.createElement("canvas");
        if(!img){
            return;
        }
        const { naturalWidth, width, naturalHeight, height } = img;
        const scaleX = naturalWidth/width;
        const scaleY = naturalHeight/height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
            img,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )
        const croppedImage = canvas.toDataURL("image/jpeg");
        setCroppedImage(croppedImage)
        console.log({croppedImage});
        return croppedImage
      }
    return(
        <div className="relative inline-block"
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        >
            <img ref={imgRef}
            src={imageSrc}
            className="max-w-[100]"
            />
            <div
              ref={cropRef}
              className="absolute border-2 border-white bg-white/30 cursor-move"
              style={{
                top: `${crop.y}px`,
                left: `${crop.x}px`,
                width: `${crop.width}px`,
                height: `${crop.height}px`,
              }}
              onMouseDown={startDrag}
            ></div>
            <button onClick={getCroppedImage} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crop</button>
            {croppedImage && (
                <div>
                <h3>Cropped Image:</h3>
                <img src={croppedImage} alt="Cropped" />
                </div>
            )}
        </div>
    )
}

