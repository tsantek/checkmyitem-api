exports.up = function (knex) {
    return knex.schema.createTable('shop_users', table => {
        table.increments('id') // this represents the primary key.
        table.string('username') // this is a column.
        table.string('email') // this is a column.
        table.string('password') // this is a column.
        table.string('name')
        table.string('address')
        table.timestamps();
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shop_users')
};