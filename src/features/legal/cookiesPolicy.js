import { CONTACT_EMAIL } from "./constants";

const cookiesPolicy = [
  {
    title: "Introducere",
    content: [
      "Bun venit pe PERDEGO! Îți mulțumim că folosești platforma noastră pentru a găsi obiecte pierdute sau pentru a anunța obiectele găsite. Politica noastră de cookie-uri este concepută pentru a-ți oferi transparență și încredere în privința modului în care utilizăm cookie-urile pe site-ul nostru.",
    ],
  },
  {
    title: "Scopul utilizării cookie-urilor",
    content: [
      "Folosim cookie-uri pentru a asigura funcționalitatea corectă a site-ului nostru și pentru a îmbunătăți experiența ta de utilizare. Cookie-urile ne ajută să oferim funcționalități personalizate și să ne asigurăm că site-ul funcționează în mod corespunzător.",
    ],
  },
  {
    title: "Tipurile de cookie-uri utilizate",
    content: [
      "Cookie-uri de funcționalitate: Folosim exclusiv cookie-uri de funcționalitate, care permit site-ului să își amintească alegerile făcute de utilizatori și să ofere funcționalități personalizate.",
    ],
  },
  {
    title: "Confidențialitatea și securitatea",
    content: [
      "Ne angajăm să protejăm confidențialitatea și securitatea datelor tale. Cookie-urile pe care le folosim nu colectează informații personale sau date despre utilizator și utilizarea site-ului. Folosim doar cookie-uri de funcționalitate pentru a asigura o experiență optimă pe platforma noastră.",
    ],
  },
  {
    title: "Acordul utilizatorului",
    content: [
      "Prin continuarea utilizării site-ului nostru, ești de acord cu utilizarea cookie-urilor conform politicii noastre. Nu este posibil să modifici sau să controlezi individual cookie-urile utilizate pe site-ul nostru.",
    ],
  },
  {
    title: "Actualizări ale politicii de cookie-uri",
    content: [
      "Politica noastră de cookie-uri poate fi actualizată periodic pentru a reflecta modificările în legislație sau în practicile noastre. Te vom informa despre aceste modificări prin intermediul site-ului nostru.",
    ],
  },
];

const cookiesPolicyTitle = "Descoperă cum folosim cookie-urile pentru o experiență plăcută pe platforma PERDEGO!";

const cookiesPolicyFinalNotes = {
  toUsersMessage: `Dacă ai întrebări sau nelămuriri cu privire la politica noastră de cookie-uri sau despre utilizarea acestora pe site-ul nostru, te rugăm să ne contactezi la adresa "${CONTACT_EMAIL}". Mulțumim pentru folosirea platformei noastre și pentru încrederea acordată!`,
  termsModificationDate: "Ultima actualizare: Februarie 2024",
};

export { cookiesPolicyTitle, cookiesPolicy, cookiesPolicyFinalNotes };
