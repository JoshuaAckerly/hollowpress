<?php

namespace Database\Seeders;

use App\Models\CaseStudy;
use Illuminate\Database\Seeder;

class CaseStudySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $caseStudies = [
            [
                'title' => 'Dark Echoes Music Platform',
                'slug' => 'dark-echoes-music-platform',
                'description' => 'A comprehensive music streaming platform designed specifically for underground and alternative artists. The platform needed to handle high-quality audio streaming, artist profiles, and a unique dark aesthetic that resonated with the target audience.',
                'challenge' => 'The client wanted to create a niche music platform that would stand out in a saturated market. The main challenges included:\n\n• Building a robust audio streaming infrastructure that could handle high-quality FLAC and WAV files\n• Creating an intuitive discovery system for underground music\n• Implementing a unique dark UI that was both aesthetically pleasing and highly functional\n• Ensuring fast load times despite heavy media content\n• Building a community feature that fostered genuine artist-fan connections',
                'solution' => 'We developed a full-stack solution using Laravel for the backend and React for the frontend:\n\n• Implemented a custom audio streaming service with adaptive bitrate streaming\n• Built an AI-powered recommendation engine based on listening patterns and genre similarities\n• Designed a unique dark-themed UI with smooth animations and intuitive navigation\n• Utilized CDN distribution for media files to ensure global performance\n• Created an integrated social platform with comments, follows, and direct messaging\n• Implemented real-time notifications using WebSockets',
                'results' => 'The platform launched successfully and achieved impressive metrics:\n\n• 10,000+ registered artists in the first 3 months\n• 50,000+ active monthly users\n• Average session duration of 45 minutes\n• 95% positive user feedback on the interface design\n• Featured in multiple alternative music publications\n• Successfully processed over 1 million song streams in the first quarter',
                'client_name' => 'Dark Echoes Inc.',
                'project_type' => 'Web Development',
                'project_date' => '2024-08-15',
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'Redis', 'PostgreSQL', 'WebSockets', 'AWS S3', 'CloudFront'],
                'project_url' => null,
                'is_featured' => true,
            ],
            [
                'title' => 'Shadowcraft E-commerce Platform',
                'slug' => 'shadowcraft-ecommerce-platform',
                'description' => 'An e-commerce platform specializing in handmade gothic and alternative fashion. The project required a unique shopping experience that matched the brand\'s aesthetic while maintaining modern e-commerce functionality.',
                'challenge' => 'Creating an e-commerce platform that balanced dark aesthetics with usability:\n\n• Designing a shopping experience that felt unique but remained intuitive\n• Managing complex product variations (sizes, colors, custom options)\n• Implementing a custom order management system for handmade items\n• Ensuring mobile responsiveness without compromising the design vision\n• Integrating multiple payment gateways for international customers',
                'solution' => 'Developed a custom e-commerce solution with:\n\n• Custom-built product configurator for personalized items\n• Advanced inventory management system with real-time updates\n• Integrated Stripe and PayPal for seamless payments\n• Mobile-first responsive design with touch-optimized interactions\n• Automated email marketing system for abandoned carts and promotions\n• Admin dashboard for managing orders, inventory, and analytics',
                'results' => 'The platform exceeded client expectations:\n\n• 300% increase in online sales within 6 months\n• Average order value increased by 45%\n• Cart abandonment rate reduced by 35%\n• Mobile conversion rate improved by 60%\n• 4.8/5 average customer satisfaction rating\n• Successfully scaled to handle Black Friday traffic (10x normal load)',
                'client_name' => 'Shadowcraft Designs',
                'project_type' => 'E-commerce',
                'project_date' => '2024-05-20',
                'technologies' => ['Laravel', 'Vue.js', 'Tailwind CSS', 'Stripe API', 'MySQL', 'Redis', 'Docker'],
                'project_url' => null,
                'is_featured' => true,
            ],
            [
                'title' => 'Midnight Gallery Virtual Exhibition',
                'slug' => 'midnight-gallery-virtual-exhibition',
                'description' => 'A virtual art gallery platform that allows artists to showcase their work in immersive 3D gallery spaces. The project aimed to recreate the experience of visiting a physical gallery while adding digital enhancements.',
                'challenge' => 'The project presented unique technical and design challenges:\n\n• Creating a 3D gallery experience that runs smoothly in web browsers\n• Ensuring artwork is displayed with accurate colors and high resolution\n• Building an intuitive navigation system for 3D spaces\n• Supporting VR headsets for an enhanced experience\n• Managing high-resolution images without sacrificing performance',
                'solution' => 'We built an innovative platform using cutting-edge web technologies:\n\n• Implemented Three.js for 3D rendering with optimized performance\n• Created a custom image loading system with progressive enhancement\n• Designed multiple gallery templates with different aesthetics\n• Added VR support using WebXR API\n• Built a CMS for artists to curate their own exhibitions\n• Implemented social features for virtual gallery visits with friends',
                'results' => 'The platform became a showcase for digital art exhibitions:\n\n• Hosted 50+ virtual exhibitions in the first year\n• 25,000+ unique visitors\n• Average visit duration of 18 minutes\n• 15% of users accessed with VR headsets\n• Featured in digital art and technology publications\n• Generated significant interest from traditional art galleries',
                'client_name' => 'Midnight Gallery Collective',
                'project_type' => 'Full Stack',
                'project_date' => '2024-10-10',
                'technologies' => ['React', 'Three.js', 'WebXR', 'Node.js', 'MongoDB', 'AWS', 'WebGL'],
                'project_url' => null,
                'is_featured' => false,
            ],
            [
                'title' => 'Nocturnal Events Management System',
                'slug' => 'nocturnal-events-management-system',
                'description' => 'A comprehensive event management platform for underground music and art events. The system handles ticketing, artist management, venue coordination, and attendee engagement.',
                'challenge' => 'Building a robust event management system with:\n\n• Complex ticketing system with multiple tiers and early bird pricing\n• Artist lineup management with schedule conflicts detection\n• Real-time capacity tracking and waitlist management\n• QR code-based entry system for events\n• Integration with multiple payment processors',
                'solution' => 'Developed an all-in-one event management solution:\n\n• Built a flexible ticketing system with dynamic pricing\n• Created an artist scheduling tool with conflict detection\n• Implemented QR code generation and validation system\n• Added real-time analytics dashboard for event organizers\n• Integrated with Stripe for payment processing\n• Built mobile apps for on-site ticket scanning',
                'results' => 'The platform streamlined event management:\n\n• Managed 100+ events in the first year\n• Processed 50,000+ ticket sales\n• Reduced check-in time by 70%\n• 99.9% uptime during peak ticket sales\n• Zero fraudulent ticket incidents\n• Saved organizers an average of 15 hours per event',
                'client_name' => 'Nocturnal Events Co.',
                'project_type' => 'Full Stack',
                'project_date' => '2024-03-15',
                'technologies' => ['Laravel', 'React Native', 'PostgreSQL', 'Stripe', 'QR Code API', 'Redis', 'Docker'],
                'project_url' => null,
                'is_featured' => false,
            ],
            [
                'title' => 'Raven\'s Nest Artist Portfolio Builder',
                'slug' => 'ravens-nest-artist-portfolio-builder',
                'description' => 'A portfolio builder specifically designed for dark art and alternative artists. The platform provides beautiful templates and easy customization tools for artists to showcase their work professionally.',
                'challenge' => 'Creating a portfolio builder that was both powerful and accessible:\n\n• Designing templates that work across various art styles\n• Building an intuitive drag-and-drop interface\n• Ensuring portfolios load quickly despite large images\n• Providing SEO optimization for artist discoverability\n• Supporting custom domains and branding',
                'solution' => 'We created a comprehensive portfolio solution:\n\n• Developed 15+ professionally designed dark-themed templates\n• Built a visual editor with drag-and-drop functionality\n• Implemented automatic image optimization and lazy loading\n• Added built-in SEO tools and meta tag customization\n• Created custom domain mapping system\n• Integrated social media sharing and analytics',
                'results' => 'The platform empowered artists to build professional portfolios:\n\n• 2,000+ active artist portfolios created\n• Average portfolio creation time: 30 minutes\n• 85% of users reported increased client inquiries\n• Portfolios averaged 200+ monthly visitors\n• 4.7/5 user satisfaction rating\n• Featured as "Top Portfolio Builder for Alternative Artists"',
                'client_name' => 'Raven\'s Nest Creative',
                'project_type' => 'Web Development',
                'project_date' => '2024-07-01',
                'technologies' => ['Vue.js', 'Laravel', 'Tailwind CSS', 'MySQL', 'AWS S3', 'Cloudflare'],
                'project_url' => null,
                'is_featured' => false,
            ],
        ];

        foreach ($caseStudies as $caseStudyData) {
            CaseStudy::create($caseStudyData);
        }
    }
}
