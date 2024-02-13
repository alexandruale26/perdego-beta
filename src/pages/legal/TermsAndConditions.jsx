import PageContainer from "../../shared/PageContainer";
import Title from "../../features/legal/Title";
import SecondaryTitle from "../../features/legal/SecondaryTitle";
import { List, ListItem } from "../../features/legal/List";
import TnCLink from "../../features/legal/TCLink";
import { ART_942 } from "../../utils/sharedData";
import { termsAndConditionsTitle, termsAndConditions, termsFinalNotes } from "../../features/legal/termsAndConditions";

//TODO: add email address to 7.

const TermsAndConditions = () => {
  return (
    <PageContainer className="bg-inherit">
      <div className="w-full max-w-4xl h-full mx-auto space-y-8">
        <Title title="Termeni și condiții" />
        <div className="flex flex-col items-start justify-center gap-4 xsm:gap-6 bg-white p-4 xsm:p-8 rounded-md">
          <SecondaryTitle text={termsAndConditionsTitle} />
          <div className="space-y-2 xsm:space-y-3">
            {termsAndConditions.map((term, index) => (
              <List key={term.title} title={`${index + 1}. ${term.title}`}>
                <ListItem className="list-none">
                  <List>
                    {term.content.map((info, infoIndex) => (
                      <ListItem key={termsAndConditionsTitle + infoIndex}>{info}</ListItem>
                    ))}
                  </List>
                </ListItem>
              </List>
            ))}
          </div>
          <SecondaryTitle text={termsFinalNotes.toUserAgreementMessage} />
          <div className="ml-2 xsm:ml-3 space-y-2 xsm:space-y-3">
            <List title="Link-uri utile">
              <ListItem>
                <TnCLink href={ART_942}>Art. 942 din Codului Civil al României </TnCLink>
              </ListItem>
            </List>
          </div>
          <span className="text-xs text-grey-600">{termsFinalNotes.termsModificationDate}</span>
        </div>
      </div>
    </PageContainer>
  );
};

export default TermsAndConditions;
