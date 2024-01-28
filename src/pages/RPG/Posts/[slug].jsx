import { useRouter } from "next/router";
import { db } from "../../_app";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import "./Post.css";
import Tags from "@/components/Tags/Tags";
import TableOfContents from "@/components/TableOfContents/TableOfContents";

import ShareButtonsHorizontal from "@/components/SharedButtons/SharedButonsHorizontal";
import Related from "@/components/Related/Related";
import Head from "next/head";

export async function getStaticPaths() {
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);

  // Get the paths we want to pre-render based on posts
  const paths = querySnapshot.docs.map((doc) => ({
    params: { slug: doc.data().path },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const q = query(collection(db, "posts"), where("path", "==", params.slug));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const postData = querySnapshot.docs[0].data();
    return {
      props: {
        post: postData,
      },
      revalidate: 1,
    };
  }

  return {
    notFound: true,
  };
}
export default function Post({ post }) {
  const router = useRouter();
  const path = router.asPath.split("/").pop();

  const url = "https://rolandodados.com.br/RPG/Posts/" + post.path;
  const title = post.title;
  const contentRef = useRef();

  useEffect(() => {
    if (post && contentRef.current) {
      contentRef.current.innerHTML = post.content;
    }
  }, [post]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={post.header} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Boifubá" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.header} />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content={
            "https://rolandodados.com.br/posts/" + post.path + "/" + post.img
          }
        />
        <meta name="theme-color" content="#ea4f4c"></meta>
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.header} />
        <meta name="twitter:card" content="summary_large_image" />{" "}
        <meta
          name="twitter:image"
          content={
            "https://rolandodados.com.br/posts/" + post.path + "/" + post.img
          }
        />
        <meta name="description" content={post.header} />
      </Head>
      <main>
        <div className="content">
          {post ? (
            <div className="corpo">
              <div className="grid2">
                <div className="main">
                  <h1>{post.title}</h1>
                  <div className="text">
                    <p ref={contentRef}></p>
                    <h2>Compartilhe</h2>
                    <ShareButtonsHorizontal url={url} title={title} />
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <h2>Veja também</h2>
                  <Related />
                </div>
                <div className="aside">
                  <h3>Sistemas</h3>
                  <Tags />
                  <h3>Navegador</h3>
                  <TableOfContents />
                  {/* <h3>Publicidade</h3> */}
                </div>
              </div>
            </div>
          ) : (
            "Fnord..."
          )}
        </div>
      </main>
    </>
  );
}
