

var accounts;
var account;
var auctions;
var stsContract;
var sampleNameContract;
var auction;
var currentBlockNumber;
var highestbidder;
var auctionId;
var winner;
var localwin;
var force;
var flag=0;
var flag2=0;
var bidPlaced = [];
var no=0;

var Mywin;
function sendMssg()
{
	Mywin = window.open("http://localhost:3000/","Mywin", "width=50,height=50");

    var closing = setTimeout(Winclose, 3000);
}
function Winclose()
{
    Mywin.close();
}


function get_owner_details(){
    var auctionId = getParameterByName("auctionId");
     var x = document.getElementById("id02");
        sampleNameContract.owner.call(auction["recordId"]).then(function(res) {
            winner=String(res);
        });
        var eth_name1={address:"0xde9e2056fa6db88a6834e88e217847811b34f5dc", name:"Rishika", imageurl:"https://secure.gravatar.com/avatar/f0083c812de138831b1b4a7f4eb6e499?s=96&d=mm&r=g.jpg",rating:3, about:"i am a Rishika"};
        var eth_name2={address:"0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5", name:"Deepika", imageurl:"https://cdn.skim.gs/image/upload/c_fill,q_auto,f_auto,fl_lossy,h_96,w_96,dpr_1.0/msi/g5gdilqeeinobwrr0stk.jpg",rating:4, about:"i am deepika"};
        var eth_name3={address:"0x68081512hdg8e220fac818ae77636f040a8179c9", name:"Chester", imageurl:"https://cdn.thewirecutter.com/wp-content/uploads/2017/08/nick-guy-migration.jpg",rating:2, about:"i am chester"};
        var eth_name4={address:"0x680815eyf6b8e220fac818ae77636f040a8179c9", name:"Phyllis", imageurl:"https://media.kasperskydaily.com/wp-content/uploads/2017/06/30074928/Alexey-Malanov_31-96x96.jpg",rating:5, about:"i am phyllis"};
        var eth_name5={address:"0x6805cv12c6b8e220fac818ae77636f040a8179c9", name:"Joe", imageurl:"https://secure.gravatar.com/avatar/f19e3dc95fc1b55f922cac18139caf21?s=96&d=mm&r=g.jpg",rating:4, about:"i am joe"};
        var eth_name6={address:"0xc89c5dfb434765f5b81a5d616410778c6688f139", name:"Harika", imageurl:"https://cdn.thewirecutter.com/wp-content/uploads/2017/08/signe-brewster-migration.jpg",rating:3, about:"i am harika"};

       
                var card_name=document.getElementById("ownername");
                var card_addr=document.getElementById("owneradd");
                var card_bid=document.getElementById("ownerbid");
                var card_rate=document.getElementById("ownername");
                var card_about=document.getElementById("about");
                var rate1=document.getElementById("sstar1");
                var rate2=document.getElementById("sstar2");
                var rate3=document.getElementById("sstar3");
                var rate4=document.getElementById("sstar4");
                var rate5=document.getElementById("sstar5");
                var image = document.getElementById("img");
                var nameresult=localStorage.getItem(winner);
                var numberresult=localStorage.getItem(nameresult);
                var descresult=localStorage.getItem(numberresult);
                var emailresult=localStorage.getItem(emailresult);
console.log(nameresult);
console.log(numberresult);
console.log(descresult);
console.log(emailresult);

                card_name.innerHTML=nameresult;
                card_about.innerHTML=descresult;
                if (winner==eth_name1.address) {
                    
                    image.src=eth_name1.imageurl;
                    
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                }
                else if (winner==eth_name2.address) {
                   
                    image.src=eth_name2.imageurl;
                    
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                    rate4.className="fa fa-star";
                } 
                else if (winner==eth_name3.address) {
                  
                    image.src=eth_name3.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    
                } 
                else if (winner==eth_name4.address) {
                  
                    image.src=eth_name4.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                    rate4.className="fa fa-star";
                    rate5.className="fa fa-star";
                }
                else if (winner==eth_name5.address) {
                  
                    image.src=eth_name5.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                    rate4.className="fa fa-star";
                }
                else if (winner==eth_name6.address) {
                    
                    image.src=eth_name6.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                }   
                else {
                    card_name.innerHTML="unknown"; 
                    card_about.innerHTML="unknown";
                }
                card_addr.innerHTML=winner;
                card_bid.innerHTML=auction["currentBid"];
            
         
        if (x.style.display === "none") {
            x.style.display = "block";
                //alert(winner);
              
            }else {
            x.style.display = "none";
        }
    
}


