
import DExpress from "./lib/index.ts";

const app = new DExpress();

app.get("/" , function(request) {
    return Math.random();
});
app.get("/page1",function(request){
    return "Page";
});
//console.log(app.router);
app.listen("0.0.0.0", 8070);