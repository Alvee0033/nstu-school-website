# Railway API Deployment

## Prerequisites
- Railway account at https://railway.app
- Railway CLI: `npm i -g @railway/cli`

## Steps

### 1. Create Railway project (first time)
```bash
cd /home/alvee/Desktop/school
railway login
railway init   # creates project, select "Empty Project"
```

### 2. Add PostgreSQL
```
In Railway dashboard → New → Database → PostgreSQL
```
Copy the `DATABASE_URL` connection string from Railway dashboard.

### 3. Set environment variables on Railway
Go to your service → Variables tab, add:

```
NODE_ENV=production
PORT=3005
DATABASE_URL=<from Railway PostgreSQL>
JWT_ACCESS_SECRET=<generate: openssl rand -hex 32>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=<generate: openssl rand -hex 32>
JWT_REFRESH_EXPIRES_IN=7d
THROTTLE_TTL=60
THROTTLE_LIMIT=200
CORS_ORIGINS=https://nstu-web.vercel.app,https://nstu-admin.vercel.app
```

### 4. Deploy
```bash
cd /home/alvee/Desktop/school/apps/api
railway up
```

### 5. Run migrations + seed on Railway
```bash
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

### 6. Get the API URL
Go to Railway dashboard → your service → Settings → Domain
Use this URL as `NEXT_PUBLIC_API_URL` in Vercel.

Format: `https://your-service.railway.app/api/v1`
