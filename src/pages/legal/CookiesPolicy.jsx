import PageContainer from "../../shared/PageContainer";
import Section from "../../shared/Section";
import Title from "../../features/legal/Title";
import SecondaryTitle from "../../features/legal/SecondaryTitle";
import { List, ListItem } from "../../features/legal/List";
import { cookiesPolicy, cookiesPolicyTitle, cookiesPolicyFinalNotes } from "../../features/legal/cookiesPolicy";

//TODO: add email address to final notes.

const CookiesPolicy = () => {
  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto space-y-8">
        <Title title="Politica cookies" />
        <Section className="flex-col items-start justify-center xsm:gap-6 xsm:p-8">
          <SecondaryTitle text={cookiesPolicyTitle} />
          <div className="space-y-2 xsm:space-y-3">
            {cookiesPolicy.map((term, index) => (
              <List key={term.title} title={`${index + 1}. ${term.title}`}>
                <ListItem className="list-none">
                  <List>
                    {term.content.map((info, infoIndex) => (
                      <ListItem key={term.title + infoIndex}>{info}</ListItem>
                    ))}
                  </List>
                </ListItem>
              </List>
            ))}
          </div>
          <SecondaryTitle text={cookiesPolicyFinalNotes.toUsersMessage} />

          <span className="text-xs text-grey-600">{cookiesPolicyFinalNotes.termsModificationDate}</span>
        </Section>
      </div>
    </PageContainer>
  );
};

export default CookiesPolicy;
