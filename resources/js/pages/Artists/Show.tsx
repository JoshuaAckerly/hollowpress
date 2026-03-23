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
                    <Link href="/artists" className="mb-8 inline-flex items-center text-gray-300 transition-colors hover:text-white">
                        ← Back to Artists
                    </Link>

                    {/* Artist Header */}
                    <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-800 p-8">
                        <div className="flex items-start gap-6">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600 text-3xl font-bold text-white">
                                {artist.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h1 className="mb-2 text-4xl font-bold text-white">{artist.name}</h1>
                                <p className="mb-4 text-lg text-gray-400">{artist.genre}</p>
                                <p className="mb-4 text-gray-300">{artist.bio}</p>
                                {artist.website && (
                                    <a
                                        href={artist.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 transition-colors hover:text-blue-300"
                                    >
                                        🌐 Visit Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Albums Section */}
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-white">📀 Albums ({artist.albums.length})</h2>

                            {artist.albums.length > 0 ? (
                                <div className="space-y-4">
                                    {artist.albums.map((album) => (
                                        <div key={album.id} className="rounded-lg bg-gray-700 p-4 transition-colors hover:bg-gray-600">
                                            <h3 className="mb-2 text-lg font-semibold text-white">{album.title}</h3>
                                            <p className="mb-2 text-sm text-gray-300">{album.description}</p>
                                            <p className="text-xs text-gray-400">Released: {new Date(album.release_date).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">No albums available</p>
                            )}
                        </div>

                        {/* Events Section */}
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                            <h2 className="mb-6 flex items-center text-2xl font-bold text-white">🎵 Upcoming Events ({artist.events.length})</h2>

                            {artist.events.length > 0 ? (
                                <div className="space-y-4">
                                    {artist.events.map((event) => (
                                        <div key={event.id} className="rounded-lg bg-gray-700 p-4 transition-colors hover:bg-gray-600">
                                            <h3 className="mb-2 text-lg font-semibold text-white">{event.title}</h3>
                                            <p className="mb-2 text-sm text-gray-300">{event.description}</p>
                                            <div className="space-y-1 text-xs text-gray-400">
                                                <p>
                                                    📅 {new Date(event.event_date).toLocaleDateString()} at{' '}
                                                    {new Date(event.event_date).toLocaleTimeString()}
                                                </p>
                                                <p>
                                                    📍 {event.venue}, {event.location}
                                                </p>
                                                <p className="font-semibold text-green-400">💰 ${event.price}</p>
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
