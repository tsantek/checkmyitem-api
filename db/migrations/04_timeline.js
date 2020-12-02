exports.up = function (knex) {
    return knex.schema.createTable('timeline', table => {
        table.increments('id') // this represents the primary key.
        table.integer("item_id")
            .notNullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE')
            .index();
        table.integer("shop_user_id")
            .notNullable()
            .references('id')
            .inTable('shop_users')
            .onDelete('CASCADE')
            .index();
        table.string('note') // this is a column.
        table.string('status') // this is a column.
        table.timestamps();
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('timeline')
};