const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { mongoDB, secret } = require('../Utils/config');
const Customers = require('../Models/CustModel');
const bcrypt = require('bcrypt');

// const bcrypt = require('bcrypt');

const router = express.Router();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});

// get all customers
router.get('/', (req, res) => {
  console.log('Hit customers');
  res.send('Get all customers');
});

// signup
router.post('/', (request, response) => {
  const now = new Date();
  const jsonDate = now.toJSON();
  const joined = new Date(jsonDate);
  console.log('\nEndpoint POST: customer signup');
  console.log('Req Body: ', request.body);
  console.log(joined);

  bcrypt.hash(request.body.cpassword, 10, (errHash, hash) => {
    const newCustomer = new Customers({
      cemail: request.body.cemail,
      cpassword: hash,
      cname: request.body.cname,
      cjoined: joined,
    });
    Customers.findOne({ cemail: request.body.cemail }, (error, customer) => {
      if (error) {
        response.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        console.log('Error in finding customer');
        response.end('Error in finding customer');
      } else if (customer) {
        response.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        console.log('Email ID already registered');
        response.end('Email ID already registered');
      } else {
        newCustomer.save((err) => {
          if (err) {
            response.writeHead(500, {
              'Content-Type': 'text/plain',
            });
            console.log('Error in saving new customer');
            response.end('Error in saving new customer');
          } else {
            console.log('Successfully added customer to database');
            // return the customer object back
            Customers.findOne({ cemail: request.body.cemail }, (e, cust) => {
              if (e) {
                response.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                console.log('Error in finding customer with email ID');
                response.end('Error in finding customer with email ID');
              } else if (cust) {
                const payload = {
                  // eslint-disable-next-line no-underscore-dangle
                  cid: cust._id,
                  cemail: cust.username,
                  cpassword: cust.password,
                  cname: cust.cname,
                  cphone: cust.cphone,
                  cabout: cust.cabout,
                  cjoined: cust.cjoined,
                  cphoto: cust.cphoto,
                  cfavrest: cust.cfavrest,
                  cfavcuisine: cust.favcuisine,
                };
                const token = jwt.sign(payload, secret, {
                  expiresIn: 1008000,
                });
                console.log('Login successful token:', token);
                response.status(200).end(`JWT ${token}`);
              } else {
                response.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                console.log('Customer not found');
                response.end('Customer not found');
              }
            });
            // response.end('Successfully added customer to database');
          }
        });
      }
    });
  });
});

// Get customer object using email ID--OR Login
router.post('/login', (request, response) => {
  console.log('\nEndpoint GET: customer using email id');
  console.log('Req Body: ', request.body);
  Customers.findOne({ cemail: request.body.cemail }, (error, customer) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      console.log('Error in finding customer with email ID');
      response.end('Error in finding customer with email ID');
    } else if (customer) {
      bcrypt.compare(request.body.cpassword, customer.cpassword, (err, result) => {
        console.log('in db: ', customer.cpassword);
        if (result === true) {
          const payload = {
          // eslint-disable-next-line no-underscore-dangle
            cid: customer._id,
            cemail: customer.cemail,
            cpassword: customer.cpassword,
            cname: customer.cname,
            cphone: customer.cphone,
            cabout: customer.cabout,
            cjoined: customer.cjoined,
            cphoto: customer.cphoto,
            cfavrest: customer.cfavrest,
            cfavcuisine: customer.favcuisine,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          response.status(200).end(`JWT ${token}`);
          console.log('Login successful', customer);
        } else {
          response.status(404).send('Incorrect login');
        }
      });
    } else {
      response.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      console.log('Customer not found');
      response.end('Customer not found');
    }
  });
});

module.exports = router;
