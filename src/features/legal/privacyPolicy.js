import { CONTACT_EMAIL } from "./constants";

const privacyPolicy = [
  {
    title: "Informații colectate",
    content: [
      "La PERDEGO, colectăm informații furnizate de tine în timp ce utilizezi platforma noastră, inclusiv numele, adresa de e-mail și alte detalii relevante strict în scopul oferirii serviciilor noastre de creare a anunțurilor privind obiectele pierdute sau găsite.",

      "Aceste informații sunt necesare exclusiv pentru a asigura o experiență personalizată și pentru a facilita interacțiunea cu platforma noastră.",
    ],
  },
  {
    title: "Utilizarea informațiilor",
    content: [
      "Folosim informațiile tale personale pentru a-ți oferi serviciile noastre, pentru a personaliza experiența ta pe platformă și pentru a îmbunătăți serviciile noastre în general.",

      "Nu comercializăm, nu împrumutăm și nu tranzacționăm informațiile tale personale către terți fără consimțământul tău explicit.",
    ],
  },
  {
    title: "Confidențialitate și securitate",
    content: [
      "Ne angajăm să protejăm informațiile tale personale și să le menținem în siguranță. Implementăm măsuri tehnice și organizaționale adecvate pentru a preveni accesul neautorizat, divulgarea sau modificarea informațiilor tale personale.",
    ],
  },
  {
    title: "GDPR și conformitate",
    content: [
      "Ne angajăm să respectăm cerințele Regulamentului General privind Protecția Datelor (GDPR) și să protejăm drepturile și confidențialitatea datelor tale personale conform acestor norme.",

      `De asemenea, vă informăm că în România există Autoritatea Națională pentru Supravegherea Prelucrării Datelor cu Caracter Personal (A.N.S.P.D.C.P.) și cǎ aveți dreptul să depuneți o plângere în cazul în care considerați că drepturile dvs. au fost încălcate, accesând pagina web "www.dataprotection.ro."`,
    ],
  },
  {
    title: "Drepturile tale",
    content: [
      "Ai dreptul de a accesa, corecta sau șterge informațiile tale personale stocate în contul tău PERDEGO.",

      "De asemenea, poți solicita restricționarea sau oprirea prelucrării datelor tale personale. Ne străduim să îți oferim control deplin asupra informațiilor tale personale.",
    ],
  },
  {
    title: "Schimbări în politica de confidențialitate",
    content: [
      "Această politică de confidențialitate poate fi actualizată periodic pentru a reflecta modificările aduse serviciilor noastre sau cerințele legale, inclusiv cele GDPR. Te încurajăm să verifici periodic această pagină pentru a fi la curent cu cele mai recente actualizări.",
    ],
  },
  {
    title: "Contact",
    content: [
      `Dacă ai întrebări sau nelămuriri cu privire la această politică de confidențialitate sau la practicile noastre în materie de confidențialitate, te rugăm să ne contactezi la adresa de e-mail "${CONTACT_EMAIL}".`,
    ],
  },
];

const privacyPolicyTitle =
  "Salutare și bun venit pe platforma PERDEGO! Ne bucurăm că ești aici și dorim să-ți oferim transparență și încredere în modul în care colectăm, utilizăm și protejăm informațiile tale personale. Această politică de confidențialitate descrie modul în care procesăm datele tale și drepturile tale în calitate de utilizator al platformei noastre.";

const privacyPolicyFinalNotes = {
  toUsersMessage:
    "Prin utilizarea platformei noastre, ești de acord cu prelucrarea datelor tale personale conform acestei politici de confidențialitate. Apreciem că ai ales să utilizezi PERDEGO și suntem aici pentru a-ți oferi o experiență sigură și plăcută! PERDEGO este o platformă independentă dedicată confidențialității și transparenței datelor tale.",

  termsModificationDate: "Ultima actualizare: Februarie 2024",
};

export { privacyPolicyTitle, privacyPolicy, privacyPolicyFinalNotes };
