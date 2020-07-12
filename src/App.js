import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const repo = { 
      title: "desafio-conceitos-nodejs", 
     url: "https://github.com/pedroddomingues/desafio-conceitos-nodejs", 
     techs : "Node"
    }

    const response = await api.post("repositories", repo )

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const repoI = repositories.findIndex(repo => repo.id === id)

    await api.delete(`repositories/${id}`)

    repositories.splice(repoI,1)

    setRepositories([...repositories])
  }

  async function handleLikeRepository(id) {
    const repoI = repositories.findIndex(repo => repo.id === id)

    const response = await api.post(`repositories/${id}/like`)

    repositories[repoI] = {...repositories[repoI], likes: response.data.likes}

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          <div>
        <span>{repo.likes} s2</span>
          <button onClick={() => handleLikeRepository(repo.id)}>
            Like
          </button>
          </div>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
