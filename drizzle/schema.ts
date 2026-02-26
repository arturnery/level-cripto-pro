import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de inscrições para a lista de espera do Level Cripto PRO
 * Armazena email e telefone dos usuários interessados no curso
 */
export const inscricoes = mysqlTable("inscricoes", {
  /**
   * ID único para cada inscrição (auto-incrementado pelo banco)
   * Exemplo: 1, 2, 3, 4...
   */
  id: int("id").autoincrement().primaryKey(),
  
  /**
   * Email do usuário
   * - varchar(255): texto com máximo 255 caracteres
   * - notNull(): campo obrigatório (não pode ser vazio)
   * - unique(): não pode ter dois emails iguais
   */
  email: varchar("email", { length: 255 }).notNull().unique(),
  
  /**
   * Telefone do usuário
   * - varchar(20): texto com máximo 20 caracteres (suficiente para formato (XX) 9XXXX-XXXX)
   * - notNull(): campo obrigatório
   */
  telefone: varchar("telefone", { length: 20 }).notNull(),
  
  /**
   * Data e hora da inscrição
   * - timestamp: data e hora
   * - defaultNow(): preenche automaticamente com a data/hora atual quando cria
   * - notNull(): sempre tem um valor
   */
  criadoEm: timestamp("criadoEm").defaultNow().notNull(),
});

/**
 * Tipos TypeScript gerados automaticamente pelo Drizzle
 * 
 * Inscricao: tipo para LER dados da tabela (o que vem do banco)
 * InsertInscricao: tipo para CRIAR dados na tabela (o que você envia)
 */
export type Inscricao = typeof inscricoes.$inferSelect;
export type InsertInscricao = typeof inscricoes.$inferInsert;