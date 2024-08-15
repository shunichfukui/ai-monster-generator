import { useState } from 'react';
import { MONSTER_ATTRIBUTES } from '../constants';
import styles from './MonsterForm.module.css';

interface MonsterFormProps {
  onSubmit: (description: string, attribute: string) => void;
  isRegenerated: boolean;
}

export default function MonsterForm({
  onSubmit,
  isRegenerated,
}: MonsterFormProps) {
  const [description, setDescription] = useState('');
  const [attribute, setAttribute] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description, attribute);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          モンスターの特徴（英語で入力）
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="例: Fierce, Cute, Majestic"
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="attribute" className={styles.label}>
          モンスターの属性を選択
        </label>
        <select
          id="attribute"
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">選択してください</option>
          {MONSTER_ATTRIBUTES.map((attr) => (
            <option key={attr.en} value={attr.en}>
              {attr.ja}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.button}>
        {isRegenerated ? '再度画像を生成する' : 'モンスター画像の生成'}
      </button>
    </form>
  );
}
