# Environment Variables for Node.js Server

Create a `.env` file in the `kambaz-node-server-app` directory with the following variables:

## Local Development

```env
SERVER_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:4000
SESSION_SECRET=super secret session phrase
DATABASE_CONNECTION_STRING=mongodb://127.0.0.1:27017/kambaz
```

## Production (Render/Heroku/AWS)

```env
SERVER_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
SERVER_URL=your-server.onrender.com
SESSION_SECRET=your-strong-random-secret-string
DATABASE_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/kambaz?retryWrites=true&w=majority&appName=Kambaz
```

## Important Notes

1. **DATABASE_CONNECTION_STRING**: 
   - Replace `username` and `password` with your MongoDB Atlas credentials
   - Replace `cluster.mongodb.net` with your actual cluster URL
   - **Must include `/kambaz` (database name) before the `?`**

2. **SERVER_URL**: 
   - Do NOT include `https://` prefix
   - Example: `kambaz-node-server-app.onrender.com` (not `https://kambaz-node-server-app.onrender.com`)

3. **SESSION_SECRET**: 
   - Use a strong random string in production
   - Generate with: `openssl rand -base64 32` or use an online generator

4. **CLIENT_URL**: 
   - Must match your Vercel deployment URL exactly
   - Include `https://` prefix

