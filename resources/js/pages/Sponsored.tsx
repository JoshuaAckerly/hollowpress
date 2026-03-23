import MainLayout from '@/layouts/main';
import { Head, Link } from '@inertiajs/react';
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
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 font-bold text-black shadow-lg">
                            ⭐ SPONSORED ARTIST ⭐
                        </div>
                    </div>

                    {!artist ? (
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-12 text-center">
                            <div className="mb-4 text-6xl">🎵</div>
                            <h2 className="mb-4 text-3xl font-bold text-white">No Sponsored Artist Yet</h2>
                            <p className="mb-6 text-lg text-gray-300">We're currently looking for amazing artists to sponsor. Check back soon!</p>
                            <Link
                                href="/artists"
                                className="inline-block rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:from-yellow-600 hover:to-orange-600"
                            >
                                Explore All Artists
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Artist Header */}
                            <div className="relative mb-8 overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 p-8">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-yellow-500/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-gradient-to-tr from-orange-500/20 to-transparent"></div>

                                <div className="relative z-10 flex items-start gap-6">
                                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-4xl font-bold text-black shadow-xl">
                                        {artist.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="mb-3 text-5xl font-bold text-white">{artist.name}</h1>
                                        <div className="mb-4 flex items-center gap-4">
                                            <span className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 font-semibold text-black">
                                                {artist.genre}
                                            </span>
                                            <span className="font-semibold text-yellow-400">✨ Featured Artist</span>
                                        </div>
                                        <p className="mb-6 text-lg leading-relaxed text-gray-300">{artist.bio}</p>
                                        {artist.website && (
                                            <a
                                                href={artist.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center rounded-lg bg-gradient-to-r from-gray-700 to-slate-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-gray-600 hover:to-slate-600"
                                            >
                                                🌐 Visit Official Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Why We Sponsor Section */}
                            <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8">
                                <h2 className="mb-4 text-center text-3xl font-bold text-white">Why We Sponsor {artist.name}</h2>
                                <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-300">
                                    At Hollow Press, we believe in supporting exceptional artists who push creative boundaries.
                                    {artist.name} represents the innovative spirit and artistic excellence we champion. Through our sponsorship, we
                                    help amplify their voice and bring their unique vision to a wider audience.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* Albums Section */}
                                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                                    <h2 className="mb-6 flex items-center text-2xl font-bold text-white">
                                        📀 Featured Albums ({artist.albums.length})
                                    </h2>

                                    {artist.albums.length > 0 ? (
                                        <div className="space-y-4">
                                            {artist.albums.map((album) => (
                                                <div
                                                    key={album.id}
                                                    className="rounded-lg border border-yellow-500/20 bg-gradient-to-r from-gray-700 to-slate-700 p-4 transition-all duration-300 hover:from-gray-600 hover:to-slate-600"
                                                >
                                                    <h3 className="mb-2 flex items-center text-lg font-semibold text-white">
                                                        <span className="mr-3 h-2 w-2 rounded-full bg-yellow-400"></span>
                                                        {album.title}
                                                    </h3>
                                                    <p className="mb-2 text-sm text-gray-300">{album.description}</p>
                                                    <p className="text-xs font-semibold text-yellow-400">
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
                                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
                                    <h2 className="mb-6 flex items-center text-2xl font-bold text-white">
                                        🎵 Upcoming Shows ({artist.events.length})
                                    </h2>

                                    {artist.events.length > 0 ? (
                                        <div className="space-y-4">
                                            {artist.events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="rounded-lg border border-orange-500/20 bg-gradient-to-r from-gray-700 to-slate-700 p-4 transition-all duration-300 hover:from-gray-600 hover:to-slate-600"
                                                >
                                                    <h3 className="mb-2 flex items-center text-lg font-semibold text-white">
                                                        <span className="mr-3 h-2 w-2 rounded-full bg-orange-400"></span>
                                                        {event.title}
                                                    </h3>
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

                            {/* Call to Action */}
                            <div className="mt-12 text-center">
                                <div className="rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-8 text-black">
                                    <h3 className="mb-4 text-2xl font-bold">Support Our Sponsored Artist</h3>
                                    <p className="mb-6 text-lg">
                                        Help us continue supporting amazing artists like {artist.name} by exploring their work and sharing their
                                        story.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <Link
                                            href="/artists"
                                            className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
                                        >
                                            Discover More Artists
                                        </Link>
                                        <Link
                                            href="/posts"
                                            className="rounded-lg bg-gray-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
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
