exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name')
        table.string('username')
        table.string('email')
        table.string('password')
        table.string('country')
        table.string('address')
        table.boolean('organization')
        table.boolean('repairShop')
        table.timestamps(true, true);
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
};