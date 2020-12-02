exports.up = function (knex) {
    return knex.schema.createTable('for_sale', table => {
        table.increments('id') // this represents the primary key.
        table.integer("item_id")
            .notNullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE')
            .index();
        table.integer("user_id")
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();
        table.timestamps();
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('for_sale')
};