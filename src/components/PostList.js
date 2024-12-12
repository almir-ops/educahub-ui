// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import Post from './Post';
import FilterModal from './FilterModal';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchedPosts = [
      { 
        title: 'Post 1', 
        content: 'Conteúdo do Post 1', 
        author: 'Autor 1', 
        image: 'https://via.placeholder.com/150', 
        categoryID: 1, 
        userID: 1, 
        createdAt: '2024-12-01T00:00:00Z', 
        updatedAt: '2024-12-01T01:00:00Z',
        categoryName: 'Matemática'
      },
      { 
        title: 'Post 2', 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac tincidunt ligula, sed hendrerit dui. Fusce tristique, libero at vestibulum dapibus, sapien dui cursus eros, vitae sollicitudin ante lectus ac ligula. Sed feugiat nisi vitae auctor vehicula. Vivamus id erat sit amet odio mollis malesuada. Integer vitae lectus in sapien scelerisque laoreet eu non velit. Cras mollis risus vel augue facilisis, eget gravida erat gravida.', 
        author: 'Autor 2', 
        image: '', 
        categoryID: 2, 
        userID: 2, 
        createdAt: '2024-12-02T00:00:00Z', 
        updatedAt: '2024-12-02T01:00:00Z',
        categoryName: 'Física'
      },
    ];

    setPosts(fetchedPosts);
    setFilteredPosts(fetchedPosts);
  }, []);

  const handleFilter = () => {
    let filtered = posts;

    if (filterCategory) {
      filtered = filtered.filter(post => post.categoryName === filterCategory);
    }

    setFilteredPosts(filtered);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
    setShowModal(false);
    handleFilter(); 
  };

  return (
    <div className="p-6">
      <div className="filters mb-4">
        <input
          type="text"
          placeholder="Filtrar por título"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => {
            const titleFilter = e.target.value.toLowerCase();
            const filtered = posts.filter(post => 
              post.title.toLowerCase().includes(titleFilter)
            );
            setFilteredPosts(filtered);
          }}
        />
        <button 
          onClick={() => setShowModal(true)} 
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filtrar por categoria
        </button>
      </div>

      <div className="post-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map(post => (
          <Post key={post.title} post={post} />
        ))}
      </div>

      <FilterModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onCategorySelect={handleFilterCategory}
      />
    </div>
  );
}

export default PostList;
