import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ApiService from '../services/api.service';

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = async (formData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await ApiService.signup(formData);
      toast.success('Account created successfully!');
      // You might want to automatically log the user in here
      // or redirect them to the login page
      return response;
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
      if (error.errors) {
        setErrors(error.errors);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await ApiService.login(credentials);
      toast.success('Logged in successfully!');
      // Store the token
      localStorage.setItem('authToken', response.token);
      // Redirect to dashboard
      navigate('/dashboard');
      return response;
    } catch (error) {
      toast.error(error.message || 'Failed to log in');
      if (error.errors) {
        setErrors(error.errors);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    handleSignup,
    handleLogin
  };
};

export default useAuth;
