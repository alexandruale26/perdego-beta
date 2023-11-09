import React from "react";
import Form from "../ui/Form";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-center px-4">
      <Form>
        <Form.Section title="Ofera cât mai multe detalii!">
          <Form.LabeledInput
            nameId="title"
            label="Adaugǎ titlu*"
            placeholder="ex: Pierdut telefon, de culoare alb, zona Pietei Centrale"
            wider={true}
          />
        </Form.Section>

        <Form.Section>
          <Form.LabeledInput nameId="location" label="Localitate" />
        </Form.Section>

        <Form.Section>
          <Form.LabeledTextarea nameId="description" label="Descriere" wider={true}></Form.LabeledTextarea>
        </Form.Section>

        <Form.Section title="Informații de contact">
          <Form.LabeledInput nameId="name" label="Persoana de contact*" />
          <Form.LabeledInput nameId="email" label="Adresa de email" />
          <Form.LabeledInput nameId="phone" label="Numǎrul de telefon" />
        </Form.Section>
      </Form>
    </div>
  );
};

export default Home;
