import PageContainer from "../../shared/PageContainer";
import Section from "../../shared/Section";
import Title from "../../features/legal/Title";
import SecondaryTitle from "../../features/legal/SecondaryTitle";
import { List, ListItem } from "../../features/legal/List";
import { privacyPolicyTitle, privacyPolicy, privacyPolicyFinalNotes } from "../../features/legal/privacyPolicy";

//TODO: add email address

const PrivacyPolicy = () => {
  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto space-y-8">
        <Title title="Politicǎ de confidentialitate" />
        <Section className="flex-col items-start justify-center xsm:gap-6 xsm:p-8">
          <SecondaryTitle text={privacyPolicyTitle} />
          <div className="space-y-2 xsm:space-y-3">
            {privacyPolicy.map((term, index) => (
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
          <SecondaryTitle text={privacyPolicyFinalNotes.toUsersMessage} />

          <span className="text-xs text-grey-600">{privacyPolicyFinalNotes.termsModificationDate}</span>
        </Section>
      </div>
    </PageContainer>
  );
};

export default PrivacyPolicy;
