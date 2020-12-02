exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id') // this represents the primary key.
        table.string('username') // this is a column.
        table.string('email') // this is a column.
        table.string('password') // this is a column.
        table.string('state')
        table.timestamps();
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};