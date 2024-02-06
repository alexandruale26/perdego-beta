import { MobileIcon } from "@radix-ui/react-icons";

const displayAsPhoneNumber = (number) => {
  return number.slice(0, 4) + " " + number.slice(4, 7) + " " + number.slice(7);
};

const Telephone = ({ number }) => {
  return (
    <a
      href={`tel:${number}`}
      className="w-full xsm:w-fit flex flex-wrap items-center justify-center gap-2 bg-primary-500 py-2 pr-4 pl-3 rounded-md text-white hover:bg-primary"
    >
      <MobileIcon className="w-8 h-8" />
      <p className="font-medium xs:text-[18px] selection:bg-primary-500">{displayAsPhoneNumber(number)}</p>
    </a>
  );
};

export default Telephone;
