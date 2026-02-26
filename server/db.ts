import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, inscricoes, InsertInscricao, Inscricao } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

/**
 * Criar uma nova inscrição
 * 
 * @param email - Email do usuário
 * @param telefone - Telefone do usuário
 * @returns A inscrição criada com ID
 * 
 * Exemplo de uso:
 * const novaInscricao = await createInscricao('teste@example.com', '(11) 99999-9999');
 */
export async function createInscricao(email: string, telefone: string): Promise<Inscricao | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create inscricao: database not available");
    return null;
  }

  try {
    // Inserir a inscrição no banco
    const result = await db.insert(inscricoes).values({
      email,
      telefone,
    });

    // Buscar a inscrição que foi criada para retornar os dados completos
    const inscricaoCriada = await db.select().from(inscricoes)
      .where(eq(inscricoes.email, email))
      .limit(1);

    return inscricaoCriada.length > 0 ? inscricaoCriada[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create inscricao:", error);
    throw error;
  }
}

/**
 * Listar todas as inscrições
 * 
 * @returns Array com todas as inscrições ordenadas por data (mais recentes primeiro)
 * 
 * Exemplo de uso:
 * const todasInscricoes = await listInscricoes();
 */
export async function listInscricoes(): Promise<Inscricao[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list inscricoes: database not available");
    return [];
  }

  try {
    // Buscar todas as inscrições, ordenadas por data (mais recentes primeiro)
    const result = await db.select().from(inscricoes)
      .orderBy((table) => table.criadoEm); // Ordem crescente (mais antigas primeiro)
    
    return result;
  } catch (error) {
    console.error("[Database] Failed to list inscricoes:", error);
    throw error;
  }
}
