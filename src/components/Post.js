import React from 'react';

const PostCard = ({ post }) => {
  // Define a altura do conteúdo com base na presença da imagem

  return (
    <div className="bg-slate-200 p-2.5 shadow-md rounded-sm flex flex-col justify-between h-[400px] sm:h-[520px] 2xl:h-[390px]">
      <div>
        <h2 className="my-1"><strong>{post.title}</strong></h2>
        <p className="mb-1">{post.User.name} - {post.Category.name} </p>

        <div className={`my-1 overflow-y-auto`}>
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
