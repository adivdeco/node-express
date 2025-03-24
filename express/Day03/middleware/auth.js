
 const Auth = (req ,res , next)=>{

    const token = "123456";
    const Ascess = token ==="123456" ? 1:0;

    if (!Ascess) {
         res.status(401).send({message:"unauthorized"})
    }
    else{
        next();
    }}

    module.exports = {
        Auth,

    };