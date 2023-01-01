import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostSection = () => {
    const { register, handleSubmit, reset } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()
    // handle login 
    const handleLogin = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const formPost = {
                        message: data.text,
                        image: imgData.data.url
                    };
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(formPost)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                toast.success('Post confirm');
                                reset();
                                navigate('/media')
                            }
                            else {
                                toast.error(data.message);
                            }

                        })
                }

            })

    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)} className='flex items-center gap-2'>
                <input type="text" {...register("text", { required: "text is required" })} placeholder="Type here" className="input input-bordered w-full " />
                <input type="file" {...register("image", { required: "file is required" })} className="input input-bordered  max-w-xs" />
                <input type="submit" value="submit" className='btn btn-success btn-md' />
            </form>
        </div>
    );
};

export default PostSection;