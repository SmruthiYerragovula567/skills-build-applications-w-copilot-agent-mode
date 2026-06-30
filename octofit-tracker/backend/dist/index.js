import { createApp } from './app.js';
import { getApiBaseUrl } from './config/baseUrl.js';
import { connectDatabase, mongoUri } from './config/database.js';
const port = Number(process.env.PORT ?? 8000);
const app = createApp();
void connectDatabase()
    .then(() => {
    console.log(`MongoDB connected at ${mongoUri}`);
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening at ${getApiBaseUrl(port)}`);
});
