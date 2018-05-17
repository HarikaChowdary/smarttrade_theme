

var accounts;
var account;
var auctions;
var currentBlockNumber;
var auctionHouseContract;
var sampleNameContract;
var auction;
var id;
var flag2=0;

//var infoBoxHTMLCreate = "<p>Here's where you can create an auction to auction off any on-chain item you own that conforms to the <a href='https://testnet.etherscan.io/address/0x7ac337474ca82e0f324fbbe8493f175e0f681188#code'>Asset contract</a>. Since this is a prototype and very few contracts adhere to this, you have the chance to register a 'name' that does, so you can create a test auction. First register any name, such as myname.address, and when that transaction confirms, create an auction for that same name.</p><p>After successful auction creation, you can visit the page for that auction to activate it.</p>";

function updateAuctions() {
    var auctionSection = document.getElementById("userAuctions");
    
    var res = "";

	var url = ["https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/164697/pexels-photo-164697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/408518/pexels-photo-408518.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/236133/pexels-photo-236133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/846357/pexels-photo-846357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/595809/pexels-photo-595809.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/275065/pexels-photo-275065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/460643/pexels-photo-460643.png?auto=compress&cs=tinysrgb&h=350",
 			"https://images.pexels.com/photos/846357/pexels-photo-846357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/595809/pexels-photo-595809.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/247932/pexels-photo-247932.jpeg?auto=compress&cs=tinysrgb&h=350",
                        "https://images.pexels.com/photos/275065/pexels-photo-275065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                        "https://images.pexels.com/photos/460643/pexels-photo-460643.png?auto=compress&cs=tinysrgb&h=350"];
 var k=0;
    auctionHouseContract.getAuctionsCountForUser.call(account).then(function(count) {
	console.log("User has this many auctions " + count);
	for (var i = 0; i < count; i ++) {


		







	    auctionHouseContract.getAuctionIdForUserAndIdx.call(account, i).then(function(idx) {
		auctionHouseContract.getAuction.call(idx).then(function(auc) {
		    console.log("Found an auction: " + auc[3]);

		var retrievedData = localStorage.getItem("none");
		var winarray = JSON.parse(retrievedData);
		var length=winarray.length;var i;
		//console.log(winarray+" "+length);
		flag2=0;
			for(i=0;i<length;i++){
				if(winarray[i]==auc[3])
				{	console.log("found name");flag2=1;break;
				}
			}
		if(flag2==0){



		    var bidAmount = web3.fromWei(auc[10], "ether");
			//res = res + "<a href='auction.html?auctionId=" + auc[12] + "'><img src=" + url[k++] + "height='350' width='300' class='img-rounded img-center'></a>" + "<br>";
			/*res = res + "<tr font-size='30px'>";
			res = res + "<td align='center'><img src=" + url[k++] + "height='350' width='300' class='img-rounded img-center'><br>";
			res = res + "<a href='auction.html?auctionId=" + idx + "'>" + auc[3] + "</a><br>" 
			res = res + bidAmount + "ETH </td>" ;
			res = res + "</tr>";
			if(k>=9){k=0;}*/
if(!(auc[3] in localStorage)){ 
			localStorage.setItem(auc[3],url[k]);}
			res  = res + "<div class='w3-row-padding' align='center'>";
                res = res + "<a href='auction.html?auctionId=" + idx + "'><img src=" + localStorage.getItem(auc[3]) + "height='350' width='300' class='img-rounded img-center'></a>" + "<br>";
                res = res + "<a href='auction.html?auctionId=" + idx + "'>" + auc[3] + "</a> : ";
                res = res + bidAmount + "ETH";
               // if(k>=9){k=0;}
             
                res = res + "</div>";
               
			k++;
			
			auctionSection.innerHTML = res;

}
		});
	    });


	}



	
    }); 








setwin2();






}
function setwin2(){

	var auctionSection2 = document.getElementById("userAuctions2");
	    var res2 = "";
	var winid=String(account);
	winid=winid+"win";var k=0;
	if(winid in localStorage){
		var retrievedData = localStorage.getItem(winid);
		var winarray = JSON.parse(retrievedData);
		var length=winarray.length;
		console.log(length);
		for(var i=0;i<length;i++){
			var id=winarray[i];
			auctionHouseContract.getAuction.call(id).then(function(result) {
			console.log(winid);
			var retrievedData = localStorage.getItem(winid);
			var winarray = JSON.parse(retrievedData);
			
			  
			id=winarray[k];console.log(id);
			var ur= localStorage.getItem(result[3]);console.log(ur);



var retrievedData2 = localStorage.getItem("none");
		var winarray2 = JSON.parse(retrievedData2);
		var length2=winarray2.length;var j;var flag2=0;
		//console.log(winarray+" "+length);
			for(j=0;j<length2;j++){
				if(winarray2[j]==result[3])
				{	console.log("found name");flag2=1;break;
				}
			}
		if(flag2==0){




			
			res2  = res2 + "<div class='w3-row-padding' align='center'>";
			res2 = res2 + "<p>Auction Id: "+id+"</p>";
                res2 = res2 + "<a href='auction.html?auctionId=" + id + "'><img src=" + ur+ "height='350' width='300' class='img-rounded img-center'></a>" + "<br>";
		
                res2 = res2 + "" + result[3] + "";
               
                res2 = res2 + "</div>";
               
			//k++;
			
			auctionSection2.innerHTML = res2;
				console.log(id);k++;}
			});		
		}
	}
	//var length=localStorage.getItem(winid).length;

}
/*var winid=String(account)+"win";
	//var length=winid.length;
	if(winid in localStorage){
		var retrievedData = localStorage.getItem(winid);
		var winarray = JSON.parse(retrievedData);
		var length=winarray.length;
		console.log(length);var i=0;
		while(i<length){
			id=winarray[i];console.log(id);
			res2  = res2 + "<div class='w3-row-padding' align='center'>";
			res2 = res2 + "<p>Auction Id: "+id+"</p>";
			auctionHouseContract.getAuction.call(id).then(function(result) {
/*
			console.log(i);
                res2 = res2 + "<a href='auction.html?auctionId=" + id + "'><img src=" + localStorage.getItem(result[3]) + "height='350' width='300' class='img-rounded img-center'></a>" + "<br>";
		
                res2 = res2 + "" + result[3] + "";
               
                res2 = res2 + "</div>";
               
			//k++;
			
			auctionSection2.innerHTML = res2;
		});
}
	       
}



}*/

function createAsset() {
    var recordId = document.getElementById("nameToReserve").value;

    setStatus("Initiating transaction... (please wait)", "warning");
  showSpinner();

  sampleNameContract.addRecord(recordId, account, recordId, account, {from: account}).then(function(txnId) {
      console.log("Transaction id is : " + JSON.stringify(txnId));
      hideSpinner();

      sampleNameContract.owner.call(recordId).then(function(res) {
	  if (res === account) {
		alert("Congratulations ! Asset has been successfully registered. Proceed to enter the asset details in create auction section.");
	      setStatus("You are the proud owner of the name: " + recordId);
	  } else {
		alert("OOps ! It looks like the owner of that name is: " + res);
	      setStatus("It looks like the owner of that name is: " + res, "error");
	  }
      });
  }).catch(function(e) {
    console.log(e);
      setStatus("Error registering name. See log.", "error");
    hideSpinner();
  });
};

function createAuction() {
	var deadtime = parseInt(document.getElementById("deadline").value) ;
	if(check(deadtime)){
    var marketer = "0x8F9def924026c13766A4B3BA9658279F1f75D8e6";

	alert("Initiating auction. Please wait till it is initialised. We are sorry to make you wait. ")
    setStatus("Initiating auction, please wait.", "warning");
    showSpinner();

    var recordId = document.getElementById("nameToAuction").value;
    var contractAddress = document.getElementById("contractAddress").value;
    var assetInstanceContract = Asset.at(contractAddress);
    var description = document.getElementById("description").value;
    assetInstanceContract.owner.call(recordId).then(function(res) {
	if (!(res === account)) {
	    setStatus("Looks like you don't own that asset", "error");
	    hideSpinner();
	    return;
	}
	

	var startingPrice = web3.toWei(parseFloat(document.getElementById("startingPrice").value), "ether");
	var reservePrice = web3.toWei(parseFloat(document.getElementById("reservePrice").value), "ether");
	var deadtime = parseInt(document.getElementById("deadline").value) ;
	var description = document.getElementById("description").value;
	var convtime= (deadtime * 7)+10;  
	var deadline = currentBlockNumber + convtime;//parseInt(document.getElementById("deadline").value);
	console.log("Setting deadline to " + deadline + " and current block num is " + currentBlockNumber);
	console.log("Prices, starting/reserve " + startingPrice + "/" + reservePrice);
	console.log("Marketer is: " + marketer);
    console.log("Description is :" + description);
	auctionHouseContract.createAuction(recordId,
			 description,
			 contractAddress,
			 recordId,
			 deadline,
			 startingPrice,
			 reservePrice,
			 5,
			 marketer,
			 {from: account, gas:500000}).then(function(txId) {
				alert("Congratulations ! The auction has been created. Proceed to the list of Auctions to check the progress of your Auction.");hideSpinner();
          web3.eth.getTransactionReceipt(txId, function(error, receipt) {
            if (receipt["gasUsed"] == 500000) {
              setStatus("Auction creation failed", "error");
              hideSpinner();
            } else {
              setStatus("Auction created in transaction: " + txId);
              hideSpinner();
              updateAuctions();
            }

          });
			 });
	});
	}
	
}

function check(deadline){
	return(confirm("Are you sure you want to create the auction for "+deadline+" minutes? Once created, It cant be undone."));
}
window.onload = function() {
	console.log("entered onload");
    //$("#right-column").load("rightPanel.html", function() {
	//updateInfoBox(infoBoxHTMLCreate);
		console.log("entered load function");
        getContractAddress(function(ah_addr, sn_addr, error) {
	    if (error != null) {
	        setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
	        console.log(error);
	        throw "Cannot load contract address.";
	    }

	    auctionHouseContract = AuctionHouse.at(ah_addr);
	    sampleNameContract = SampleName.at(sn_addr);

	    // Set the value of contract address field to the sampleName contract
	    $("#contractAddress").val(sn_addr);

	    web3.eth.getAccounts(function(err, accs) {
	        if (err != null) {
		    alert("There was an error fetching your accounts.");
		    return;
	        }

	        if (accs.length == 0) {
		    alert("Please Login/Register in your Metamask account before you continue with Smart Trading.");
		    return;
	        }

 	        accounts = accs;
			 account = accounts[0];
var acc=String(account);
	if(acc==localStorage.getItem('admin')){
var es=document.getElementById("enterstatus");
es.style.display = "";
}
			 console.log("reached onload function");
			 updateEthNetworkInfo();
			 console.log("reached networkinfo function");
			 updateAuctions();
			 console.log("reached updateauc function");
			 updateBlockNumber();
			 console.log("reached blocknum function");
			 watchEvents();
	    });
        });
   //});
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
	console.log("Current block number is: " + blockNumber);
	
    });
}
