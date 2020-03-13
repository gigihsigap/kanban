"use strict"

const {Task} = require('../models')

class Controller {

    static getAllTask(req, res, next) {
        let option = { where: {UserId: req.userData.id} }
        Task.findAll(option)
        .then(data => res.status(200).json(data))
        .catch(next)
    }

    static addTask(req, res, next) {
        let obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            status: req.body.status,
            deadline: req.body.deadline,
            UserId: req.userData.id
        }
        Task.create(obj)
        .then(data => res.status(201).json(data))
        .catch(next)
    }

    static getOneTask(req,res,next){
        let id = req.params.id
        Task.findOne({ where: { id: id } })
        .then(result=>{
            if(result){
                res.status(200).json(result)
            } else{
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static editTask(req, res, next) {
        let id = req.params.id
        let option = { where: { id: id } }
        let obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            status: req.body.status,
            deadline: req.body.deadline,
            UserId: req.userData.id
        }

        Task.update(obj, option)
        .then(success => {
            if (success[0]) {
                res.status(200).json(obj)
            } else {
                throw {status: 404, message: 'Data not found!'}
            }    
        })
        .catch(err => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(500)
            }
        })
    }

    static deleteTask(req, res, next) {
        console.log('Delete time!')
        let id = req.params.id
        let option = { where: { id: id } }

        Task.findOne(option)
        .then(task => {
            if (task) {
                console.log('Delete aaaaaaa!')
                Task.destroy(option)
                .then(() => res.status(200).json(task))
                .catch(err => next(err))
            } else {
                throw {status: 404, message: 'Data not found!'}
            }
        })
        .catch(next)
    }
}

module.exports = Controller