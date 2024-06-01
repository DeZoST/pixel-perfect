import sqlite from "sqlite3"
import {open} from "sqlite"

// you would have to import / invoke this in another file
export async function openDb() {
    return open({
        filename: "./src/db/database.db",
        driver: sqlite.Database,
    })
}
