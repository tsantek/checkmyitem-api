const { response } = require("express");
const { Users } = require("../models/index.js");
const db = require("../models/index.js");
const Items = db.Items;
const Owners = db.Owners
const Op = db.Sequelize.Op;

const addNewItem = async (req, res, next) => {
    const { name, serial, status, stolen, description, userId } = req.body
    const item = {
        name,
        serial,
        status,
        stolen,
        description
    }
    await Items.create(item).then(data => {
        const id = data.id
        Owners.create({ item_id: id, user_id: userId }).then(() => {
            res.status(201).send({
                id,
                name,
                serial,
                status,
                stolen,
                description
            })
        }
        ).catch(err => console.log(err))
    }).catch(next)
}


const findMyItems = async (req, res, next) => {
    await Owners.findAll({
        where: { user_id: req.currentUser.id },
        include: [{
            model: db.Items,
            required: true
        }],
        order: [['createdAt', 'DESC']]
    }).then(
        (item) => {
            if (!item) {
                throw new BadRequestError(`Don't have any items!`)
            } else {
                const data = item.map(it => it.item)
                console.log(data)
                res.status(200).send(data);
            }
        }
    ).catch((err) => console.log(err))
}

const findOneItem = async (req, res, next) => {
    await Items.findOne({ where: { id: req.query.id } })
        .then(response => {
            if (!response) {
                throw new BadRequestError(`Sorry!!`)
            } else {
                if (req.currentUser) {
                    Owners.findOne({ where: { user_id: req.currentUser.id, item_id: req.query.id } })
                        .then(find => {
                            if (!find) {
                                res.status(200).send(response)
                            } else {
                                response.dataValues.currentUser = true;
                                res.status(200).send(response)
                            }

                        }).catch(next)
                } else {
                    res.status(200).send(response)
                }
            }

        })
        .catch(next)
}

const mainSearch = async (req, res, next) => {
    const search = req.query.search
    console.log(req.query.search)
    await Items.findAll({ where: { serial: search } })
        .then(items => {
            res.status(200).send(items)
        })
        .catch(err => console.log(err))
}

module.exports = {
    addNewItem,
    findMyItems,
    findOneItem,
    mainSearch
}