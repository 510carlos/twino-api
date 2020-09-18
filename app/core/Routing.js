export default (app, routes) => {
    routes.forEach(item =>
        app.use(item.path, item.middlewares, item.component)
    );

    return app;
}
    