module.exports = {
    port: 3050,
    dbUrl: "mongodb://localhost:27017/filemange",
    corsConfig: {
        origin: "*",
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      }
}