import React from "react";
import { useParams } from "react-router-dom";
import axios from '../axios';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const { id } = useParams();

    React.useEffect(()=> {
      axios
        .get(`/posts/${id}`)
        .then((res)=> {
          setData(res.data);
          setLoading(false);
        })
        .catch((err)=> {
          console.warn(err);
          alert('Error by getting an article');
        })
    }, []);

    if (isLoading) {
      return <Post isLoading={isLoading} isFullPost />
    }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data .user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Mr. Sean",
              avatarUrl: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png",
            },
            text: "Test comment",
          },
          {
            user: {
              fullName: "Dr. House",
              avatarUrl: "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1",
            },
            text: "It's important to keep in mind that AI language models like ChatGPT are not perfect and may sometimes generate responses that are incorrect, offensive, or inappropriate.",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
