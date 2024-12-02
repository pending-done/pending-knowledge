import CategoryListWithPostList from './CategoryListWithPostList';
import PostCard from './PostCard';
import { getAllPostCount, getCategoryDetailList, getSortedPostList } from '@/lib/post';
import { getPostListWithOrder } from '@/lib/post';

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();

  const postListWithOrder = getPostListWithOrder(postList);

  return (
    <section className='w-full'>
      <CategoryListWithPostList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
        postList={postListWithOrder}
      />
      {/* <section>
        <ul className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12'>
          {postList.map((post) => (
            <PostCard key={post.url + post.date} post={post} />
          ))}
        </ul>
      </section> */}
    </section>
  );
};

export default PostListPage;
