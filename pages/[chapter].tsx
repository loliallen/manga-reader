import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Chapter.module.css";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { chapter } = query;

  const res = await fetch("https://anime777.ru/api/comics/459/" + chapter, {
    method: "POST",
  });
  const images = await res.json();
  return {
    props: {
      images,
      chapter,
    },
  };
};

type Props = {
  images: string[];
  chapter: string;
};

const Page = ({ images, chapter }: Props) => {
  const router = useRouter();
  const goto = (to: 1 | -1) => {
    if (window) {
      localStorage.setItem("chapter", `${Number(chapter) + to}`);
    }
    router.push(`/${Number(chapter) + to}`);
  };

  return (
    <>
      <header className={styles.header}>
        <button onClick={() => goto(-1)}>PREV</button>
        <h3>{chapter}</h3>
        <button onClick={() => goto(1)}>NEXT</button>
      </header>
      <div className={styles.container}>
        {images.map((i) => (
          <img key={i} className={styles.image} src={i} />
        ))}
      </div>
      <header className={styles.header}>
        <button onClick={() => goto(-1)}>PREV</button>
        <h3>{chapter}</h3>
        <button onClick={() => goto(1)}>NEXT</button>
      </header>
    </>
  );
};

export default Page;
