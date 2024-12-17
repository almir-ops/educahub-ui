import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

function FilterModal({ show, onClose, onCategorySelect, categories }) {
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
    <Modal 
      isOpen={show} 
      onRequestClose={onClose} 
      contentLabel="Filtrar por Categoria"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex flex-col justify-between h-full sm:h-full max-h-[500px] bg-white rounded-md shadow-lg max-w-[400px] w-full p-4">
        <div>
          <h2 className="text-lg font-semibold">Selecione as categorias que deseja filtrar</h2>
          <div className="flex flex-col mt-2">
            {categories.map((category, index) => (
              <label 
                key={index} 
                className="flex items-center bg-slate-100 mb-3 rounded-sm px-2 py-2 shadow-md"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCheckboxChange(category.name)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="mr-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            Fechar
          </button>
          <button 
            onClick={handleApplyFilter} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Aplicar Filtro
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
