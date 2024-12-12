import React, { useState } from 'react';

const PostCard = ({ post }) => {
  // Estado para controlar a exibição do conteúdo completo
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  // Função para alternar entre mostrar e esconder o conteúdo completo
  const toggleContent = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  return (
    <div className="bg-slate-200 p-2.5 shadow-md rounded-sm">
      <p><strong>{post.author}</strong></p>
      <p className='mb-1'>{post.categoryName}</p>
      
      {/* Renderiza a imagem somente se houver uma URL de imagem */}
      {post.image && (
        <img className='w-full max-h-44 sm:max-h-60 object-cover' src={post.image} alt={post.title} />
      )}

      <h2 className='my-1'>{post.title}</h2>

      <p className='my-1'>
        {/* Exibe parte do conteúdo e a opção de "Ver mais" se o conteúdo for maior que 300 caracteres */}
        {isContentExpanded ? post.content : post.content.substring(0, 300)}
      </p>

      {post.content.length > 300 && (
        <button 
          className="text-blue-500 mt-1"
          onClick={toggleContent}
        >
          {isContentExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}

      <p><small>Publicado em: {new Date(post.createdAt).toLocaleDateString()}</small></p>
    </div>
  );
};

export default PostCard;
