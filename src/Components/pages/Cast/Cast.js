import { useParams } from 'react-router-dom';

export default function Cast() {
  const { movieId } = useParams();
  console.log(movieId);

  return (
    <>
      <h2>Cast</h2>
    </>
  );
}
