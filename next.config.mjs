/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true, // Enable this if you're using the app directory with Next.js
    },
    async redirects(){
        return [
            {
                source: '/',
                destination: '/network',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
