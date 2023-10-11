const {Contact} = require('../models/models');
const ApiError = require('../error/ApiError');


class ContactController {
    async create(req, res, next) {
        try {
            let {name, tel} = req.body;

            const contact = await Contact.create({name, tel});

            return res.json(contact);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {

        const contacts = await Contact.findAndCountAll();

        return res.json(contacts);
    }

    async deleteOne(req, res) {
        let {name} = req.body;

        const contactForDelete = await Contact.findOne({where: {name: name}});

        await contactForDelete.destroy();

        return res.json("Успешно удалено");
    }
}

module.exports = new ContactController();
