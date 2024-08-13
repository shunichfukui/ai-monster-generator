'use client';

import { useState } from 'react';
import PokemonForm from './components/PokemonForm';
import styles from './page.module.css';

export default function Home() {
  const [pokemonData, setPokemonData] = useState({
    description: '',
    attribute: '',
  });

  const handleFormSubmit = (description: string, attribute: string) => {
    setPokemonData({ description, attribute });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>AI Poke Generator</h1>
        <PokemonForm onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
}