function refreshAuction() {
    var auctionId = getParameterByName("auctionId");
    auction = {"auctionId": auctionId};
    if(auctionId==="undefined"){
        alert("seems like this auction has been removed");
    }else{

    stsContract.getAuctionCount.call().then(function(auctionCount) {
	// console.log(auctionCount.toNumber());
	if (auctionCount.toNumber() < auctionId) {
            setStatus("Cannot find auction: " + auctionId, "error");
            throw new Error();
            //Redirect to 404 page
	}
    });

    stsContract.getStatus.call(auctionId).then(function(auctionStatus) {
	console.log("status:" + auctionStatus);
	if (auctionStatus == 0) {
            auction["status"] = "Pending";
	    //updateInfoBox(infoBoxHTMLOwnerPending);
	} else if (auctionStatus == 1) {
            auction["status"] = "Active";
	    //updateInfoBox(infoBoxHTMLActive);
	} else if (auctionStatus == 2) {
            auction["status"] = "Ended";
           flag=1;

	} else {
            alert("Unknown status: " + auctionStatus);
	}

	stsContract.getAuction.call(auctionId).then(function(result) {
            auction["seller"] = result[0];
            auction["contractAddress"] = result[1];
            auction["recordId"] = result[2];
            auction["title"] = result[3];
            auction["description"] = result[4];
            auction["blockNumberOfDeadline"] = result[5].toNumber();
            auction["distributionCut"] = result[6].toNumber();
            auction["distributionAddress"] = result[7]
            auction["startingPrice"] = result[8].toNumber();
            auction["reservePrice"] = result[9].toNumber();
            auction["currentBid"] = result[10].toNumber();
            auction["bidCount"] = result[11].toNumber();
            auction["winner"] = result[12];


            document.getElementById("productimage").src= localStorage.getItem(auction["title"]);
            
            var descon=document.getElementById("descrip");
            console.log("description is "+auction["description"]);
            descon.innerHTML=auction["description"];
            console.log("description is "+descon.innerHTML);

            sampleNameContract.owner.call(auction["recordId"]).then(function(res) {
                winner=String(res);
                var currentacc=String(account);
                console.log(currentacc+" "+winner);
                setwin(winner);
                if(flag==1){
                    
                        if(currentacc===winner){
                            var rate=document.getElementById("ratee");
                            var onlyrate=document.getElementById("onlyrate");
                            onlyrate.style.display = "none";
                            rate.style.display = "block";
        
                            var resell=document.getElementById("resell");
                            resell.style.display = "block";
        
                        
        
                        }
                    
                   // });
                }
	
	
            });
            
            var container = document.getElementById("auction_container");
            container.innerHTML = constructAuctionView(auction);
      });

    });
    
}
}
function setwin(winner){
	localwin=winner;
	localwin=localwin+"win";
	console.log("winner is "+localwin);
	var length=0;var retrievedData;var winarray;
	if(localwin in localStorage){
			console.log("entered if");
		   retrievedData = localStorage.getItem(localwin);
		winarray = JSON.parse(retrievedData);
		length=winarray.length;var i;
		console.log(winarray+" "+length);
			for(i=0;i<length;i++){
				if(winarray[i]==auction["auctionId"])
				{	console.log("found name");flag2=1;break;
				}
			}
			console.log("out of if");
			if(flag2==0){
			console.log("length is "+length);
			winarray[length]=auction["auctionId"];console.log("item is "+winarray[length]);
			 localStorage.setItem(localwin, JSON.stringify(winarray));
			console.log("item set");
			}
		
	}else{
		console.log("length is "+length);
		winarray[length]=auction["auctionId"];console.log("item is "+winarray[length]);
		 localStorage.setItem(localwin, JSON.stringify(winarray));
		console.log("item set");
	}
}



