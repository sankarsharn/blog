import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        category: 'uncategorized',
        content: ''
    });

    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        } catch (error) {
          setPublishError('Something went wrong');
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <Select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='personalities'>Personalities</option>
                        <option value='literature'>Literature</option>
                        <option value='poems'>Poems</option>
                        <option value='stories'>Stories</option>
                        <option value='ghazal'>Ghazal</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                    >
                        Upload image
                    </Button>
                </div>
                <ReactQuill
                    theme='snow'
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                    value={formData.content}
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
                {publishError && (
                    <Alert className='mt-5' color='failure'>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
}
