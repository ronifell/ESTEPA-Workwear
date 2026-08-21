import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  StorageUnavailableError,
  type ContactLead,
  type LeadStore,
  type Order,
  type OrderStore,
} from "./types";

/**
 * Default persistence: newline-delimited JSON on disk.
 *
 * It is a real store (nothing is faked) and keeps the project runnable without
 * a database. On read-only hosting it throws `StorageUnavailableError`, which
 * the API surfaces to the user instead of pretending the request succeeded.
 */

// Statically scoped so the bundler does not trace the whole project.
const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(process.cwd(), ".data", "leads.ndjson");
const ORDERS_FILE = path.join(process.cwd(), ".data", "orders.ndjson");

async function ensureDir(): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    throw new StorageUnavailableError(
      `Cannot create data directory: ${(error as Error).message}`,
    );
  }
}

async function append(file: string, record: unknown): Promise<void> {
  await ensureDir();

  try {
    const existing = await readFile(file, "utf8").catch(() => "");
    await writeFile(file, `${existing}${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    throw new StorageUnavailableError(
      `Cannot write to ${file}: ${(error as Error).message}`,
    );
  }
}

async function readAll<T>(file: string): Promise<T[]> {
  const content = await readFile(file, "utf8").catch(() => "");

  return content
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      try {
        return JSON.parse(line) as T;
      } catch {
        return null;
      }
    })
    .filter((entry): entry is T => entry !== null);
}

export const fileLeadStore: LeadStore = {
  async create(lead: ContactLead) {
    await append(LEADS_FILE, lead);
  },
};

export const fileOrderStore: OrderStore = {
  async create(order: Order) {
    await append(ORDERS_FILE, order);
  },

  async findByReference(reference: string) {
    const orders = await readAll<Order>(ORDERS_FILE);
    return orders.find((order) => order.reference === reference) ?? null;
  },
};
