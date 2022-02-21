const db=require('../models/model');
const Product=db.product;
const validateProduct=db.validateProduct;
const validateProductGet=db.validateProductGet;




//..>>>>>>>>.......................>>>>>>>>>>.................>>>>>>>>>>>>>>>>>>>>>>
exports.searchProduct = (req, res) => {
    const { error } = validateProductGet(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    // if no query is passed as part of url then default values will be taken...
    if (!req.query.category && !req.query.name) {
        let products = Product.find().sort('-_id');
        res.send(products);
        return;
    }
    const direction = req.query.direction === "ASC" ? +1 : -1;
     Product.find().or([{ name: req.query.name }, { category: req.query.category }])
        .sort({ price: direction }).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(404).send({
            message: err.message || "not found",
        })
    })
}
//..>>>>>>>>.......................>>>>>>>>>>.................>>>>>>>>>>>>>>>>>>>>>>
exports.searchById = (req, res) => {
const id=req.params.id;
console.log(id);
    Product.findById(id).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(404).send( `No Product found for ID - ${id}!` )
    })
}


//..>>>>>>>>.......................>>>>>>>>>>.................>>>>>>>>>>>>>>>>>>>>>>
exports.searchByCatogories= (req, res) => {
    Product.find().select("category").distinct("category").then((data) => {
        res.status(200).send({
            categories: data,
            message: " search by catogories successful"
        })
    }).catch((err) => {
        res.status(404).send({
            message: err.message || "not found",
        })
    })
   
};

//..>>>>>>>>.......................>>>>>>>>>>.................>>>>>>>>>>>>>>>>>>>>>>
exports.saveProduct = (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        availableItems: req.body.availableItems,
        imageURL: req.body.imageURL,
    });

    product.save(product).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({ message: "some error ocurred.please try again later" });
    })

};

//..>>>>>>>>.......................>>>>>>>>>>.................>>>>>>>>>>>

exports.updateProduct = (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Product.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageURL: req.body.imageURL,
        }, 
        { timestamps: true },
        { new: true }
    ).then((data) => {
        res.status(200).send({
            categories: data,
            message: " update successfully"
        })
    }).catch((err) => {
        res.status(404).send(`No Product found for ID - ${req.params.id}!`);
    })

};

//..>>>>>>>>.......................>>>>>>>>>>.................>>>>>>>>>>>
exports.deleteById = (req, res) => {
    const id = req.params.id;
    Product.findById(id).then((data) => {
        res.status(200).send({
            message: `Product with ID - ${id} deleted successfully!`
        })
    }).catch((err) => {
        res.status(404).send(`No Product found for ID - ${id}!`)
    })
}