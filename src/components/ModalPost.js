import React, { useState, useEffect } from 'react';

const ModalPost = ({ isVisible, onClose, post, categories, onSubmit, authorId, authorName }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [categoryId, setCategoryId] = useState(post ? post.categoryId : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategoryId(post.categoryId);
    } else {
      setTitle('');
      setContent('');
      setCategoryId('');
    }
  }, [post]);

  const validateForm = () => {
    if (!title.trim()) return 'O título é obrigatório e não pode ser vazio.';
    if (!categoryId) return 'Selecione uma categoria.';
    if (content.length > 500) return 'O conteúdo não pode ter mais de 500 caracteres.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      categoryId,
      author: authorName,
      userId: authorId,
    };

    console.log('postData:', postData);

    onSubmit(post ? post.id : null, postData);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 px-4 z-50"
      aria-hidden={!isVisible}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 id="modal-title" className="text-xl font-semibold mb-4">
          {post ? 'Editar Post' : 'Criar Post'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-required="true"
              placeholder="Digite o título do post"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              aria-required="true"
            >
              <option value="">Selecione uma categoria</option>
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>Carregando categorias...</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Conteúdo
            </label>
            <textarea
              id="content"
              name="content"
              className="w-full p-2 border border-gray-300 rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              aria-required="true"
              maxLength="500"
              placeholder="Escreva o conteúdo do post (máx. 500 caracteres)"
            />
            <small className="text-gray-500">{content.length}/500 caracteres</small>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {post ? 'Atualizar Post' : 'Criar Post'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalPost;
