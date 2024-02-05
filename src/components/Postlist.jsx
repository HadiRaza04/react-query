import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { addPost, fetchPosts, fetchTags } from '../api/api';

const PostList = () => {

    const { data:postData, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
      })
      const {mutate, isError:isPostError, isPeding, error:postError} = useMutation({
        mutationFn: addPost,
      })
      const {data:tagsData} = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
      })
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const tags = Array.from(formData.keys()).filter(
            (key) => formData.get(key) === "on"
        );

        if(!title || !tags) return;

        mutate({id: postData.length + 1, title, tags});
        e.target.reset();
      }
  return (
        <div className='mt-16'>

            <form onSubmit={handleSubmit} className='w-[80%] m-auto flex flex-col items-center p-2 border-2'>
                <h3>Post Anything</h3>
                <input className='w-[65%] rounded bg-slate-200 text-black m-1 outline-0 p-2' type="text" placeholder='Enter your post ...' name='title' />
                <div className='flex justify-around w-[75%]'>
                    {
                        tagsData?.map((tag) => {
                            return(
                                <div key={tag} className='flex flex-row justify-around'>
                                    <input type="checkbox" id={tag} name={tag} />
                                    <label htmlFor={tag}>{tag}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='bg-blue-500 p-2 px-4 text-black rounded-md hover:bg-blue-600 hover:text-white transition-all mt-2'>Post</button>
            </form>


            {isLoading ? (
                <>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                    <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' ></div>
                </>
            ) : 
                (
                    postData.map((post) => {
                        return (
                            <div className='flex p-2 text-lg bg-slate-200 m-2 rounded-md w-[100%] h-[50px]' key={post.id}>
                                <h2>{post.title}</h2>
                                {post.tags.map((tag) => (
                                    <span className='font-bold ml-2 bg-black/20 px-3' key={tag}>{tag}</span>
                                ))}
                            </div>
                        )
                    })
                )
            }
            {isError && <p>{error.message}</p>}
        </div>     
  )
}

export default PostList;