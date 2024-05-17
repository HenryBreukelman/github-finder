
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const notFound = <p className='error'>{message}</p>

  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const usernameChange = event => {
    setUsername(event.target.value.trim());
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    if (username.trim()) {
      try {
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`https://api.github.com/users/${username}`, options);
        if (response.status === 200) {
          navigate(`/user/${username}`);
        } else {
          setMessage('User not found')
        }
      } catch (error) {
        setMessage('User not found')
        console.log(error.message);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, transition: { duration: 0.5 }}} 
      animate={{ opacity: 1,transition: { duration: 0.5 } }} 
      exit={{ opacity: 0,transition: { duration: 0.5 } }}
    >
      <section className='center search'>
        <div className='center'>
          <FaGithub className='logo'/>
          <form onSubmit={handleSearch} className='flex spacebetween'>
            <input
              type='text'
              placeholder='User Name'
              autoComplete='off'
              translate='no'
              onChange={usernameChange}
            />
            <button type="submit">
              <FaSearch className='search-button'/>
            </button>
          </form>
          <p className='welcome'>Welcome to Github finder</p>
          <p>{message.length > 0 && notFound }</p>
        </div>
      </section>
    </motion.div>
    
  );
};

export default Search;
