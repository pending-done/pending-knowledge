import PostListPage from '@/components/post_list/PostListPage';
import Calendar from '@/components/ui/calendar/Calendar';

const Blog = async () => {
  return (
    <div className='mx-auto mt-12 w-full max-w-[950px] px-4'>
      <div className='mb-12'>{/* <PostListPage /> */}</div>
      <hr />
      <div className='mt-12'>
        <Calendar />
      </div>
    </div>
  );
};

export default Blog;
