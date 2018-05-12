var accounts;
var account;
var auctions;
var currentBlockNumber;
var auctionHouseContract;
var sampleNameContract;
var person1,person2,person3;
var status=0;
var personnew={address:"undefined", name:"undefined", contact:"undefined"};

function setStatus(message, category) {
    var status = document.getElementById("statusMessage");
    status.innerHTML = message;

    var panel = $("#statusPanel");
    panel.removeClass("panel-warning");
    panel.removeClass("panel-danger");
    panel.removeClass("panel-success");

    if (category === "warning") {
	panel.addClass("panel-warning");
    } else if (category === "error") {
	panel.addClass("panel-danger");
    } else {
	panel.addClass("panel-success");
    }    
}
function set_user_details(){
    //alert("hello");
    var person1 = {address:"0xdg4657647584", name:"john", contact:6547563446};
    var person2 = {address:"0x194b1d58488821c49ce3d61266f5d5bfdc2412cd",name:"harika",contact:84738753487};
    var person3 = {address:"0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5",name:"Deepika",contact:8362549372};
    var person4 = {address:"0xde9e2056fa6db88a6834e88e217847811b34f5dc",name:"Rishika",contact:8362549372};

    //var address = document.getElementById("address");
    //address.innerHTML = account;
    var add=String(account);
    //alert(add);
   var uname = document.getElementById("name").value;
     var cont = document.getElementById("num").value;
    //alert(cont);
   /* if(add == person1.address)  {
        var name=document.getElementById("user_name");
        name=add;
    }
    else if(add == person2.address){
        var name=document.getElementById("user_name");
        name=add;
    }
    else{*/
        //alert("entering");
//status=1;
        var personnew = {address:address, name:uname, contact:cont};
        alert("details entered. You are "+personnew.name+" at "+personnew.address);
        var name=document.getElementById("user_name");
        name.innerHTML=personnew.name;
       // var ethad=document.getElementById("ethadd");
        //ethad.innerHTML=add;
    //}
    alert("done");
//updateEthNetworkInfo()

}

function updateEthNetworkInfo() {
   /* 
   */

    var address = document.getElementById("address");
    address.innerHTML = account;

    var ethBalance = document.getElementById("ethBalance");
    web3.eth.getBalance(account, function(err, bal) {
	ethBalance.innerHTML = web3.fromWei(bal, "ether") + " ETH";
    });

    var withdrawBalance = document.getElementById("withdrawBalance");

    if (typeof auctionHouseContract != 'undefined' && typeof account != 'undefined') {
        web3.eth.getBalance(auctionHouseContract.address, function(err, bal) {
            console.log("contract balance: " + bal);
        });
        

        auctionHouseContract.getRefundValue.call({from:account}).then(function(refundBalance) {
            var balance = web3.fromWei(refundBalance, "ether");
            withdrawBalance.innerHTML = web3.fromWei(refundBalance, "ether") + " ETH";
            if (balance == 0) {
                $("#withdrawButton").hide();
            } else {
                $("#withdrawButton").show();
            }
        });
    } else {
        $("#withdrawButton").hide();
    }

    var network = document.getElementById("network");
    var provider = web3.version.getNetwork(function(err, net) {
	var networkDisplay;

	if(net == 1) {
	    networkDisplay = "Ethereum MainNet";
	} else if (net == 2) {
	    networkDisplay = "Morden TestNet";
        } else if (net == 3) {
            networkDisplay = "Ropsten TestNet";
	} else {
	    networkDisplay = net;
	}
	    
	network.innerHTML = networkDisplay;
    });
    //alert(String(account));    
    //updateAuctions();
    display_details(String(account));
}
function display_details(add){
    //alert("entering");
    person1 = {address:"0xdg4657647584", name:"john", contact:6547563446};
    person2 = {address:"0x194b1d58488821c49ce3d61266f5d5bfdc2412cd",name:"Harika",contact:8473875348};
    person3 = {address:"0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5",name:"Deepika",contact:8362549372};
    person4 = {address:"0xde9e2056fa6db88a6834e88e217847811b34f5dc",name:"Rishika",contact:8362549372};

    //alert("accessing address");
   ////var add = document.getElementById("address");
    //address.innerHTML = acc;
    //var add=String(acc);
    //alert(add);
    var name=document.getElementById("user_name");
    if(add==person1.address){
        //var personnew = {address:add, name:uname, contact:cont};
        //alert("details entered. You are "+personnew.name+" at "+personnew.address);
        name.innerHTML=person1.name;
        
    }
    else if(add==person2.address){
        name.innerHTML=person2.name;
       
    }
    else if(add==person3.address){
        name.innerHTML=person3.name;
       
    }
    else if(add==person4.address){
        name.innerHTML=person4.name;
       
    }
    else{
        var name=document.getElementById("user_name");
        name.innerHTML=personnew.name;
        var ethad=document.getElementById("ethadd");
        
    alert("Looks like you are a new user ! Your address "+add+"is not yet authenticated. Please enter your details in the status section");
    }
}

function withdraw() {
    if (typeof auctionHouseContract != 'undefined' && typeof account != 'undefined') {
        setStatus("Withdrawing fund...", "warning"); 
        showSpinner();

        auctionHouseContract.withdrawRefund({from:account, gas:500000}).then(function(txId) {
            alert("Hey Congratulations ! Your amount has been withdrawn");
            setStatus("Withdraw finished."); 
            hideSpinner();
            updateEthNetworkInfo();
        })
    }
}

function updateInfoBox(html) {
    var infoBox = document.getElementById("infoPanelText");
    infoBox.innerHTML = html;
    
}

function hideSpinner() {
    $("#spinner").hide();
}

function showSpinner() {
    $("#spinner").show();
}



