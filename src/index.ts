import app from "./app";
import { config } from "./config";
import { initDb } from "./db";

async function main(): Promise<void> {
  await initDb();
  app.listen(config.port, () => {
    console.log(`Weather Cache API running on port ${config.port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
