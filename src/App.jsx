import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { moviesData } from './moviesData';

// 1. Shared Navigation Header
function Navbar() {
  return (
    <nav style={{ padding: '15px', background: '#333', color: '#fff', display: 'flex', gap: '20px' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home (Movies)</Link>
      <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
      <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
      <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
    </nav>
  );
}

// 2. Main Page with Filter and Sort working together
function MainPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // Filter and Sort implementation
  const filteredMovies = moviesData
    .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Movies List (Total: {filteredMovies.length})</h2>
      
      {/* Search and Sort Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '250px' }}
        />
        <select onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Highest Rating</option>
        </select>
      </div>

      {/* Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {filteredMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{movie.title}</h3>
            <p>Category: {movie.category}</p>
            <p>Rating: ⭐ {movie.rating}</p>
            <p>Year: {movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Login Page Placeholder
function LoginPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login Page</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div><input type="email" placeholder="Email" style={{ margin: '5px', padding: '8px' }} /></div>
        <div><input type="password" placeholder="Password" style={{ margin: '5px', padding: '8px' }} /></div>
        <button style={{ margin: '5px', padding: '8px 15px' }}>Login</button>
      </form>
    </div>
  );
}

// 4. Register Page Placeholder
function RegisterPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Registration Page</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div><input type="text" placeholder="Full Name" style={{ margin: '5px', padding: '8px' }} /></div>
        <div><input type="email" placeholder="Email" style={{ margin: '5px', padding: '8px' }} /></div>
        <div><input type="password" placeholder="Password" style={{ margin: '5px', padding: '8px' }} /></div>
        <button style={{ margin: '5px', padding: '8px 15px' }}>Register</button>
      </form>
    </div>
  );
}

// 5. About Page
function AboutPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>About Application</h2>
      <p>This application is a prototype React Single-Page Application designed to manage and display movie records, developed for the Web Applications Programming and Engineering course.</p>
    </div>
  );
}

// Root App Component
export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}