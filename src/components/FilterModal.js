import React, { useState } from 'react';
import Modal from 'react-modal';

function FilterModal({ show, onClose, onCategorySelect }) {
  const categories = ['Matemática', 'Física', 'Química', 'Biologia']; // Exemplo de categorias
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        // Remove a categoria se ela já estiver selecionada
        return prevSelectedCategories.filter((item) => item !== category);
      } else {
        // Adiciona a categoria se não estiver selecionada
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handleApplyFilter = () => {
    onCategorySelect(selectedCategories); // Envia as categorias selecionadas
    onClose(); // Fecha o modal
  };

  return (
    <Modal isOpen={show} onRequestClose={onClose} contentLabel="Filtrar por Categoria">
    <div className='flex flex-col justify-between h-full'>
      <div>
        <h2>Selecione as matérias que deseja filtrar</h2>
        <div className="flex flex-col mt-2">
            {categories.map((category, index) => (
            <label key={index} className="flex items-center bg-slate-100 mb-3 rounded-sm px-2 shadow-md">
                <input
                type="checkbox"
                className='mr-2'
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
                />
                {category}
            </label>
            ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onClose} className="mr-2">
          Fechar
        </button>
        <button onClick={handleApplyFilter}>Aplicar Filtro</button>
      </div>
    </div>
    </Modal>
  );
}

export default FilterModal;
