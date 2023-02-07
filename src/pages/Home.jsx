import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch(); 
  const userData = useSelector((state) => state.auth.data); 
  const { posts, tags} = useSelector((state) => state.posts); 

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? 
            ( <Post key = {index}  isLoading= {true} /> 
            ):(
              <Post
                id={obj._id}
                title= {obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3} //
                tags={obj.tags}
                isEditable = {userData?._id === obj.user._id}
              />
            )  )}
        </Grid>
        <Grid xs={4} item>
        <TagsBlock items={tags.items} isLoading={isTagsLoading} />
    
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Mr.Bean',
                  avatarUrl: 'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1',
                },
                text: 'However, AI also raises important ethical and societal concerns. For example, the widespread use of AI has the potential to replace human workers and lead to job loss. It is also crucial to ensure that AI is developed and used in a responsible and ethical manner, without causing harm to individuals or society.',
              },
              {
                user: {
                  fullName: 'Bruce Willis',
                  avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa0mY04NeynM9jLwuxyuvaqyjfwHeBJkPsEwxUO-junn3ptTn8MyFPeTVpa5sppoAu758&usqp=CAU',
                },
                text: 'ChatGPT is a powerful tool for generating text and can be useful in a variety of applications.',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
