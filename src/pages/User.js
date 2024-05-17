
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const { username } = useParams();
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const options = { headers: { Authorization: `Bearer ${token}` } };

        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
        setUser(userResponse.data);

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [username, token]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section>
        <Link to='/' className='home link'>Home</Link>
        <div className='user-info center'>
          <img alt='User avatar' src={user.avatar_url}/>
          <h1>{user.name}</h1>
          <div className="flex gap-20">
            <div className='stats center'>
              <p className='data'>{user.public_repos}</p> 
              <p>Repositories</p>
            </div>
            <div className='stats center'>
              <p className='data'>{user.followers}</p> 
              <p>Followers</p>
            </div>
            <div className='stats center'>
              <p className='data'>{user.following}</p> 
              <p>Following</p>
            </div>
          </div>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            <input type="button" value="Go to Github" className='github-link'/>
          </a>
        </div>
      </section>
      <section className='repos'>
        <h2>My repositories</h2>
        {repos ? (
          repos.length > 0 ? (
            repos.map(repo => (
              <div className='repo' key={repo.id}>
                <div className='flex spacebetween'>
                  <a 
                    href={repo.html_url} 
                    target="_blank"
                    rel="noreferrer" 
                    className='link repo-link'
                  >
                    <h3>{repo.name}</h3>
                  </a>
                  <p className='date center'>{formatDate(repo.updated_at)}</p>
                </div>
                {repo.description !== null && <p>{repo.description}</p>}
              </div>
            ))
          ) : (
          <div className='repo'>
            <h3>No repositories</h3>
          </div>)
          ) : (
          <p>User data not found</p>
        )
        }
      </section>
    </motion.div>

  );
};

export default User;
