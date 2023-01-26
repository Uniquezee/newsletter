//jshint esversion:6
const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const request = require("request");
const { append } = require("express/lib/response");
const res = require("express/lib/response");
const port = 3006
const app = express();
const sheetdb = require("sheetdb-node");
const client = sheetdb({ address: 'g1g8uhhk2jrln' });
//const mailchimp = require("@mailchimp/mailchimp_marketing");
const { post } = require("request");

//mailchimp.setConfig({
// apiKey: "69be50a207548a1ed887360f9897ac00-us7",
//server: "us7",
//});


app.use(bodyParser.urlencoded({ extended: true }))
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
        if (convert.length == 0) {
            console.log("User does not exist")
            client.create({ firstName: firstName, lastName: lastName, email: email }).then(function (data) {
                // var success = JSON.parse(data)
                // if (success === {"created":1}/201){
                //     res.send(__dirname + "/success.html")
                // }
                // else{"Please, try again!"}
                console.log(data);
            })
        } else { console.log('User Exists') }
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

