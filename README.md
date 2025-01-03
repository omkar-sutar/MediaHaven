# MediaHaven

**MediaHaven** is an application designed to safely back up your data to a self-hosted server.

This application consists of two components:
- **Frontend (UI component):** Allows you to view and manage your media (this repository).
- **Backend:** [MediaHaven API Server](https://github.com/omkar-sutar/MediaHaven-Backend).

---

## Prerequisites

Before you start, ensure you have the following installed:
- [Docker](https://docs.docker.com/)
- [MediaHaven API Server](https://github.com/omkar-sutar/MediaHaven-Backend) (backend).

---

## Usage

### Step 1: Configure the Server ⚙️

1. Clone this repository and navigate to the project folder:
   ```bash
   git clone https://github.com/omkar-sutar/MediaHaven.git
   cd MediaHaven
   ```

2. Create a `.env` file and configure the MediaHaven API Server endpoint:
   ```bash
   vi .env
   ```
   Add the following line, replacing `<ip>` and `<port>` with your backend server's IP address and port:
   ```bash
   REACT_APP_BACKEND_SERVER_URL=http://<ip>:<port>
   ```

3. Build the Docker image:
   ```bash
   docker build -t mediahavenfd .
   ```

---

### Step 2: Start the Server 🚀

Run the following command to start the server:
```bash
docker run -d -p 3000:3000 mediahavenfd
```

Alternatively, you can use the `docker_run.sh` script to start the server. Ensure the script is updated to match your specific configuration.

---

### Verifying the Server

Visit [http://127.0.0.1:3000](http://127.0.0.1:3000) in your web browser to access the login page.

---

