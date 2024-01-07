import { MobileIcon } from "@radix-ui/react-icons";

const displayAsPhoneNumber = (number) => {
  return number.slice(0, 4) + " " + number.slice(4, 7) + " " + number.slice(7);
};

const Telephone = ({ number }) => {
  return (
    <a
      href={`tel:${number}`}
      className="flex flex-wrap items-center justify-center gap-2 bg-emerald-500 px-4 py-2 rounded-md text-white hover:bg-emerald-400"
    >
      <MobileIcon className="w-8 h-8" />
      <p className="font-medium xs:text-[18px] selection:bg-emerald-500">{displayAsPhoneNumber(number)}</p>
    </a>
  );
};

export default Telephone;
