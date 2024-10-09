import { apiState } from "../..";
import { db } from "../../db";
import { Configuration } from "../../types";

export function getAllConfig(): Configuration {
  const baseURL = getConfig("baseURL")?.value || "";
  const webhookURL = getConfig("webhookURL")?.value || "";

  return {
    baseURL,
    webhookURL,
  };
}

export function getConfig(key: string) {
  return db.query("SELECT value FROM config WHERE key = $key").get({
    $key: key,
  }) as { value: string | null };
}

export function setConfig(key: string, value: string) {
  db.query(
    "INSERT INTO config (key, value) VALUES ($key, $value) ON CONFLICT (key) DO UPDATE SET value = $value"
  ).run({
    $key: key,
    $value: value,
  });

  apiState.setState(() => ({
    config: getAllConfig(),
  }));

  console.log(`⚙️ Config updated: ${key} = ${value}`);
}
