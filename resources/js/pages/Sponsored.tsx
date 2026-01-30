import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main';
import { getProjectUrl } from '../env';

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
  artist: Artist | null;
}

export default function Sponsored({ artist }: Props) {
  const description = artist ? `Discover ${artist.name} - ${artist.bio}` : 'Featured sponsored artist on Hollow Press';
  
  return (
    <MainLayout>
      <Head title={artist ? `${artist.name} - Sponsored Artist` : 'Sponsored Artist'}>
        <meta name="description" content={description} />
        <meta name="keywords" content="sponsored artist, featured artist, music artist, indie artist" />
        
        <meta property="og:title" content={artist ? `${artist.name} - Sponsored Artist` : 'Sponsored Artist'} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={getProjectUrl('hollowpress') + '/sponsored'} />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={artist ? artist.name : 'Sponsored Artist'} />
        <meta name="twitter:description" content={description} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="container py-16">
          {/* Sponsored Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full shadow-lg">
              ⭐ SPONSORED ARTIST ⭐
            </div>
          </div>

          {!artist ? (
            <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700 text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-3xl font-bold text-white mb-4">No Sponsored Artist Yet</h2>
              <p className="text-gray-300 text-lg mb-6">
                We're currently looking for amazing artists to sponsor. Check back soon!
              </p>
              <Link
                href="/artists"
                className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
              >
                Explore All Artists
              </Link>
            </div>
          ) : (
            <>
              {/* Artist Header */}
              <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-4xl shadow-xl">
                {artist.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-white mb-3">{artist.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-full">
                    {artist.genre}
                  </span>
                  <span className="text-yellow-400 font-semibold">✨ Featured Artist</span>
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{artist.bio}</p>
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-slate-700 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
                  >
                    🌐 Visit Official Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Why We Sponsor Section */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 mb-8 border border-yellow-500/20">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Why We Sponsor {artist.name}</h2>
            <p className="text-gray-300 text-lg text-center max-w-3xl mx-auto leading-relaxed">
              At Hollow Press, we believe in supporting exceptional artists who push creative boundaries. 
              {artist.name} represents the innovative spirit and artistic excellence we champion. 
              Through our sponsorship, we help amplify their voice and bring their unique vision to a wider audience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Albums Section */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                📀 Featured Albums ({artist.albums.length})
              </h2>
              
              {artist.albums.length > 0 ? (
                <div className="space-y-4">
                  {artist.albums.map((album) => (
                    <div key={album.id} className="bg-gradient-to-r from-gray-700 to-slate-700 rounded-lg p-4 hover:from-gray-600 hover:to-slate-600 transition-all duration-300 border border-yellow-500/20">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        {album.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2">{album.description}</p>
                      <p className="text-yellow-400 text-xs font-semibold">
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
                🎵 Upcoming Shows ({artist.events.length})
              </h2>
              
              {artist.events.length > 0 ? (
                <div className="space-y-4">
                  {artist.events.map((event) => (
                    <div key={event.id} className="bg-gradient-to-r from-gray-700 to-slate-700 rounded-lg p-4 hover:from-gray-600 hover:to-slate-600 transition-all duration-300 border border-orange-500/20">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                        {event.title}
                      </h3>
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

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-bold mb-4">Support Our Sponsored Artist</h3>
              <p className="text-lg mb-6">
                Help us continue supporting amazing artists like {artist.name} by exploring their work and sharing their story.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/artists"
                  className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Discover More Artists
                </Link>
                <Link
                  href="/posts"
                  className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Read Artist Stories
                </Link>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}