import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

interface Artist {
  id: number;
  name: string;
  bio: string;
  genre: string;
  website: string;
  albums: Album[];
  events: Event[];
}

interface Album {
  id: number;
  title: string;
  description: string;
  release_date: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  venue: string;
  location: string;
  price: number;
}

interface Props {
  artist: Artist;
}

export default function Show({ artist }: Props) {
  const description = `${artist.bio} - ${artist.genre} artist. Explore albums and upcoming events.`;
  
  return (
    <MainLayout>
      <Head title={artist.name}>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${artist.name}, ${artist.genre}, artist, musician, albums, events`} />
        
        <meta property="og:title" content={artist.name} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://hollowpress.graveyardjokes.com/artists/${artist.id}`} />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={artist.name} />
        <meta name="twitter:description" content={description} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="container py-16">
          {/* Back Button */}
          <Link
            href="/artists"
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            ← Back to Artists
          </Link>

          {/* Artist Header */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {artist.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{artist.name}</h1>
                <p className="text-gray-400 text-lg mb-4">{artist.genre}</p>
                <p className="text-gray-300 mb-4">{artist.bio}</p>
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    🌐 Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Albums Section */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                📀 Albums ({artist.albums.length})
              </h2>
              
              {artist.albums.length > 0 ? (
                <div className="space-y-4">
                  {artist.albums.map((album) => (
                    <div key={album.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                      <h3 className="text-lg font-semibold text-white mb-2">{album.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{album.description}</p>
                      <p className="text-gray-400 text-xs">
                        Released: {new Date(album.release_date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No albums available</p>
              )}
            </div>

            {/* Events Section */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                🎵 Upcoming Events ({artist.events.length})
              </h2>
              
              {artist.events.length > 0 ? (
                <div className="space-y-4">
                  {artist.events.map((event) => (
                    <div key={event.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                      <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                      <div className="text-gray-400 text-xs space-y-1">
                        <p>📅 {new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString()}</p>
                        <p>📍 {event.venue}, {event.location}</p>
                        <p className="text-green-400 font-semibold">💰 ${event.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}