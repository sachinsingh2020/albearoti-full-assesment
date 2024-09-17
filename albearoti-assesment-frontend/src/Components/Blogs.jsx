import React, { useEffect, useState } from 'react';
import { Search, User, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { createBlog, getAllBlogs } from '../redux/actions/blog';
import toast from 'react-hot-toast';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '80%',
    },
};


Modal.setAppElement('#root');

const BlogCard = ({ blogImage, blogTitle, blogContent, createdAt }) => {
    const formatDate = (dateString) => {
        const currentDate = new Date();
        const blogDate = new Date(dateString);

        const diffTime = Math.abs(currentDate - blogDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return "Today";
        } else if (diffDays === 1) {
            return "1 day ago";
        } else if (diffDays === 2) {
            return "2 days ago";
        } else {
            return blogDate.toLocaleDateString();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={blogImage.url} alt={blogTitle} className="w-48 h-48 object-contain mx-auto" />
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{blogTitle}</h2>
                <p className="text-gray-600 text-sm mb-4">{blogContent}</p>
                <div className="text-gray-400 text-xs">
                    <span>{formatDate(createdAt)}</span>
                </div>
            </div>
        </div>
    );
};



const Blogs = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        blogTitle: "",
        blogContent: "",
        file: null,
    })

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData({
            ...formData,
            [actionMeta.name]: selectedOption ? selectedOption.value : '',
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            file: file,
        });
        setPreview(URL.createObjectURL(file));
    };

    const addNewBlogFunction = async (e) => {
        e.preventDefault();
        console.log({ formData });

        await dispatch(createBlog(formData));
        closeModal();
    }



    const [menuOpen, setMenuOpen] = useState(false);

    const dispatch = useDispatch();

    const handleAddNew = () => {
        openModal();
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const { message, error, blogs } = useSelector(state => state.blog);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [blogs])


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, message, error])

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="bg-white shadow-md p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <select className="border rounded-md px-2 py-1 text-sm">
                            <option>Afterglow</option>
                        </select>
                        <select className="border rounded-md px-2 py-1 text-sm hidden sm:block">
                            <option>Scenario: Default</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-8 pr-2 py-1 border rounded-md text-sm"
                            />
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <User className="text-gray-600 hidden sm:block" size={20} />
                            <span className="text-sm font-medium hidden sm:block">{user.firstName} {user.lastName}</span>
                        </div>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <div className="mt-4 sm:hidden">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-8 pr-2 py-1 border rounded-md text-sm mb-2"
                        />
                        <select className="w-full border rounded-md px-2 py-1 text-sm mb-2">
                            <option>Scenario: Default</option>
                        </select>
                        <div className="flex items-center space-x-2">
                            <User className="text-gray-600" size={20} />
                            <span className="text-sm font-medium">Robert Fox</span>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Blogs Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Blogs</h1>
                    <div className="space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <button
                            onClick={handleAddNew}
                            className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto mb-2 sm:mb-0">Add New</button>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto">Preview</button>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {blogs ? blogs?.map((blog, index) => (
                        <BlogCard key={index} {...blog} />
                    )) :
                        <div className="text-center text-gray-500">Loading........</div>
                    }
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add New Blog"
            >
                <h2 className="text-xl font-semibold mb-4">Add New Blog</h2>
                <button onClick={closeModal} className="text-red-500 hover:text-red-700 transition duration-200 mb-4">Close</button>
                <div>
                    <form onSubmit={addNewBlogFunction}
                        className="w-full max-w-7xl mx-auto p-8 bg-[#f2f2f2] rounded-2xl shadow-lg"
                    >
                        <input
                            type="text"
                            name="blogTitle"
                            value={formData.blogTitle}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded"
                            placeholder="Enter Blog Title"
                        />
                        <textarea
                            id='blogContent'
                            name="blogContent"
                            rows={10}
                            cols={50}
                            value={formData.blogContent}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded"
                            placeholder="Enter Blog Description"
                        />

                        <div className="mb-4">
                            <input
                                type="file"
                                name="file"
                                required
                                className="border rounded-full bg-white p-4 mb-4 w-full"
                                onChange={handleFileChange}
                            />
                            {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-full" />}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal >
        </div >
    );
};

export default Blogs;