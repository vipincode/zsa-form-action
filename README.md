# Docs

[Tutorials](https://www.youtube.com/watch?v=QkDYn6b09I4)
[Blog post](https://reetesh.in/blog/zsa-server-action-in-next.js-apps)
[App url](https://zsa-form-action.vercel.app/)

## Prisma Setup

- npm install prisma --save-dev
- npm install @prisma/client
- npx prisma init
- npx prisma db push
- `npx prisma generate` use after db change
- `npx prisma format` use to format database
- `npx prisma studio` use to see database entry

## Creating db connection

- utils > `prisma.ts` ot `db.ts` and write this code

```js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

```
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

```
