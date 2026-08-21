module.exports = {
  apps: [
    {
      name: "estepa",
      cwd: "/var/www/estepa-workwear",
      script: "node_modules/next/dist/bin/next",
      args: "start -H localhost -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        // `-H localhost` is deliberate. Next derives the origin it compares
        // proxy rewrites against from this hostname, so it has to match the
        // `localhost:PORT` origin the proxy sees; with `-H 127.0.0.1` every
        // rewritten English URL looks cross-origin, gets proxy-fetched instead
        // of resolved internally, and the whole /en site answers 500.
        // Resolving localhost to IPv4 keeps the socket on 127.0.0.1, where
        // nginx expects it, and still binds the loopback interface only.
        NODE_OPTIONS: "--dns-result-order=ipv4first",
      },
    },
  ],
};
