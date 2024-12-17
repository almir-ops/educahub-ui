// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import Post from './Post';
import FilterModal from './FilterModal';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/categories`)  
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
      });

    
    fetch(`${API_URL}/posts`)  
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar posts:', error);
      });
  }, []);

  const handleFilter = () => {
    let filtered = posts;

    if (filterCategory) {
      filtered = filtered.filter(post => post.categoryName === filterCategory);
    }

    if (filterTitle) {
      filtered = filtered.filter(post => post.title.toLowerCase().includes(filterTitle.toLowerCase()));
    }

    setFilteredPosts(filtered);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
    setShowModal(false);
    handleFilter();
  };

  const handleTitleChange = (e) => {
    setFilterTitle(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div className="py-6">
      <div className="flex mb-4 mx-auto w-[80%]">
        <input
          type="text"
          placeholder="Filtrar por título da postagem"
          className="w-full p-2 border border-gray-300 rounded"
          value={filterTitle}
          onChange={handleTitleChange}
          onKeyPress={handleKeyPress}  
        />
        <button 
          onClick={handleFilter}  
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pesquisar
        </button>
        <button 
          onClick={() => setShowModal(true)} 
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
          />
        </svg>
    </button>
      </div>

      <div className="post-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-[80%]">
        {filteredPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      <FilterModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onCategorySelect={handleFilterCategory}
        categories={categories}  
        ariaHideApp={false}

      />
    </div>
  );
}

export default PostList;
