import path from 'path';

const raltiveFolderPath = `../client/build`;

const mainRoutes = (app) => {
    const frontend = path.resolve(path.join(raltiveFolderPath, "index.html"));
    app.get(["/", "/*"], (req, res) => 
        res.sendFile(frontend)
    );
    return app;
};


export default mainRoutes;