# Costamar Backend — API Spring Boot

API REST pour le site **Costamar Hammam & Spa** : gestion des services, des réservations en ligne, et authentification JWT.

## Stack

- Java 21 + Spring Boot 3.3
- Spring Security + JWT (jjwt) — auth maison, sans dépendance externe
- Spring Data JPA + MariaDB (H2 en profil `dev` pour tester sans installer MariaDB)
- Spring Mail (email de confirmation de réservation, best-effort)

## Lancer en local

### Option A — sans installer MariaDB (profil dev, base H2 en mémoire)

```bash
cd backend
SPRING_PROFILES_ACTIVE=dev mvn spring-boot:run
```

L'API démarre sur `http://localhost:8080`. Les données de démo (services, horaires, compte admin) sont recréées à chaque démarrage.

### Option B — avec MariaDB (recommandé pour se rapprocher de la prod)

1. Installer MariaDB, puis créer la base et l'utilisateur :

```sql
CREATE DATABASE costamar CHARACTER SET utf8mb4;
CREATE USER 'costamar'@'localhost' IDENTIFIED BY 'costamar';
GRANT ALL PRIVILEGES ON costamar.* TO 'costamar'@'localhost';
FLUSH PRIVILEGES;
```

2. Lancer l'app (le profil par défaut `dev` n'est plus actif) :

```bash
cd backend
DB_URL=jdbc:mariadb://localhost:3306/costamar \
DB_USERNAME=costamar \
DB_PASSWORD=costamar \
SPRING_PROFILES_ACTIVE=prod \
mvn spring-boot:run
```

Au premier démarrage, Hibernate crée les tables (`ddl-auto=update`) et `DataSeeder` insère : un compte admin, les horaires d'ouverture par défaut (fermé le dimanche, 9h30–19h30 les autres jours) et 6 services de démonstration.

## Variables d'environnement importantes

| Variable | Rôle | Défaut |
|---|---|---|
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Connexion MariaDB | `jdbc:mariadb://localhost:3306/costamar` |
| `JWT_SECRET` | Clé de signature des tokens JWT — **à changer en prod** | valeur de dev, non sécurisée |
| `JWT_EXPIRATION_MS` | Durée de validité du token | 86400000 (24h) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Compte admin créé au 1er démarrage | `admin@costamar-hammam.com` / `ChangeMe123!` — **à changer immédiatement** |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` | SMTP pour les emails de confirmation | smtp.gmail.com:587 |
| `PORT` | Port d'écoute HTTP | 8080 |

## Compte admin par défaut

Au premier démarrage, un compte admin est créé automatiquement avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
**Changez ce mot de passe immédiatement en production** en définissant ces variables avant le premier démarrage, ou en le modifiant directement en base ensuite.

## Principaux endpoints

### Publics

- `POST /api/auth/register` / `POST /api/auth/login`
- `GET /api/services` (`?category=SPA_MASSAGE|SOINS|BEAUTE|HAMMAM_PRIVE`)
- `GET /api/availability?serviceId=1&date=2026-08-01` → créneaux libres
- `POST /api/bookings` → créer une réservation
- `GET /api/bookings/lookup/{email}` → retrouver ses réservations

### Protégés (JWT, header `Authorization: Bearer <token>`)

- `GET /api/me`

### Admin uniquement (rôle `ADMIN`)

- `GET/POST/PUT/DELETE /api/admin/services`
- `GET /api/admin/bookings` (filtrable par `from`/`to`)
- `PATCH /api/admin/bookings/{id}/status?status=CONFIRMED`
- `GET/PUT /api/admin/business-hours`
- `GET/POST/DELETE /api/admin/blocked-dates`

## Déploiement — important

**Spring Boot ne peut pas tourner sur Cloudflare Pages/Workers** (ce sont des environnements pour sites statiques et fonctions JS/Wasm légères, pas pour une JVM). Pour le backend, il faut un hébergeur qui exécute de vrais processus Java, par exemple (offres gratuites/pas chères disponibles) :

- [Railway](https://railway.app) — déploiement Git + MariaDB managée en quelques clics
- [Render](https://render.com) — Web Service Java + base MySQL/MariaDB managée
- [Fly.io](https://fly.io) — conteneur Docker (un `Dockerfile` simple suffit)
- Un VPS (Hetzner, OVH, Contabo…) si vous voulez tout gérer vous-même

Le frontend React, lui, se déploie très bien gratuitement sur **Cloudflare Pages** (voir README du frontend).

### Exemple de Dockerfile (pour Fly.io / Railway / tout hébergeur à base de conteneurs)

```dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Pensez à configurer `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` en variables d'environnement sur la plateforme choisie.
