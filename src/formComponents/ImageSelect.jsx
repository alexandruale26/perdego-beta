import { useState, forwardRef } from "react";
import { useController } from "../formBase/ControllerContext";
import { twMerge } from "tailwind-merge";
import { TrashIcon } from "@radix-ui/react-icons";
import Image from "../shared/icons/Image";

const IMAGE_MAX_SIZE_MB = 8;

const ImageSelect = forwardRef(({ className, type, onChange, imageUrl = null, ...props }, ref) => {
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

      setFieldAsInvalid("Adaugǎ o imagine");
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
        "h-[220px] xs:h-[300px] sm:h-[400px] w-full relative bg-white rounded-md hover:bg-primary-300-300 transition-colors overflow-hidden select-none",
        className
      )}
    >
      <button
        type="button"
        className="h-full w-full border border-grey-300 rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700 overflow-hidden"
      >
        <label className="h-full w-full items-center justify-center overflow-hidden">
          <input hidden type="file" accept="image/*" onChange={handleImageChange} ref={ref} {...props} />

          {!selectedImage && imageUrl === null && (
            <div className="h-full w-full flex items-center justify-center flex-col gap-1  cursor-pointer">
              <p className="text-base font-normal text-grey-800">Adauga o imagine</p>
              <p className="text-xs font-light text-grey-600">
                Aceasta va fi imaginea anunțului tău <span className="font-medium">(max {IMAGE_MAX_SIZE_MB}MB)</span>
              </p>
              <Image className="mt-2 max-w-[70px] max-h-[70px]" />
            </div>
          )}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="selected"
              draggable="false"
              className="w-full h-full object-cover hover:brightness-[0.6]"
            />
          )}
          {selectedImage === null && imageUrl && (
            <img
              src={imageUrl}
              alt="selected"
              draggable="false"
              className="w-full h-full object-cover hover:brightness-[0.6]"
            />
          )}
        </label>
      </button>

      {selectedImage && (
        <button
          type="button"
          onClick={handleOnClickRemove}
          className="flex items-center justify-center w-12 h-full border border-l-0 border-grey-300 rounded-r-md text-white bg-[rgba(252,0,60,1)] hover:text-black hover:w-1/3 z-10 transition-all shadow-[0_0_20px_0_rgba(255,0,0,0.3)] absolute top-0 right-0 focus-visible:outline-none focus-visible:border-2 focus-visible:border-grey-700 overflow-hidden"
        >
          <TrashIcon className="w-10 h-10" />
        </button>
      )}
    </div>
  );
});
ImageSelect.displayName = "ImageSelect";

export default ImageSelect;
