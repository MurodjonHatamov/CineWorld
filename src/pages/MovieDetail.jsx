import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBasicMovieDetail } from '../pages/server/api';
import { FaStar, FaPlay } from 'react-icons/fa';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const IMAGE_SMALL = 'https://image.tmdb.org/t/p/w185';

function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBasicMovieDetail(id)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!data) {
    return <div className="text-white p-10">Movie not found</div>;
  }

  const { detail, cast, trailer, similar } = data;

  return (
    <div className="text-white">
      {/* HERO */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGE_BASE}${detail.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-6xl p-10">
          <h1 className="text-4xl font-bold">{detail.title}</h1>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-300">
            <span className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              {detail.vote_average.toFixed(1)}
            </span>

            <span>{detail.release_date?.slice(0, 4)}</span>

            <span>{detail.runtime} min</span>

            {detail.adult && (
              <span className="px-2 py-0.5 bg-red-600 rounded text-xs">
                18+
              </span>
            )}
          </div>

          <p className="max-w-xl mt-4 text-gray-300">
            {detail.overview}
          </p>

          {trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-6 flex items-center gap-2 bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <FaPlay /> Watch Trailer
            </button>
          )}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[90%] max-w-3xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>
            <iframe
              className="w-full h-[400px] rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}

      {/* CAST */}
      <section className="p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {cast.map(actor => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_SMALL}${actor.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'
                }
                alt={actor.name}
                className="rounded-lg mb-2"
              />
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-400">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SIMILAR */}
      <section className="p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {similar.map(movie => (
            <div key={movie.id}>
              <img
                src={`${IMAGE_SMALL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"
              />
              <p className="text-sm mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;
