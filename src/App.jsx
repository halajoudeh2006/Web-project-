import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { moviesData } from './moviesData';
import './App.css';

// Navigation
function Navbar() {
  return (
    <nav>
      <Link to="/">Home (Movies)</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

// Movie Card
function MovieCard(props) {
  return (
    <div className="movie-card">
      <h3>{props.movie.title}</h3>
      <p>Category: {props.movie.category}</p>
      <p>Rating: ⭐ {props.movie.rating}</p>
      <p>Year: {props.movie.year}</p>
    </div>
  );
}

// Movie List
function MovieList(props) {
  return (
    <div className="movies-grid">
      {props.movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

// Home Page
function MainPage() {
  const [movies] = useState(moviesData);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // Search
  let filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  if (sortBy === 'rating') {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else {
    filteredMovies.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="page-container">
      <h2>Movies List (Total: {filteredMovies.length})</h2>

      <div className="movie-controls">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Highest Rating</option>
        </select>
      </div>

      <MovieList movies={filteredMovies} />
    </div>
  );
}

// Login Page
function LoginPage() {
  return (
    <div className="page-container">
      <h2>Login Page</h2>

      <form onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Register Page
function RegisterPage() {
  return (
    <div className="page-container">
      <h2>Registration Page</h2>

      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="page-container">
      <h2>About Application</h2>
      <p>
        This application is a React project designed
        to display and manage movie records.
      </p>
    </div>
  );
}

// Main App
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
