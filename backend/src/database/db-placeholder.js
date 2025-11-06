import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// This file will be created at runtime, no need to edit
