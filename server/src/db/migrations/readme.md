# Database Migrations

This project uses a database migration pattern based on [this example](https://github.com/kriasoft/node-sqlite/tree/master/migrations).

## Migration Structure

Each migration consists of two sections:

-   **Up**: This section is used to apply the migration. It includes SQL statements to create tables, indices, and insert data.

-   **Down**: This section is used to undo the migration. It includes SQL statements to drop tables and indices.

## Example Migration

Here's an example of a migration that creates `Category` and `Post` tables, creates an index on the `Post` table, and inserts a row into the `Category` table:

```sql
--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Category (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL
);

CREATE TABLE Post (
  id          INTEGER PRIMARY KEY,
  categoryId  INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  isPublished NUMERIC NOT NULL DEFAULT 0,
  CONSTRAINT Post_fk_categoryId FOREIGN KEY (categoryId)
    REFERENCES Category (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT Post_ck_isPublished CHECK (isPublished IN (0, 1))
);

CREATE INDEX Post_ix_categoryId ON Post (categoryId);

INSERT INTO Category (id, name) VALUES (1, 'Test');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX Post_ix_categoryId;
DROP TABLE Post;
DROP TABLE Category;
```
