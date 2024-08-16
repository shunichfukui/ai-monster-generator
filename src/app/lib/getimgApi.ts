interface FetchMonsterImageParams {
  description: string;
  attribute: string;
}

export default async function fetchMonsterImage({
  description,
  attribute,
}: FetchMonsterImageParams): Promise<string> {
  const prompt = `A fictional creature inspired by the characteristics of ${description}, designed to resemble a ${attribute} type without directly copying any existing Pokémon. The overall design should incorporate elements that reflect the ${attribute} type, with colors and shapes that emphasize its nature. Ensure the creature appears whimsical and imaginative, with no direct resemblance to any existing Pokémon.`;

  try {
    const response = await fetch(
      'https://api.getimg.ai/v1/flux-schnell/text-to-image',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GETIMG_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          width: 1024,
          height: 1024,
          steps: 1,
          seed: 0,
          output_format: 'jpeg',
          response_format: 'url',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.url || '';
  } catch (error) {
    console.error('Error generating image:', error);
    return '';
  }
}
