import { createApp } from './app.js';
import { connectDatabase, mongoUri } from './config/database.js';
export const backendPort = 8000;
export function getServerBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
export function startServer() {
    const app = createApp();
    void connectDatabase()
        .then(() => {
        console.log(`MongoDB connected at ${mongoUri}`);
    })
        .catch((error) => {
        console.error('MongoDB connection failed:', error);
    });
    app.listen(backendPort, () => {
        console.log(`OctoFit Tracker backend listening at ${getServerBaseUrl()}`);
    });
}
