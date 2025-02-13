import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get('searchTerm') || '';
        const sortFromUrl = urlParams.get('sort') || 'desc';
        const category = urlParams.get('category') || 'uncategorized';

        setSidebarData((prev) => ({
            ...prev,
            searchTerm,
            sort: sortFromUrl,
            category,
        }));

        const fetchPosts = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/post/getposts?${searchQuery}`);
                if (!res.ok) throw new Error('Failed to fetch posts');

                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                setShowMore(data.posts.length === 9);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        setSidebarData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value || (e.target.id === 'sort' ? 'desc' : 'uncategorized'),
        }));
    };

    const handleShowMore = async () => {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', posts.length);
        const searchQuery = urlParams.toString();

        try {
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) throw new Error('Failed to fetch more posts');

            const data = await res.json();
            setPosts((prev) => [...prev, ...data.posts]);
            setShowMore(data.posts.length === 9);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        navigate(`/search?${urlParams.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <TextInput
                            placeholder="Search..."
                            id="searchTerm"
                            type="text"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <Select id="sort" value={sidebarData.sort} onChange={handleChange}>
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Category:</label>
                        <Select id="category" value={sidebarData.category} onChange={handleChange}>
                            <option value="uncategorized">Uncategorized</option>
                            <option value="personalities">Personalities</option>
                            <option value="literature">Literature</option>
                            <option value="stories">Stories</option>
                            <option value="poems">Poems</option>
                            <option value="ghazal">Ghazals</option>
                        </Select>
                    </div>
                    <Button type="submit" outline gradientDuoTone="purpleToPink">
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Posts results:</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && posts.length === 0 && <p className="text-xl text-gray-500">No posts found.</p>}
                    {loading && <p className="text-xl text-gray-500">Loading...</p>}
                    {!loading && posts.map((post) => <PostCard key={post._id} post={post} />)}
                    {showMore && (
                        <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
