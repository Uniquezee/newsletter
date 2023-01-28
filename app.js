//jshint esversion:6
// used to hide your api or any secret that you don't want them to see on git. MediaKeySession, dotenv is a
require("dotenv").config();
const express = require("express");
// const https = require("https")
// const bodyParser = require("body-parser")
// const request = require("request");
// const { append } = require("express/lib/response");
// const res = require("express/lib/response");
const port = 3006
const app = express();
const sheetdb = require("sheetdb-node");
const client = sheetdb({ address: process.env.SHEETDBAPI });
//const mailchimp = require("@mailchimp/mailchimp_marketing");
// const { post } = require("request");

//mailchimp.setConfig({
// apiKey: "69be50a207548a1ed887360f9897ac00-us7",
//server: "us7",
//});


app.use(express.urlencoded({ extended: true }))
app.use(express.static("Public"))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // client.create({firstName: firstName, lastName:lastName, email: email}).then(function(data){
    //     console.log(data);
    // })
    client.read({ search: { firstName: firstName, lastName: lastName, email: email } }).then(function (info) {
        var convert = JSON.parse(info)
        console.log(convert)
        console.log(convert.length)
        if (convert.length == 0) {
        //    if(convert[0].firstName == firstName && convert[0].lastName == lastName && convert[0].email == email){
        //     res.sendFile(__dirname + "/failure.html")
            //    user does not exist
            client.create({ firstName: firstName, lastName: lastName, email: email }).then(function (data) {
                const success = JSON.parse(data)
                console.log(success)
                if (success.created === 1){
                 res.sendFile(__dirname + "/success.html")
             }
                else{ "Try again Soon!!!"}
                console.log(data);
            })
        } else if(convert.length == 0 && convert[0].email == email){
            res.send("email exists!!!")
        }
        else { 
            res.sendFile(__dirname + "/failure.html")
        }
        // client.create({firstName: firstName, lastName:lastName, email: email}).then(function(data){
        //     console.log(data);
        // })
    })

    //const listId = "734e8f166a";
    // const data= {
    // members:[
    // {
    // email_address: email,
    // status: "subscribed",
    // merge_fields: {
    // FNAME: firstName,
    // LNAME: lastName
    // }
    // }
    // ] 
    // }
    // const jsonData = JSON.stringify(data);

    // const url = "https://us7.api.mailchimp.com/3/0/lists/734e8f166a"

    // const options = {
    // method: "POST",
    // auth: "amarachi1:69be50a207548a1ed887360f9897ac00-us7 "
    // }
    // const request = https.request(url, options, function (response) {
    // response.on("data", function (data) {
    // console.log(JSON.parse(data));
    // })
    // })

    // request.write(jsonData);
    // request.end();



    //async function run(){
    //  const response = await mailchimp.lists.addListMember(listId, {
    //    email_address: subscribingUser.email,
    //  status: "subscribed",
    //merge_fields: {
    // FNAME: subscribingUser.firstName,
    //LNAME: subscribingUser.lastName
    //}
    //});
    //console.log(`Successfully added contact as an audience member. The contact's id is ${response.id} `)
    //}
    //run()
    //res.send(`${firstName} is compatible with ${lastName} and also ${email}`)
})

//69be50a207548a1ed887360f9897ac00-us7
// af7884ed86





app.listen(port, function () {
    console.log(`Server is running on ${port}`)
})

