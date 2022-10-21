import express from "express";
import { selectDao } from "../src/utils/config.js"
import session from 'express-session';
const routerUser = express.Router();
const daoUsers = await import(`../src/dao/users/UsersDao${selectDao}.js`);
const usersDB = daoUsers.usersDB;

routerUser.get('/login', async (req, res) => {
    res.render('pages/user/logIn')
})
routerUser.post('/login', async function (req, res) {
    const { userName, password } = req.body;
    const checkUser = await usersDB.findUser(userName);
    if (checkUser.userName == userName && checkUser.password == password) {
        req.session.user = userName;
        res.redirect('/api/products')
    } else {
        res.render('pages/user/error/logInError')
    }
})
routerUser.get('/signup', async (req, res) => {
    res.render('pages/user/signUp');
})

routerUser.post('/signup', async function (req, res) {
    const { userName, password, email } = req.body;
    const emailLowercase = email.toLowerCase();
    if (await usersDB.findUser(userName) == 0) {
        await usersDB.creatUsers({
            userName: userName,
            password: password,
            email: emailLowercase
        })
        req.session.user = userName;
        req.session.email = emailLowercase;
        res.redirect('/api/products')
    }
    else {

        res.render('pages/user/error/signUpError')
    }
})

routerUser.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.json(err);
        } else {
            res.render('pages/user/logOut')
        }
    })
})

export default routerUser;