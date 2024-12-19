import React from 'react';

import Link from 'next/link';

import { Post, PostWithOrder } from '@/config/types';

interface PostTitleProps {
  post: PostWithOrder;
}

const PostTitle = ({ post }: PostTitleProps) => {
  return (
    // <Link href={`/blog/${post.categoryPath}/${post.url}`} className='px-3'>
    <Link href={`${post.url}`} className='px-3'>
      <p className='text-gray-400 hover:text-black hover:underline'>
        {post.order}. {post.title} : {post.url}
      </p>
    </Link>
  );
};

export default PostTitle;
