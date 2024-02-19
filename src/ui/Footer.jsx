import LinkButton from "../shared/LinkButton";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-full flex flex-wrap justify-center bg-black h-[80px] text-xs xsm:text-base text-white text-center"
    >
      <LinkButton to="/termeni-si-conditii" className="p-2">
        Termeni și condiții
      </LinkButton>
      <LinkButton to="/politica-cookies" className="p-2">
        Politica cookies
      </LinkButton>
      <LinkButton to="/politica-de-confidentialitate" className="p-2">
        Politica de confidențialitate
      </LinkButton>
    </footer>
  );
};

export default Footer;
