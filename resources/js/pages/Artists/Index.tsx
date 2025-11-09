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
  release_date: string;
}

interface Event {
  id: number;
  title: string;
  event_date: string;
  venue: string;
}

interface Props {
  artists: Artist[];
}

export default function Index({ artists }: Props) {
  return (
    <MainLayout>
      <Head title="Artists" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Featured Artists</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group block bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      {artist.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{artist.genre}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {artist.bio}
                  </p>
                  
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>📀 {artist.albums.length} Albums</span>
                    <span>🎵 {artist.events.length} Events</span>
                  </div>
                  
                  <div className="text-blue-400 group-hover:text-blue-300 font-semibold">
                    View Profile →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}