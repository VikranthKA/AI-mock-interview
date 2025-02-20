
const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"encrypted-tbn0.gstatic.com"

      },
      {
        protocol:'https',
        hostname:"cdn.pixabay.com"

      },
    ]
  }

};

export default nextConfig;
