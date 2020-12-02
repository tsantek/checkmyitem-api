exports.up = function (knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id') // this represents the primary key.
        table.string('name') // this is a column.
        table.string('serial') // this is a column.
        table.string('status') // this is a column.
        table.boolean('stolen') // this is a column.
        table.string('images') // this is a column.
        table.timestamps();
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('items')
};