import React from 'react';
import Modal from 'react-modal';

function FilterModal({ show, onClose, onCategorySelect }) {
  const categories = ['Matemática', 'Física', 'Química', 'Biologia']; // Exemplo de categorias

  return (
    <Modal isOpen={show} onRequestClose={onClose} contentLabel="Filtrar por Categoria">
      <h2>Selecione a Categoria</h2>
      <div>
        {categories.map((category, index) => (
          <button key={index} onClick={() => onCategorySelect(category)}>
            {category}
          </button>
        ))}
      </div>
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
}

export default FilterModal;
