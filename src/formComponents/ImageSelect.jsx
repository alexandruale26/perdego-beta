import { useState, forwardRef } from "react";
import { useController } from "../formBase/ControllerContext";
import { twMerge } from "tailwind-merge";
import { CameraIcon, Cross2Icon } from "@radix-ui/react-icons";
import { INPUT_MAX_WIDTH, IMAGE_MAX_SIZE_MB } from "./constants";

const ImageSelect = forwardRef(({ className, type, onChange, ...props }, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { setFieldAsInvalid } = useController();

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const maxAllowedSizeInBytes = 1024 * (1024 * IMAGE_MAX_SIZE_MB);

    if (file) {
      if (file.type.startsWith("image/") && file.size > maxAllowedSizeInBytes) {
        return setFieldAsInvalid("Imaginea este prea mare.");
      }

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          onChange(e);
        };
        return reader.readAsDataURL(file);
      }

      setFieldAsInvalid("Adaugǎ o imagine validǎ");
    }
  };

  const handleOnClickRemove = (e) => {
    e.preventDefault();

    if (ref.current) ref.current.value = null;
    setSelectedImage(null);
  };

  return (
    <div
      className={twMerge(
        `${INPUT_MAX_WIDTH} h-[200px] flex rounded-lg hover:bg-emerald-200 transition-all ${
          !selectedImage ? "border" : "border-none"
        } border-stone-300 ${!selectedImage ? "shadow-md" : "shadow-lg"} overflow-hidden`,
        className
      )}
    >
      <label className="h-full w-full items-center justify-center overflow-hidden">
        <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={ref} {...props} />

        {!selectedImage && (
          <div className="h-full w-full flex items-center justify-center flex-col gap-1">
            <p className="text-base font-normal text-stone-800">Adauga o imagine</p>
            <p className="text-xs font-light text-stone-600">
              Aceasta va fi imaginea anunțului tău <span className="font-medium">(max {IMAGE_MAX_SIZE_MB}MB)</span>
            </p>
            <CameraIcon className="w-8 h-8 mt-2" />
          </div>
        )}
        {selectedImage && (
          <img src={selectedImage} alt="selected" className="w-full h-full object-cover hover:brightness-[0.6]" />
        )}
      </label>
      {selectedImage && (
        <button
          type="button"
          onClick={handleOnClickRemove}
          className="flex items-center justify-center w-12 h-full text-white bg-red-600 hover:text-black hover:w-1/3 z-10 transition-all shadow-[0_0_20px_0_rgba(255,0,0,0.3)]"
        >
          <Cross2Icon className="w-10 h-10" />
        </button>
      )}
    </div>
  );
});
ImageSelect.displayName = "ImageSelect";

export default ImageSelect;
