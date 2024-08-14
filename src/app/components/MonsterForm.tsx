import { useState } from 'react';
import { MONSTER_ATTRIBUTES } from '../constants';
import styles from './MonsterForm.module.css';

interface MonsterFormProps {
  onSubmit: (description: string, attribute: string) => void;
}

export default function MonsterForm({ onSubmit }: MonsterFormProps) {
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
        placeholder="生成するポケモンの特徴を入力"
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
        {MONSTER_ATTRIBUTES.map((attr) => (
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
