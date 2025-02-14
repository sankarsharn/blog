import { Button, FileInput, Select, TextInput, Alert, Spinner } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        category: 'uncategorized',
        content: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPublishError(null);
        setUploading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('content', formData.content);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                body: formDataToSend,
            });
            const data = await res.json();
            setUploading(false);
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            navigate('/dashboard?tab=posts');
        } catch (error) {
            setUploading(false);
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
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='personalities'>Personalities</option>
                        <option value='literature'>Literature</option>
                        <option value='poems'>Poems</option>
                        <option value='stories'>Stories</option>
                        <option value='ghazal'>Ghazal</option>
                    </Select>
                </div>
                <div className='flex flex-col gap-4 border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt='Preview' className='w-32 h-32 object-cover' />}
                    {uploading && <Spinner />}
                </div>
                <ReactQuill
                    theme='snow'
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                />
                <Button type='submit' gradientDuoTone='purpleToPink' disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Publish'}
                </Button>
                {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
            </form>
        </div>
    );
}
