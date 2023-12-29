import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
  }, []);
  // const [dataFetched, setDataFetched] = useState(false);  thiss can be used to fetch data one time and print it but useEffect is a better way than defining a state as it has more functionality to  it( useEffect handles side effect like data fetching and event listners it runs after every render by default )
  // if(!dataFetched){

  //   fetch('https://dummyjson.com/posts')
  // .then((res) => res.json())
  // .then((data) =>{
  //   addInitialPosts(data.posts);
  //    setDataFetched(true);
  // });
  //  }
  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}

      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};
export default PostList;
