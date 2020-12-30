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
        const itemId = data.id
        Owners.create({ item_id: itemId, user_id: userId }).then((owner) => {
            res.status(201).send({
                itemId,
                name,
                serial,
                status,
                stolen,
                description
            })
        }

        ).catch(next)
    }).catch(next)
}


const findMyItems = async (req, res, next) => {
    console.log(req.currentUser.id)
    await Owners.findAll({
        where: { user_id: req.currentUser.id },
        include: [{
            model: db.Items,
            required: true
        }]
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




module.exports = {
    addNewItem,
    findMyItems
}