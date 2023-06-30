/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/mud",
        destination: "https://v2.mud.dev",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/aLIEzsss4/MUD-AI-docs",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/aliezsss4",
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
