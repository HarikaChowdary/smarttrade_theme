

var accounts;
var account;
var auctions;
var auctionHouseContract;
var sampleNameContract;
var auction;
var currentBlockNumber;
var highestbidder;
var auctionId;
var winner;
var force;
var flag=0;

//var infoBoxHTMLOwnerPending = "<p>Right now this auction is <b>pending</b>. If you're the owner you can click the activate button, which will initiate two ethereum transactions. The first will transfer ownership of your asset to the Smart Bidding System. The second will activate the auction.</p><p>Don't worry, if the auction doesn't succeed by the deadline, then ownership of your asset will be transfered back to you.</p>";

//var infoBoxHTMLActive = "<p>Right now this auction is <b>active</b>. You can place a bid, in ether, for this item if you are running <a href='http://metamask.io'>Metamask</a>. It will ask you to authorize your bid transaction, and the ether for your bid will be held by the Smart Bidding System until you either win the item, or until you are out bid. At that point your bid amount will be transfered back to you or your won item will be transfered to you by the contract.</p>";

//var infoBoxHTMLInactive = "<p>Right now this auction is either over, or was cancelled. You can not place a bid on this item at this point. Try browsing the other <a href='index.html#auctions'>currently active auctions</a>.</p>";


function get_owner_details(){
    var auctionId = getParameterByName("auctionId");
    //alert(auctionId);
    //alert(auction["recordId"]);
        var x = document.getElementById("id02");
        sampleNameContract.owner.call(auction["recordId"]).then(function(res) {
            winner=String(res);
        });
        var eth_name1={address:"0xde9e2056fa6db88a6834e88e217847811b34f5dc", name:"Rishika", imageurl:"https://secure.gravatar.com/avatar/f0083c812de138831b1b4a7f4eb6e499?s=96&d=mm&r=g.jpg",rating:3, about:"i am a Rishika"};
        var eth_name2={address:"0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5", name:"Deepika", imageurl:"https://cdn.skim.gs/image/upload/c_fill,q_auto,f_auto,fl_lossy,h_96,w_96,dpr_1.0/msi/g5gdilqeeinobwrr0stk.jpg",rating:4, about:"i am deepika"};
        var eth_name3={address:"0x68081512hdg8e220fac818ae77636f040a8179c9", name:"Chester", imageurl:"https://cdn.thewirecutter.com/wp-content/uploads/2017/08/nick-guy-migration.jpg",rating:2, about:"i am chester"};
        var eth_name4={address:"0x680815eyf6b8e220fac818ae77636f040a8179c9", name:"Phyllis", imageurl:"https://media.kasperskydaily.com/wp-content/uploads/2017/06/30074928/Alexey-Malanov_31-96x96.jpg",rating:5, about:"i am phyllis"};
        var eth_name5={address:"0x6805cv12c6b8e220fac818ae77636f040a8179c9", name:"Joe", imageurl:"https://secure.gravatar.com/avatar/f19e3dc95fc1b55f922cac18139caf21?s=96&d=mm&r=g.jpg",rating:4, about:"i am joe"};
        var eth_name6={address:"0x194b1d58488821c49ce3d61266f5d5bfdc2412cd", name:"Harika", imageurl:"https://cdn.thewirecutter.com/wp-content/uploads/2017/08/signe-brewster-migration.jpg",rating:3, about:"i am harika"};

       
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
                if (winner==eth_name1.address) {
                    card_name.innerHTML=eth_name1.name;
                    image.src=eth_name1.imageurl;
                    card_about.innerHTML=eth_name1.about;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                }
                else if (winner==eth_name2.address) {
                    card_name.innerHTML=eth_name2.name;
                    image.src=eth_name2.imageurl;
                    card_about.innerHTML=eth_name2.about;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                    rate4.className="fa fa-star";
                } 
                else if (winner==eth_name3.address) {
                    card_name.innerHTML=eth_name3.name;
                    card_about.innerHTML=eth_name3.about;
                    image.src=eth_name3.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    
                } 
                else if (winner==eth_name4.address) {
                    card_name.innerHTML=eth_name4.name;
                    card_about.innerHTML=eth_name4.about;
                    image.src=eth_name4.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                    rate4.className="fa fa-star";
                    rate5.className="fa fa-star";
                }
                else if (winner==eth_name5.address) {
                    card_name.innerHTML=eth_name5.name;
                    card_about.innerHTML=eth_name5.about;
                    image.src=eth_name5.imageurl;
                    rate1.className="fa fa-star";
                    rate2.className="fa fa-star";
                    rate3.className="fa fa-star";
                    rate4.className="fa fa-star";
                }
                else if (winner==eth_name6.address) {
                    card_name.innerHTML=eth_name6.name;
                    card_about.innerHTML=eth_name6.about;
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

    auctionHouseContract.getAuctionCount.call().then(function(auctionCount) {
	// console.log(auctionCount.toNumber());
	if (auctionCount.toNumber() < auctionId) {
            setStatus("Cannot find auction: " + auctionId, "error");
            throw new Error();
            //Redirect to 404 page
	}
    });

    auctionHouseContract.getStatus.call(auctionId).then(function(auctionStatus) {
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
  	    //updateInfoBox(infoBoxHTMLInactive);
	} else {
            alert("Unknown status: " + auctionStatus);
	}

	auctionHouseContract.getAuction.call(auctionId).then(function(result) {
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


            document.getElementById("productimage").src= "https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg";
            //var prodimage=document.getElementById("productimage");
            //prodimage=url("https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg");
            var descon=document.getElementById("descrip");
            console.log("description is "+auction["description"]);
            descon.innerHTML=auction["description"];
            console.log("description is "+descon.innerHTML);

            sampleNameContract.owner.call(auction["recordId"]).then(function(res) {
                winner=String(res);
                var currentacc=String(account);
                console.log(currentacc+" "+winner);
                
                if(flag==1){
                    //sampleNameContract.owner.call(auction["recordId"]).then(function(res) {
                        //winner=String(res);
                        //var currentacc=String(account);
                        //console.log(currentacc+" "+winner);
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
            
            
            
            //var container = document.getElementById("auction_container");
            
            var container = document.getElementById("auction_container");
            container.innerHTML = constructAuctionView(auction);
      });

    });
    
}
}



function activateAuction() {
    if (!isOwner()) {
	setStatus("Only seller can activate auction.", "error");
    }

    //Transfer ownership to the contract
    // var sn = SampleName.deployed();
    console.log(auction["recordId"]);
    console.log(auctionHouseContract.address);

    setStatus("Transfering ownership to the contract...", "warning");
    showSpinner();

    var assetContract = Asset.at(auction["contractAddress"]);

    assetContract.owner.call(auction["recordId"]).then(function(ownerAddress) {
	if (ownerAddress != auctionHouseContract.address) {
	    // Asset not owned by contract. First set its owner to this contract
	    assetContract.setOwner(auction["recordId"], auctionHouseContract.address, {from: account, gas: 500000}).then(function(txnId) {
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
    auctionHouseContract.activateAuction(auction["auctionId"], {from: account, gas: 500000}).then(function(txnId) {
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

    

    if (bid < auction["currentBid"]) {
        alert("Bid has to be at least " + auction["currentBid"]/1000000000000000000);
    
    	return;
    }
    else    
       // highestbidder=account;
       setStatus("Bid is being placed, hang tight...", "warning");
    showSpinner();

    var gas = 1400000;
    auctionHouseContract.placeBid(auction["auctionId"], {from:account, value:bid, gas: gas}).then(function(txnId) {
	console.log("Bid txnId: " + txnId[0]);
	web3.eth.getTransactionReceipt(txnId[0], function(err, txnReceipt) {
	    if (txnReceipt.gasUsed == gas) {
		console.log("We had a failed bid " + txnReceipt);
		setStatus("Bid failed", "error");
		hideSpinner();
	    } else {
            alert("Congratulations ! Your Bid has been placed. Good Luck");
		console.log("We had a successful bid " + txnReceipt);
        setStatus("Bid succeeded!", "success");
        
        
		hideSpinner();
	    }
	});
	refreshAuction();
    });
}

function endAuction() {
    setStatus("Ending auction...", "warning");
  showSpinner();
  //auction[status]="Ended";
  auctionHouseContract.endAuction(auction["auctionId"], {from:account, gas: 1400000}).then(function(txnId) {
    console.log("End auction txnId: " + JSON.stringify(txnId));
    alert("The auction has ended");
   // var newData = JSON.stringify(txnId);
    /*var bidstring =  JSON.parse(newData);
    for(var i=0; i<bidstring.length; i++){
         highestbidder = bidstring[i]['winningBidder'];
         console.log(highestbidder);
    }*/

    //var sender="xyz";//web3.eth.getAccounts(accounts=>console.log(accounts[0]));
    //const truffleContract = require("truffle-contract");

   /* assetContract.setOwner(auction["recordId"], auctionHouseContract.address, {from: account, gas: 500000}).then(function(txnId) {
		console.log("set owner transaction: " + txnId);
        setStatus("Ownership transfer complete!");}); */
      /*  highestbidder = newData['logs'];//[0]['args']['winningBidder'];
        setStatus("Auction ended. owner is "+highestbidder);*/
       // indx = JSON.stringify(txnId).indexOf("winningBidder");
        //setStatus("Auction ended. owner is " + JSON.stringify(txnId).substr(indx+14, indx+42));
        setStatus("Auction ended.");// owner is 0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5");

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
	result += "<tr><td class='auctionLabel'></td><td><a href='#0' class='bttn' onclick='endAuction()' id='end_button'>End Auction</a></td></tr>";
    force=document.getElementById("forceend");
    force.style.display = "none";
    }

    result += "</table>";

                                                         


  return result;
}


window.onload = function() {
   // $("#header").load("header.html");
   // $("#right-column").load("rightPanel.html", function() {
	//updateInfoBox(infoBoxHTMLOwnerPending);

        getContractAddress(function(ah_addr, sn_addr, error) {
	    if (error != null) {
	        setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
	        console.log(error);
	        throw "Cannot load contract address";
	    }

	    auctionHouseContract = AuctionHouse.at(ah_addr);
	    sampleNameContract = SampleName.at(sn_addr);

	    web3.eth.getAccounts(function(err, accs) {

	        accounts = accs;
	        account = accounts[0];
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
    var events = auctionHouseContract.allEvents();

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
