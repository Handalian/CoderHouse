import express from "express";
import session from 'express-session';
const routerLogin = express.Router();

routerLogin.get('/login', async (req, res) => {
    if (req.query.user) {
        req.session.user = req.query.user;
        req.session.admin = true;
        res.redirect('/api/products')
    } else {
        res.render('pages/vistaLogin')
    }
})

routerLogin.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.json(err);
        } else {
            res.render('pages/vistaLogout')
        }
    })
})

export default routerLogin;