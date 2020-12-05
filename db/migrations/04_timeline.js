exports.up = function (knex) {
    return knex.schema.createTable('timeline', table => {
        table.increments('id') // this represents the primary key.
        table.integer("itemId")
            .notNullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE')
            .index();
        table.integer("userId")
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();
        table.string('note') // this is a column.
        table.string('status') // this is a column.
        table.timestamps(true, true);
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('timeline')
};