function activateAuction() {
    if (!isOwner()) {
	setStatus("Only seller can activate auction.", "error");
    }

    console.log(auction["recordId"]);
    console.log(stsContract.address);

    setStatus("Transfering ownership to the contract...", "warning");
    showSpinner();

    var assetContract = Asset.at(auction["contractAddress"]);

    assetContract.owner.call(auction["recordId"]).then(function(ownerAddress) {
	if (ownerAddress != stsContract.address) {
	    // Asset not owned by contract. First set its owner to this contract
	    assetContract.setOwner(auction["recordId"], stsContract.address, {from: account, gas: 500000}).then(function(txnId) {
        console.log("set owner transaction: " + txnId);
        
		setStatus("Ownership transfer complete!");
		hideSpinner();

		performActivation();
	    });
	} else {
	    // Asset is already owned by the contract
	    performActivation();
	}
    });
}

function performActivation() {
    //Activate the auction
    setStatus("Activating auction...", "warning");
    showSpinner();
    stsContract.activateAuction(auction["auctionId"], {from: account, gas: 500000}).then(function(txnId) {
        alert("Your auction has been activated. Please wait till we start bidding process.");
        console.log("activate auction txnId" + JSON.stringify(txnId));
	setStatus("Auction activated!");
	hideSpinner();
	refreshAuction();
    });
}

function placeBid() {
    var bid = document.getElementById("bid_value").value;
    bid = web3.toWei(bid, "ether");

    

    if (bid <= auction["currentBid"]) {
        alert("Bid has to greater than " + auction["currentBid"]/1000000000000000000+" ETH");
    
    	return;
    }
    else    
       // highestbidder=account;
       setStatus("Bid is being placed, hang tight...", "warning");
    showSpinner();

    var gas = 1400000;
    stsContract.placeBid(auction["auctionId"], {from:account, value:bid, gas: gas}).then(function(txnId) {
	console.log("Bid txnId: " + txnId[0]);
alert("Congratulations ! Your Bid has been placed. Good Luck");
hideSpinner();setStatus("");
	web3.eth.getTransactionReceipt(txnId[0], function(err, txnReceipt) {
	    if (txnReceipt.gasUsed == gas) {
		console.log("We had a failed bid " + txnReceipt);
		setStatus("Bid failed", "error");
		hideSpinner();
	    } else {
		localStorage.setItem(auction["auctionId"],1);
            alert("Congratulations ! Your Bid has been placed. Good Luck");



        console.log("We had a successful bid " + txnReceipt);
        
        setStatus("Bid succeeded!", "success");
        
        
		hideSpinner();
	    }
	});
	refreshAuction();
    });


   // sendMssg();
}

function endAuction() {
    setStatus("Ending auction...", "warning");
  showSpinner();
  //auction[status]="Ended";
  stsContract.endAuction(auction["auctionId"], {from:account, gas: 1400000}).then(function(txnId) {
    console.log("End auction txnId: " + JSON.stringify(txnId));
     localStorage.setItem(auction["auctionId"],1);
     sendMssg();

alert("The auction has ended");
        setStatus("Auction ended.");// owner is 0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5");
        sendMssg();
    hideSpinner();
    refreshAuction();
    
  });

  
}

function isOwner() {
  return auction["seller"] == account;
}

