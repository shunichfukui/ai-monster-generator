'use client';

import { useState } from 'react';
import PokemonForm from './components/PokemonForm';
import styles from './page.module.css';
import fetchPokemonImage from './lib/api';
import Image from 'next/image';

export default function Home() {
  const [pokemonImage, setPokemonImage] = useState<string>('');
  const [formData, setFormData] = useState({
    description: '',
    attribute: '',
  });

  const handleFormSubmit = async (description: string, attribute: string) => {
    setFormData({ description, attribute });
    const imageUrl: string = await fetchPokemonImage({
      description,
      attribute,
    });
    setPokemonImage(imageUrl);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>AI Pokémon Generator</h1>
        <PokemonForm onSubmit={handleFormSubmit} />
        {pokemonImage && (
          <div className={styles.imageContainer}>
            <Image
              src={pokemonImage}
              alt="Generated Pokémon"
              className={styles.pokemonImage}
              width={300}
              height={300}
            />
          </div>
        )}
      </main>
    </div>
  );
}
