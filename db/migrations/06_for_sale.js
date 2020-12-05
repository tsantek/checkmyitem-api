exports.up = function (knex) {
    return knex.schema.createTable('for_sale', table => {
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
        table.timestamps(true, true);
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('for_sale')
};