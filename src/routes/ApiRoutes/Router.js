import { Router } from "express";

export default class ApiRouter {

    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter(){
        return this.router;
    }

    init(){}

    applyCallbacks(callbacks){
        return callbacks.map((callback) => async(...params) => {
            try {
                const [ req, res, next] = params;
                await callback(req, res, next)

            } catch (error) {
                console.log(error);
                params[1].status(500).json({
                    status: "Error",
                    msg: "Error del servidor"
                })
            }
        })
    }



    get(path, ...callbacks){
        this.router.get(path, this.applyCallbacks(callbacks))
    }

    post(){

    }

    put(){

    }

    delete(){

    }
}