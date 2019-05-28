var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

let managerAccessPin = '1234';



inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'Are you logging in or do you have an existing count?',
        choices: ['Log In', 'Create New Id','Exit']
    }
]).then(function(res, err){
    if (err) {
        console.log(err);
    }
    else if (res.choice === 'Log In') {
        logIn();
    }
    else if (res.choice === 'Create New Id'){
        console.log('hi');
        createNewId();
    }
    else if (res.choice === 'Exit') {
        console.log('Have a nice day');
    }
})

function logIn () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'user',
            message: 'User Name: '
        },
        {
            type: 'input',
            name: 'password',
            message: 'Password: '
        }
    ]).then(function(result, err){
        let user = result.user;
        let password = result.password;
        connection.query(
            "SELECT * FROM bamazon_db.managers WHERE user_name='"+user+"'", function(err,manager){
                let managerName = JSON.parse(JSON.stringify(manager[0].user_name));
                let managerPassword = JSON.parse(JSON.stringify(manager[0].user_password));
                if ( user === managerName && password === managerPassword ){
                    console.log('yes!')
                    yesterday();
                }
                else if (err) {
                    console.log('Sorry incorrect user name or password please try again');
                    connection.end();
                }
            }
        )
    })
}

function yesterday () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'managerPrompt',
            choices: ['List of Products', 'Add a new product','Exit']
        }
    ]).then(function(will, err){
        if (will.managerPrompt === 'List of Products'){
            connection.query(
                'SELECT * FROM bamazon_db.products', function (err, res) {
                    if (err) throw err;
                    res.forEach(function(products){
                        console.log(
                            `
                            =========== ${products.product_name} ===========
                            Product id #:   ${products.id}
                            Department:     ${products.department_name}
                            Product Price:  ${products.price}
                            Quantity left:  ${products.stock_quantity}
        
                            `
                        );
                    });
                }
            );
            yesterday();
        }
        else if (will.managerPrompt ==='Add a new product'){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'addProductName',
                    message: 'Enter your products name: '
                },
                {
                    type: 'input',
                    name: 'addDepartmentName',
                    message: 'Enter the department it belongs to: '
                },
                {
                    type: 'number',
                    name: 'addPrice',
                    message: 'Set price in decimal'
                },
                {
                    type: 'number',
                    name: 'addQuantity',
                    message: 'Quantity: '
                }
            ]).then(function(res,err){
                let addProductName = res.addProductName;
                let addDepartmentName = res.addDepartmentName;
                let addPrice = res.addPrice;
                let addQuantity = res.addQuantity;
                connection.query(
                    'INSERT INTO bamazon_db.products SET ?',
                    {
                        product_name: addProductName,
                        department_name: addDepartmentName,
                        price: addPrice,
                        stock_quantity: addQuantity
                    }
                )
                yesterday();
            })
        }
        else if (will.managerPrompt ==='Exit') {
            connection.end();
        }
    });
};

function createNewId () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'access',
            message: 'Please enter the user setup pin if authorized'
        }
    ]).then(function(res,err){
        if ( res.access === managerAccessPin ){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newUser',
                    message: 'Type in your desired username'
                },
                {
                    type: 'input',
                    name: 'newPassword',
                    message: 'Type in your desired password'
                }
            ]).then(function(res,err){
                let newUser = res.newUser;
                let newPass = res.newPassword;
                connection.query(
                    'INSERT INTO bamazon_db.managers SET ?',
                    {
                        user_name: newUser,
                        user_password: newPass
                    }
                    )
                    connection.end()
                })
            }
        })
}