function constructAuctionView(auction) {
    $("#auctionTitle").text(auction["title"]);
    
    result = "<table class='auctionDetails'>";
    result += "<tr><td class='auctionlabel'>Status:</td><td>" + auction["status"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Seller:</td><td>" + auction["seller"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Title:</td><td>" + auction["title"] + "</td></tr>";
    //result += "<tr><td class='auctionlabel'>Description:</td><td>" + auction["description"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Current Bid:</td><td>" + web3.fromWei(auction["currentBid"], "ether") + " ETH" + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Number of Bids:</td><td>" + auction["bidCount"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Deadline Block Number:</td><td>" + auction["blockNumberOfDeadline"] + " <span id='deadlineCountdown'></span>" + "</td></tr>";

    //Activate auction button
    if (auction["status"] == "Pending" && isOwner()) {
	result += "<tr><td class='auctionLabel'></td><td><a href='#0' class='bttn' onclick='activateAuction()'' id='activation_button'>Activate Auction</a></td></tr>";
    } 

    //Place bid button
    if (auction["status"] == "Active" && currentBlockNumber <= auction["blockNumberOfDeadline"]) {
	result += "<tr><td class='auctionLabel'>Bid (in eth):</td><td><input type='text' id='bid_value' placeholder='eg 3.0' class='bidlabel'></input></td></tr>";
	result += "<tr><td class='auctionLabel'>&nbsp;</td><td><a href='#0' class='bttn' onclick='placeBid()' id='bid_button'>Place Bid</a></td></tr>";
       if(auction["seller"]==account){
            force=document.getElementById("forceend");
            force.style.display = "block";
        }

    }

    //End auction button
    if (auction["status"] == "Active" && currentBlockNumber > auction["blockNumberOfDeadline"]) {
        //sendMssg();
	if(auction["seller"]==String(account)){
	result += "<tr><td class='auctionLabel'>End Auction:</td><td><a href='#0' class='bttn' id='end_button' onclick='endAuction()'>End Auction</a></td></tr>";}
force=document.getElementById("forceend");
            force.style.display = "none";
    
    }

    result += "</table>";

                                                         


  return result;
}

function cancelAuction(){
if(confcancel()){

console.log("entered cancelling");
var id=auction["title"];
console.log("cancelling "+id);
//var nodisplay="none"

		var retrievedData = localStorage.getItem("none");
		var winarray = JSON.parse(retrievedData);
		console.log(winarray);
		var length=winarray.length;var i;console.log(winarray[length]);
		winarray[length]=id;

		localStorage.setItem("none",JSON.stringify(winarray));
		console.log("set");


}

}
function confcancel(){
return(confirm("Are you sure you want to kill the auction?"));
}


window.onload = function() {
   
        getContractAddress(function(ah_addr, sn_addr, error) {
	    if (error != null) {
	        setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
	        console.log(error);
	        throw "Cannot load contract address";
	    }

	    stsContract = Sts.at(ah_addr);
	    sampleNameContract = SampleName.at(sn_addr);

	    web3.eth.getAccounts(function(err, accs) {

	        accounts = accs;
	        account = accounts[0];
var acc=String(account);
	if(acc==localStorage.getItem('admin')){
var es=document.getElementById("enterstatus");
es.style.display = "";
}
            console.log("entered on load");
            updateEthNetworkInfo();
            console.log("entered ethnetwork");
            refreshAuction();
            console.log("entered refresh");
            updateBlockNumber();
            console.log("entered block update");

	        watchEvents();
	    });
        });
   // });
	//alert(auction["auctionId"]);

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function watchEvents() {
    var events = stsContract.allEvents();

    events.watch(function(err, msg) {
      if(err) {
          console.log("Error: " + err);
      } else { 
          console.log("Got an event: " + msg.event);
      }
        });

        var filter = web3.eth.filter("latest");
        filter.watch(function(err, block) {
      // Call get block number on every block
      updateBlockNumber();
    });
}

function updateBlockNumber() {
    web3.eth.getBlockNumber(function(err, blockNumber) {
	currentBlockNumber = blockNumber;
	console.log("Block number is : " + blockNumber);
	console.log("auction is: " + JSON.stringify(auction));

	if (auction != null) {
	    var blocksLeft = auction['blockNumberOfDeadline'] - currentBlockNumber;

	    if (blocksLeft > 0) {
		var minsLeft = blocksLeft * 12.5 / 60;  // About 12 second block times
		$("span#deadlineCountdown").text("(" + blocksLeft + " blocks, and " + minsLeft + " minutes from now)");
	    } else if (blocksLeft <= 0 && $("#bid_button").length == 1) {
            refreshAuction();
        }
	}
    });
}

