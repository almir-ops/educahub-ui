import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import Modal from './Modal';
import ModalPost from './ModalPost'; 
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false); 
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserIdFromToken = () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode(token);
          return decoded.id;
        }
        return null;
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
        return null;
      }
    };

    const fetchUserData = async () => {
      const userIdFromToken = getUserIdFromToken();
      if (userIdFromToken) {
        try {
          const response = await fetch(`${API_URL}/auth/profile/${userIdFromToken}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        console.error('Erro ao buscar dados do usuário: null');
      }
    };

    const fetchUserPosts = async () => {
      const userIdFromToken = getUserIdFromToken();
      if (userIdFromToken) {
        try {
          const response = await fetch(`${API_URL}/posts/user/${userIdFromToken}`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Erro ao buscar posts do usuário:', error);
        }
      } else {
        console.error('Erro ao buscar posts do usuário: null');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`); 
        const data = await response.json();        
        setCategories(data); 
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchUserData();
    fetchUserPosts();
    fetchCategories();
  }, [userId, navigate]);

  const handleEditUser = async (newData) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Erro ao editar usuário');
      }
      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir post');
      }
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Erro ao excluir post:', error);
    }
  };

  const handleSavePost = async (postId, postData) => {
    console.log('postData:', postData);
    
    try {
      const url = postId 
        ? `${API_URL}/posts/${postId}` 
        : `${API_URL}/posts`; 
      
      const method = postId ? 'PUT' : 'POST'; 
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao ${postId ? 'editar' : 'criar'} post`);
      }
  
      const savedPost = await response.json();
  
      // Atualize o estado local
      setPosts((prevPosts) => {
        if (postId) {
          return prevPosts.map((post) => (post.id === savedPost.id ? savedPost : post));
        } else {
          return [savedPost, ...prevPosts];
        }
      });
  
      closePostModal(); 
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const openEditPostModal = (post) => {
    setSelectedPost(post); 
    setIsPostModalVisible(true); 
  };

  const openCreatePostModal = () => {
    setSelectedPost(null); 
    setIsPostModalVisible(true); 
  };

  const closePostModal = () => {
    setIsPostModalVisible(false);
    setSelectedPost(null); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
          <h1 className="text-2xl font-bold mb-4">Perfil de {userData.name}</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Editar Usuário</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newData = { name: e.target.name.value, email: e.target.email.value };
                handleEditUser(newData);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  defaultValue={userData.name}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  defaultValue={userData.email}
                  required
                />
              </div>
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Atualizar Perfil
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Posts de {userData?.name}</h2>
        <button
          onClick={openCreatePostModal}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-6"
        >
          Criar Novo Post
        </button>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.content}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openEditPostModal(post)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>


      {categories && categories.length > 0 && userData && (
        <ModalPost
            isVisible={isPostModalVisible}
            onClose={closePostModal}
            post={selectedPost}
            onSubmit={handleSavePost}
            categories={categories}
            authorId={userData.id}  
            authorName={userData.name}
        />
        )}

    </div>
  );
};

export default Profile;
