import Section from "../../shared/Section";
import LinkButton from "../../shared/LinkButton";
import DashboardPost from "./DashboardPost";

const PostsDashboardContent = ({ posts }) => {
  return (
    <Section className="flex flex-col items-start justify-start gap-4 bg-transparent border-none p-0 shadow-none">
      {posts.length < 1 ? (
        <div className="w-full flex flex-col items-center justify-center gap-6 py-20 select-none">
          <span className="text-4xl xs:text-5xl pb-10 bg-clip-text text-transparent bg-gradient-to-b from-cyan-400 to-cyan-500">
            ¯\_(ツ)_/¯
          </span>

          <h3 className="text-lg xs:text-xl text-grey-700">Ai pierdut sau ai gǎsit un obiect?</h3>
          <LinkButton to="/new" disguiseAsFullButton={true} className="min-h-[40px] max-w-[250px]">
            Adaugǎ anunț nou
          </LinkButton>
        </div>
      ) : (
        posts.map((post) => <DashboardPost key={post.id} post={post} />)
      )}
    </Section>
  );
};

export default PostsDashboardContent;
