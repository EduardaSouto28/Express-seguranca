const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//usar helmet
var helmet = require('helmet');

//app.use(helmet());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                'script-src': ["'self'", 'example.com'],
                'style-src': null,
            },
        },
    })
);


//usar express validator
const { body, validationResult } = require('express-validator');

app.use(bodyParser.json());

//valida os dados da request
app.post( '/user', [
    body('username').isEmail(), 
    body('password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( {errors: errors.array()} )
    }
    return res.json( {msg: 'sucesso'} )
  }
);

app.listen(3000, () => {});