// @ts-ignore
import {  listenAndServe } from "./lib/http.ts";
export class DExpress {
    router: any;
    constructor() {
        this.router = [];
    }

    match(router, url, method) {
        for(let obj of router) {
            if(obj['url'] === url && obj['method'] === method.toUpperCase()) {
                return obj['fn'];
            }
        }
    }

    get(endpoint, callback) {
        const routeObj = {
            'url': endpoint,
            'fn': function(req: any) {
                return  callback(req);
            },
            "method": "GET"
        };
        this.router.push(routeObj);
    }

    post(endpoint, callback) {
        const routeObj = {
            'url': endpoint,
            'fn': function(req: any) {
                return  callback(req);
            },
            'method': "POST"
        };
        this.router.push(routeObj);
    }

    listen(addr:string , port?: number): void {
        const that = this;
        let url: any;
        if(port === undefined) {
            url = addr +":8080";
        }
        else{
            url = addr+":"+port;
        }
        // @ts-ignore
        listenAndServe(url, async function (request) {
            const callback =  that.match(that.router , request.url , request.method);
            if(callback) {
                const data = callback(request);
                const res= data?data: "";
                request.respond({ body: new TextEncoder().encode(String(res))});
            }
            else {
                request.respond({ body: new TextEncoder().encode("Error 404")});
            }
        });
    }
}

export default  DExpress;