import { useState, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { CameraIcon } from "@radix-ui/react-icons";
import INPUT_MAX_WIDTH from "./constants";

const ImageSelect = forwardRef(({ className, type, onChange, ...props }, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const maxSizeInBytes = 1024 * (1024 * 3);

    if (file) {
      if (file.size > maxSizeInBytes) {
        throw new Error("file too large");
      }

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          onChange(e);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  };

  return (
    <div
      className={twMerge(
        `${INPUT_MAX_WIDTH} h-[200px] bg-slate-0 rounded-md hover:bg-slate-100 transition-all shadow-md border border-slate-800 overflow-hidden`,
        className
      )}
    >
      <label href="hiddenInput" className="h-full w-full flex items-center justify-center">
        <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={ref} {...props} />

        {!selectedImage && (
          <div className="h-full w-full flex items-center justify-center flex-col gap-1">
            <p className="text-base font-normal text-stone-800">Adauga o imagine</p>
            <p className="text-xs font-light text-stone-500">
              Aceasta va fi imaginea anunțului tău <span className="font-medium">(max 3MB)</span>
            </p>
            <CameraIcon className="w-8 h-8 mt-2" />
          </div>
        )}
        {selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />}
      </label>
    </div>
  );
});
ImageSelect.displayName = "ImageSelect";

export default ImageSelect;
