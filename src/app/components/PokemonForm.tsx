import { useState } from 'react';
import { POKEMON_ATTRIBUTES } from '../constants';
import styles from './PokemonForm.module.css';

interface PokemonFormProps {
  onSubmit: (description: string, attribute: string) => void;
}

export default function PokemonForm({ onSubmit }: PokemonFormProps) {
  const [description, setDescription] = useState('');
  const [attribute, setAttribute] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description, attribute);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="ポケモンの特徴を入力"
        required
        className={styles.input}
      />
      <select
        value={attribute}
        onChange={(e) => setAttribute(e.target.value)}
        required
        className={styles.select}
      >
        <option value="">選択してください</option>
        {POKEMON_ATTRIBUTES.map((attr) => (
          <option key={attr} value={attr}>
            {attr}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.button}>
        生成
      </button>
    </form>
  );
}
