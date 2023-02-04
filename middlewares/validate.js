const yup = require("yup");
const validate = async(req, res, next) => {
   try {
    console.log(req.body);
    const schema = yup.object().shape({
        titre: yup.string().required(),
        nbre_participant: yup.number().max(30).positive(),
        description: yup.string().length(10),
        date_Event: yup.date().required()
    });
    await schema.validate(req.body);
    next();
   } catch (error) {
    res.render("error", { message: error.message, error });
   }
}
module.exports = validate;