export const up = (knex) =>
  knex.schema.createTable("movies", (table) => {
    table.increments("id");
    table.string("title");
    table.string("description");
    table.integer("rating").unsigned().notNullable().defaultTo(1);
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

export const down = (knex) => knex.schema.dropTable("movies");
