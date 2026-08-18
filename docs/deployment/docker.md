# Docker and Docker Compose

This is the easiest self-hosting path for beginners.

## Before You Start

- Docker Desktop installed and running
- Internet connection (first run downloads the image)

## Step 1: Open the Deploy Folder

```bash
git clone https://github.com/nexu-io/open-design.git
cd sankiwork/deploy
```

What this does:
- Downloads the project
- Moves into the folder that contains `docker-compose.yml`

## Step 2: Create `.env` and choose an API auth mode

Create `deploy/.env` from the tracked template:

```bash
cp .env.example .env
```

Generate a token if you want the default protected mode:

```bash
openssl rand -hex 32
```

Then edit `.env` and configure one of these before first start:

- recommended default: paste the generated token into `SW_API_TOKEN=`
- trusted authenticated reverse proxy only: leave `SW_API_TOKEN=` empty and set `SANKIWORK_DISABLE_API_AUTH=1`

If you expose SankiWork through a reverse proxy, also set:

```bash
SANKIWORK_ALLOWED_ORIGINS=https://yourdomain.com
```

## Step 3: Start SankiWork

```bash
docker compose up -d
```

What to expect:
- First run can take 1-2 minutes while Docker pulls the image
- You should see container creation and startup messages

## Step 4: Confirm Container Health

```bash
docker compose ps
```

Success looks like:
- `sankiwork` container is listed
- `STATUS` shows `Up` and eventually `healthy`
- Port mapping includes `127.0.0.1:7456->7456/tcp`

![Docker Desktop container running](../screenshots/deployment/docker/02-docker-desktop-container-running.png)
![docker-compose ps healthy output (sanitized)](../screenshots/deployment/docker/04-docker-compose-ps-healthy.png)

## Step 5: Verify Container Health Over HTTP

```bash
curl -i http://127.0.0.1:7456/api/health
```

Success looks like:
- HTTP status `200 OK`

![curl HTTP 200 output (sanitized)](../screenshots/deployment/docker/05-curl-http-200-proof.png)

## Step 6: Open SankiWork in Your Browser

Open:
- `http://127.0.0.1:7456/`

If the browser displays a sign-in dialog, enter `sankiwork` as the username
and the `SW_API_TOKEN` value from `deploy/.env` as the password. You should then
see the SankiWork interface. Docker bridge peers remain authenticated; no host
networking override is required.

![SankiWork home (desktop)](../screenshots/deployment/docker/01-sankiwork-home.png)
![SankiWork home (mobile)](../screenshots/deployment/docker/03-sankiwork-mobile.png)

## Common Issues

- `failed to connect to the docker API`: Docker Desktop is not running yet
- `address already in use`: Port `7456` is occupied by another process
- `curl: (7) Failed to connect`: container is still starting; wait 10-20 seconds and retry
- `pull access denied` or `authentication required` for `ghcr.io/nexu-io/od`: the GHCR package must be public for anonymous Docker, Compose, and Dokploy pulls. An organization maintainer must open GitHub -> Packages -> `sw` -> Package settings and change visibility to Public.
- reverse proxy + `SW_API_TOKEN`: either inject `Authorization: Bearer <SW_API_TOKEN>` at the proxy, or set `SANKIWORK_DISABLE_API_AUTH=1` only when that proxy already authenticates every request and the daemon is not directly exposed.
- browser sign-in repeats: use username `sankiwork` and the exact `SW_API_TOKEN` value from `deploy/.env`; recreate the container after changing the token.
