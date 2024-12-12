import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api';
import Modal from './Modal';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      // Captura o código de status da resposta
      if (!response.ok) {
        const errorCode = response.status; // Código de erro (ex: 400, 401, 500, etc.)
        let errorMessage = 'Ocorreu um erro';
        try {
          // Tenta ler a mensagem do JSON, se possível
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          // Caso o conteúdo não seja JSON
          console.error('Erro ao processar resposta:', err);
          if(errorCode === 404) {
            errorMessage = `Erro ${errorCode}: Sem resposta do servidor`;
          }else{
            errorMessage = `Erro ${errorCode}: Erro inesperado`;
          }
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      login(data.token); // Salva o token no contexto
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.log(error); // Log do erro completo
      setErrorMessage(error.message); // Define a mensagem de erro
      setIsModalVisible(true); // Exibe o modal
    }
  };
  

  const closeModal = () => {
    setIsModalVisible(false); // Esconde o modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-8">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {/* Modal para exibir mensagens de erro */}
      <Modal
        isVisible={isModalVisible}
        message={errorMessage}
        onClose={closeModal}
      />
    </div>
  );
};

export default Login;
