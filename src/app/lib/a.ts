import axios from 'axios';

type te = {
  description: string;
  attribute: string;
};

export default async function fetchMonsterImage({
  description,
  attribute,
}: te) {
  const options = {
    method: 'POST',
    url: 'https://api.getimg.ai/v1/flux-schnell/text-to-image',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    data: { width: 1024, height: 1024, steps: 1, response_format: 'url' },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
