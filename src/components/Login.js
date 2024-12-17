import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import logoEducahub from '../assets/images/LOGO_EDUCAHUB_2.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // Navegação agora fora da função handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorCode = response.status;
        let errorMessage = 'Ocorreu um erro';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          errorMessage = `Erro ${errorCode}: Erro inesperado`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      login(data.token); // Salva o token no contexto
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      setErrorMessage(error.message);
      setIsModalVisible(true); // Exibe o modal com a mensagem de erro
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Fecha o modal
  };

  const handleBack = () => {
    navigate('/'); // Voltar para a página inicial
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-8">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <img className="h-10 object-cover mx-auto" src={logoEducahub} alt="EducaHub" />
        <h2 className="text-xl text-center my-3">Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
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
          <div className="mb-4 flex flex-col">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={handleBack}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white mt-3"
            >
              Voltar
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
