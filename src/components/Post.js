import React from 'react';

const PostCard = ({ post }) => {
  // Define a altura do conteúdo com base na presença da imagem
  const contentHeight = post.image ? 'sm:h-[80px] h-[140px]' : 'h-[300px]';

  return (
    <div className="bg-slate-200 p-2.5 shadow-md rounded-sm flex flex-col justify-between h-[450px]">
      <div>
        <p><strong>{post.author}</strong></p>
        <p className="mb-1">{post.categoryName}</p>

        {/* Renderiza a imagem somente se houver uma URL de imagem */}
        {post.image && (
          <img
            className="w-full max-h-44 sm:max-h-60 object-cover"
            src={post.image}
            alt={post.title}
          />
        )}

        <h2 className="my-1">{post.title}</h2>

        {/* Div isolada com limite fixo e barra de rolagem */}
        <div className={`my-1 overflow-y-auto ${contentHeight}`}>
          <p>{post.content}</p>
        </div>
      </div>
      <div>
        <p>
          <small>Publicado em: {new Date(post.createdAt).toLocaleDateString()}</small>
        </p>
      </div>
    </div>
  );
};

export default PostCard;
