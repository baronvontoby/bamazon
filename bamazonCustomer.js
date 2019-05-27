var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Please enter in your name'
},  
    {
        type: 'confirm',
        message: 'Ready to check out what we have for sale?',
        name: 'confirm'
    }
]).then(function(res, err){
    if (err) throw err;
    if (res.confirm === true ) {
        listings() 
        buy();
    }
    else {
        console.log('Sorry for the inconvenience');
    }
});

function listings () {
    connection.query(
        'SELECT * FROM bamazon_db.products', function (err, res) {
            if (err) throw err;
            res.forEach(function(products){
                console.log(
                    `
                    =========== ${products.product_name} ===========
                    Product id #:   ${products.id}
                    Product Price:  ${products.price}
                    `
                );
            });
        }
    );
};

function buy () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please select the desired item by ID'
        },
        {
            type: 'number',
            name: 'quantity',
            message: 'How many would you like to purchase?'
        }
    ]).then(function(response){
        let id = response.id;
        let quantity = response.quantity;
        connection.query(
            "SELECT * FROM bamazon_db.products WHERE id='"+id+"'",function(err, res){
                if (err) throw err;
                let price = JSON.parse(JSON.stringify(res[0].price));
                let existingQuantity = JSON.parse(JSON.stringify(res[0].stock_quantity));
                let name = JSON.parse(JSON.stringify(res[0].product_name));
                let total = price * quantity;
                if (quantity > existingQuantity) {
                    console.log('Unfortunatley we do not have enough product to fulfill this order')
                }
                else if (quantity <= existingQuantity ){
                    let newQuantity = existingQuantity - quantity;
                    console.log('Thank you for choosing Bamazon. Your order of '+quantity+' '+name+' will come to a total of: '+total);
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            message: 'Would you like to make this purchase?',
                            name: 'final'
                        }
                    ]).then(function(yes){
                        if (yes.final === true ){
                            checkout(newQuantity, id);
                        }
                        else {
                            reSelect();
                        }
                    })
                }
            }
            )
        })
    }
    
    function checkout (newQuantity, id) {
        console.log('Thank you for shopping with Bamazon.  Your order will ship within 3-5 business days.  Have a nice day.')
        connection.query(
            "UPDATE bamazon_db.products SET ? WHERE ?",
            [
                {stock_quantity: newQuantity},
                {id: id}
            ]
        )
        connection.end();   
    }

    function reSelect () {
        inquirer.prompt([
            {
                type: 'list',
                name: 'continue', 
                message: 'What would you like to do?',
                choices: ['Select a different Item', 'Exit']
            }
        ]).then(function(again){
            if (again.continue === 'Select a different Item') {
                buy();
            }
            else if (again.continue === 'Exit') {
                connection.end();
            }
        })
    }