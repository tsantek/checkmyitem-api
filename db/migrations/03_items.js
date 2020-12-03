exports.up = function (knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id')
        table.string('name')
        table.string('serial')
        table.string('status')
        table.boolean('stolen')
        table.string('images')
        table.string('ipAddress')
        table.string('user')
        table.string('userInfo')
        table.timestamps(true, true);
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('items')
};