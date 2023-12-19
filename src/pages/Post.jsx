import { useLoaderData } from "react-router-dom";
import { getPost, getImageUrl } from "../services/postApi";
import { HeartIcon, PersonIcon, MobileIcon } from "@radix-ui/react-icons";

const Post = () => {
  const post = useLoaderData();
  console.log(post);
  return (
    <div className="max-w-3xl flex flex-col gap-4 py-4 rounded-md mx-auto">
      <div className="w-full h-[280px] xs:h-[500px] bg-white rounded-md overflow-hidden border transition-all">
        <img src={post.image} alt="object" className="w-full h-full object-contain" />
      </div>

      <section className="w-full flex flex-col items-start justify-center gap-4 bg-white p-4 rounded-md border">
        <div className="flex items-center justify-between">
          <p className="text-xs font-light text-stone-600">Postat 17 decembrie 2023</p>
          <HeartIcon className="w-6 h-6" />
        </div>

        <h1 className="text-2xl text-stone-800">Pierdut telefon Huawei P50 Pro in zona garii</h1>

        <div className="w-full flex flex-wrap gap-1 items-center justify-start">
          <div className="px-4 py-2 text-sm font-light rounded-md border text-stone-800 border-stone-400">
            <p>
              Tip anunț: <span className="font-normal">Pierdute</span>
            </p>
          </div>

          <div className="px-4 py-2 text-sm font-light rounded-md border text-stone-800 border-stone-400">
            <p>
              Locație: <span className="font-normal">Piatra-Neamț</span>
            </p>
          </div>

          <div className="px-4 py-2 text-sm font-light rounded-md border text-stone-800 border-stone-400">
            <p>
              Categorie: <span className="font-normal">Electronice Personale</span>
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold uppercase text-stone-800">Descriere</h2>
        <p className="font-light text-stone-700">
          Este perfect funcțional. Are protectie la supratensiune. Vand doar cu verificare la primire și doar cu comanda
          prin OLX. Vine fără cabluri.
        </p>
      </section>

      <section className="w-full flex items-center justify-between gap-4 bg-white p-4 rounded-md border">
        <div className="flex items-start justify-center flex-col">
          <h3 className="text-lg text-stone-800 uppercase">Contacteazǎ-mǎ</h3>
          <div className="flex gap-4 items-center justify-center">
            <div className="flex items-center justify-center w-14 h-14 border-2 border-black rounded-full">
              <PersonIcon className="w-6 h-6" />
            </div>

            <div>
              <p className="font-light text-stone-800">Alexandru</p>
              <p className="text-xs font-light text-stone-500">
                Membru din <span className="font-medium">iunie 2023</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-center gap-2 bg-emerald-500 px-4 py-2 rounded-md text-white">
            <MobileIcon className="w-8 h-8" />
            <p>0753 555 299</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const loader = async () => {
  //TODO: manage request and response params, and unknown id
  // const postId = "71088321-707e-4cd3-9ddc-20d65e8b6577";
  const postId = "d81e85ef-0aea-4915-9af5-6ce52a701373";
  const receivedData = await getPost(postId);
  const image = getImageUrl(receivedData.image);

  const post = { ...receivedData, image };
  return post;
};

export default Post;
export { loader };
