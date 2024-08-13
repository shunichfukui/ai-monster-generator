import axios from 'axios';

interface FetchPokemonImageParams {
  description: string;
  attribute: string;
}

export default async function fetchPokemonImage({
  description,
  attribute,
}: FetchPokemonImageParams): Promise<string> {
  const prompt = `A fictional creature inspired by the characteristics of ${description}, designed to resemble a ${attribute} type without directly copying any existing Pokémon. The overall design should incorporate elements that reflect the ${attribute} type, with colors and shapes that emphasize its nature. Ensure the creature appears whimsical and imaginative, with no direct resemblance to any existing Pokémon.`;

  try {
    const { data } = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        num_images: 1,
        size: '512x512',
        response_format: 'url',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    // 画像URLの取得
    return data?.data?.[0]?.url || '';
  } catch (error) {
    console.error('Error generating image:', error);
    return '';
  }
}
