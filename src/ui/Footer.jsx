import LinkButton from "../shared/LinkButton";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-full flex flex-col xsm:flex-row justify-center bg-black h-[80px] text-white text-center"
    >
      <LinkButton to="/termeni-si-conditii" className="p-4">
        Termeni și condiții
      </LinkButton>
      <LinkButton to="/politica-cookies" className="p-4">
        Politica cookies
      </LinkButton>
      <LinkButton to="/politica-de-confidentialitate" className="p-4">
        Politica de confidențialitate
      </LinkButton>
    </footer>
  );
};

export default Footer;
