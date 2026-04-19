# JU-Dashboard

A full-stack **resource booking** demo for academic or lab settings: catalogue **resources** (rooms, equipment, etc.), create **date-based bookings**, and cancel reservations through a REST API consumed by a React (Vite + TypeScript) frontend.

---

## Architecture

| Layer | Stack |
|--------|--------|
| **API** | Node.js, Express 5, Sequelize 6, MySQL |
| **Client** | React 19, Vite, TypeScript, Tailwind CSS |

All booking and resource endpoints are versioned under **`/api/v1`**.

---

## Repository layout

```
ju-dashboard/
├── backend/          # Express API + Sequelize models
├── frontend/         # Vite React SPA
├── postman/          # Postman collection for API testing
└── README.md         # This file
```

---

## Prerequisites

- **Node.js** (LTS recommended)
- **MySQL** server with a database the app can use
- **npm** (ships with Node)

---

## Backend setup

1. **Create a MySQL database** (name can match your `.env`).

2. **Configure environment** — in `backend/`, create a `.env` file (values are examples):

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_NAME=spacesync_db
   DB_USER=root
   DB_PASSWORD=your_password
   ```

   Defaults in code match `spacesync_db` / `root` / empty password if variables are omitted; adjust for your machine.

3. **Install and run**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   The server listens on **`http://localhost:5000`** by default (or `PORT`). On startup it authenticates to MySQL and runs `sequelize.sync({ force: false })`.

4. **Production build**

   ```bash
   cd backend
   npm run build
   ```

---

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The dev server is typically **`http://localhost:5173`**. API calls use **`/api/v1/...`**; Vite proxies `/api` to the backend origin in development (see `frontend/vite.config.ts`).

Optional: set **`VITE_API_URL`** if you need an absolute API base instead of the proxy.

---

## HTTP API reference

Base path: **`/api/v1`**

### Resources

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/resources` | List all resources (ordered by `id`). |
| `POST` | `/api/v1/resources` | Create a resource. |

**Create resource — JSON body**

| Field | Type | Rules |
|--------|------|--------|
| `name` | string | Required, non-empty after trim. |
| `type` | string | Required label (e.g. `Lab`, `Room`). |
| `capacity` | integer | Required, ≥ 1. |

**Success:** `201` — created row JSON (`id`, `name`, `type`, `capacity`).  
**Client error:** `400` — `{ "error": "<message>" }` for validation failures.  
**Server error:** `500` — `{ "error": "Failed to create resource" }` (or fetch message).

---

### Bookings

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/bookings` | List bookings with associated **resource** included. |
| `POST` | `/api/v1/bookings` | Create a booking. |
| `DELETE` | `/api/v1/bookings/:id` | Cancel a booking by numeric `id`. |

**Create booking — JSON body**

| Field | Type | Rules |
|--------|------|--------|
| `resource_id` | integer | Required, ≥ 1; must reference an existing resource. |
| `requested_by` | string | Required display name. |
| `booking_date` | string | Required, **`YYYY-MM-DD`**. |

**Success:** `201` — created booking JSON (`id`, `resource_id`, `requested_by`, `booking_date`, `status`, nested `resource` where applicable on reads).  
**Client error:** `400` — `{ "error": "<message>" }` for validation, missing resource, or duplicate booking for the same resource and date.  
**Delete success:** `204` — no body.  
**Delete not found:** `404` — `{ "error": "Booking not found" }`.  
**Invalid id:** `400` — `{ "error": "Invalid booking id" }`.

---

### CORS

The API allows browser origins **`http://localhost:5173`** and **`http://localhost:3000`** (see `backend/src/app.ts`). Extend the list if you deploy to other hosts.

---

## Postman

Import the collection into Postman or Newman:

- **Collection:** [`postman/JU-Dashboard-API.postman_collection.json`](postman/JU-Dashboard-API.postman_collection.json)

The collection defines a **`baseUrl`** variable (default `http://localhost:5000`). Adjust it for staging or production.

Suggested workflow:

1. Run the backend with a reachable MySQL instance.
2. **List resources** → copy an `id`.
3. **Create booking** → set `resource_id` in the body.
4. **List bookings** → copy a booking `id`.
5. **Delete booking** → uses `{{bookingId}}` (set manually or from a prior response).

---

## Health check

`GET /` on the API host returns a short plain-text message indicating the server is running (not part of `/api/v1`).

---

## Contributing & support

This repository is structured for coursework or internal demos. For production use, add authentication, rate limiting, audited migrations instead of `sync`, and harden CORS and error handling.

---

## License

Unless otherwise specified by the project owner, treat usage and redistribution according to your institution’s policies.
