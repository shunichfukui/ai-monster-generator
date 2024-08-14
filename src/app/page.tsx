'use client';

import { useState } from 'react';
import PokeForm from './components/PokeForm';
import styles from './page.module.css';
import fetchPokemonImage from './lib/api';
import Image from 'next/image';
import Loading from 'react-loading';

export default function Home() {
  const [pokemonImage, setPokemonImage] = useState<string>('');
  const [formData, setFormData] = useState({
    description: '',
    attribute: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (description: string, attribute: string) => {
    setFormData({ description, attribute });
    setIsLoading(true);
    const imageUrl: string = await fetchPokemonImage({
      description,
      attribute,
    });
    setPokemonImage(imageUrl);
    setIsLoading(false);
  };

  const handleRegenerate = async () => {
    const { description, attribute } = formData;
    setIsLoading(true);
    const imageUrl = await fetchPokemonImage({ description, attribute });
    setPokemonImage(imageUrl);
    setIsLoading(false);
  };

  const handleXShare = () => {
    const shareUrl = encodeURIComponent(pokemonImage);
    const twitterText = encodeURIComponent(
      `ついに発見！${formData.description}、${formData.attribute}タイプの新しいポケモン！？😂 \n #ポケモンライクな画像生成 \n`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${shareUrl}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>AI Pokémon Generator</h1>
        <PokeForm onSubmit={handleFormSubmit} />
        <div className={styles.imageContainer}>
          {isLoading ? (
            <>
              <Loading
                type="spinningBubbles"
                color="#0070f3"
                height={100}
                width={100}
              />
              <p className={styles.loadingText}>画像を生成中です…</p>
            </>
          ) : (
            pokemonImage && (
              <>
                <Image
                  src={pokemonImage}
                  alt="Generated Pokémon"
                  className={styles.pokemonImage}
                  width={300}
                  height={300}
                />
                <button
                  className={styles.regenerateButton}
                  onClick={handleRegenerate}
                >
                  再生成
                </button>
                <button className={styles.shareButton} onClick={handleXShare}>
                  X（旧Twitter）で自慢する
                </button>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}
