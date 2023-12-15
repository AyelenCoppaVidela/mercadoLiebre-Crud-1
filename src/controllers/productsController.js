const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render ('index')
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id)
		res.render ("detail", {title: product.name, product, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id)
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id)
		res.render ("product-edit-form", {product, toThousand})
	},

	// Update - Method to update
	update: (req, res) => {
			const {id} = req.params;
			const {name,price,discount,category,description,image} = req.body 
			const nuevoArray = products.map ( product => {
				if (product.id == id){
					return {
						id,
						name: name.trim(),
						price,
						discount,
						category,
						description : description.trim(),
						image : image ? image : product.image,
					}
				}
				return product
			})
			const json = JSON.stringify(nuevoArray);
			fs.writeFileSync(productsFilePath,json, "utf-8");
			res.redirect (`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsModify = loadProducts().filter(product => product.id !== +req.params.id);
		storeProducts(productsModify);
		res.redirect('/products')
	}
};

module.exports = controller;