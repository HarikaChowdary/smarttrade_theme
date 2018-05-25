

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
function enter_status(){
var enternum = prompt("Please enter the asset id");
if(enternum != null){
var enterstat = prompt("Please enter the order status number.\n1: Auctioned\n2: Preparing\n3: Shipped\n4: Delivered\n");
    if (enterstat != null){
localStorage.setItem(enternum,enterstat);

}
}
}
function show_status(){

var os = document.getElementById("orderstatus");
var trackname = prompt("Please enter the order id");
    if ((trackname != null) && (trackname in localStorage)) {
        //alert(person);
var assetname;var seller;var price;var auction;
var aucid=parseInt(trackname);

auctionHouseContract.getAuction.call(aucid).then(function(result) {
console.log(result[3]);
console.log(result[0]);
console.log((result[10].toNumber())/1000000000000000000);

assetname= document.getElementById("assetname");
seller= document.getElementById("seller");
price= document.getElementById("price");
assetname.innerHTML=result[3];
seller.innerHTML=result[0];
price.innerHTML=((result[10].toNumber())/1000000000000000000)+"ETH";
});

	
if (os.style.display === "none") {
if(localStorage.getItem(trackname)==1){
var state1=document.getElementById("i1");
	state1.className="progtrckr-done";


}
else if(localStorage.getItem(trackname)==2){
var state1=document.getElementById("i1");
	state1.className="progtrckr-done";
var state2=document.getElementById("i2");
	state2.className="progtrckr-done";
}
else if(localStorage.getItem(trackname)==3){
var state1=document.getElementById("i1");
	state1.className="progtrckr-done";
var state2=document.getElementById("i2");
	state2.className="progtrckr-done";
var state3=document.getElementById("i3");
	state3.className="progtrckr-done";
}
else if(localStorage.getItem(trackname)==4){
var state1=document.getElementById("i1");
	state1.className="progtrckr-done";
var state2=document.getElementById("i2");
	state2.className="progtrckr-done";
var state3=document.getElementById("i3");
	state3.className="progtrckr-done";
var state4=document.getElementById("i4");
	state4.className="progtrckr-done";
}

            os.style.display = "block";
                //alert(winner);
              
            }else {
	
            os.style.display = "none";
        }
    }
else{
alert("please enter a valid asset Id");
}
 
}
function set_user_details(){
    
    var add=String(account);
    //alert(add);
   var uname = document.getElementById("uname").value;
   var email = document.getElementById("email").value;
     var cont = document.getElementById("num").value;
     var desc = document.getElementById("desc").value;
    localStorage.setItem(add, uname);
        localStorage.setItem(uname, cont);
        localStorage.setItem(cont, desc);
        localStorage.setItem(cont, email);
        alert("details entered.");// You are "+personnew.name+" at "+personnew.address);
       

}

function updateEthNetworkInfo() {
   
console.log("entered.");

	var addval= document.getElementById("address").value;
	console.log(addval);
	var convaddr=String(addval);
	

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
    
    display_details(String(account));

}
function display_details(add){
    
    var name=document.getElementById("user_name");
    var nameresult=localStorage.getItem(add)
        if(nameresult){
        name.innerHTML=nameresult;}
   
    else{
      
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



