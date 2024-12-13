import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logoEducahub from '../assets/images/LOGO_EDUCAHUB_2.png';

const Toolbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para a tela de login após o logout
  };

  if (window.location.pathname === '/login') {
    return null; // Não renderiza a Toolbar na tela de login
  }

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
      <img className='h-10 bject-cover' src={logoEducahub} alt="EducaHub" />
      <div>
          {auth ? (
            <>
              <button
                className="mr-4 text-sm bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Sair
              </button>
              <Link
                to="/editar"
                className="text-sm bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                Editar Perfil
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
