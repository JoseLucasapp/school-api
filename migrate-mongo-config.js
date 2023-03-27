const config = {
    mongodb: {
        // TODO Change (or review) the url to your MongoDB: mongo atlas uri removed
        url: "mongodb://127.0.0.1:27017",

        // TODO Change this to your database name:
        databaseName: "schoolapi",
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: "migrations",

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: "changelog",

    // The file extension to create migrations and search for in migration dir 
    migrationFileExtension: ".js",
    moduleSystem: 'esm',
};

// Return the config as a promise
module.exports = config;