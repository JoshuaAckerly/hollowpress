import MainLayout from '@/layouts/main';
import { Head, Link } from '@inertiajs/react';

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
            <Head title="Featured Artists">
                <meta
                    name="description"
                    content="Discover talented independent artists and musicians on Hollow Press. Explore their music, albums, and upcoming events."
                />
                <meta name="keywords" content="independent artists, musicians, music artists, artist showcase, indie music" />

                <meta property="og:title" content="Featured Artists - Hollow Press" />
                <meta property="og:description" content="Discover talented independent artists and musicians" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://hollowpress.graveyardjokes.com/artists" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Featured Artists" />
                <meta name="twitter:description" content="Discover talented independent artists" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                <div className="container py-16">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-white">Featured Artists</h1>
                        <p className="mx-auto max-w-2xl text-gray-300">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {artists.map((artist) => (
                            <Link
                                key={artist.id}
                                href={`/artists/${artist.id}`}
                                className="group block overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-xl transition-all duration-300 hover:border-gray-600 hover:shadow-2xl"
                            >
                                <div className="p-6">
                                    <div className="mb-4 flex items-center">
                                        <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600 text-xl font-bold text-white">
                                            {artist.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gray-300">
                                                {artist.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">{artist.genre}</p>
                                        </div>
                                    </div>

                                    <p className="mb-4 line-clamp-3 text-gray-300">{artist.bio}</p>

                                    <div className="mb-4 flex justify-between text-sm text-gray-400">
                                        <span>📀 {artist.albums.length} Albums</span>
                                        <span>🎵 {artist.events.length} Events</span>
                                    </div>

                                    <div className="font-semibold text-blue-400 group-hover:text-blue-300">View Profile →</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
