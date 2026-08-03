FROM node:22-alpine AS base
WORKDIR /app

# 2. Build stage
FROM base AS build

# Копіюємо файли залежностей (pnpm / npm / yarn)
COPY package.json package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml* yarn.lock* ./

# Встановлюємо залежності (використовуйте ваш пакетний менеджер)
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Копіюємо увесь проект та збираємо Nitro-сервер
COPY . .
RUN if [ -f pnpm-lock.yaml ]; then pnpm run build; else npm run build; fi

# 3. Runner stage (підсумковий мінімальний образ)
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Копіюємо тільки зібрану папку .output з build-стейджу
COPY --from=build /app/.output ./.output

EXPOSE 3000

# Запускаємо сервер Nitro
CMD ["node", ".output/server/index.mjs"]
