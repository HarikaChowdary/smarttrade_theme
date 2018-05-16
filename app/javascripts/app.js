var accounts; 
var account;
var auctions;
var auctionHouseContract;
var aucs = [];

function getAuction(auctionId) {
    auctionHouseContract.getAuction.call(auctionId).then(function(auction) {
        console.log("loading: " + auctionId);
        auction[12] = auctionId;
        aucs.push(auction);
    });
}

function waitAndRefresh(count) {
    var k = 0;
    if (aucs.length < count) {
        console.log("sleeping");
        setTimeout(waitAndRefresh, 500, count);
    } else {
        var auctionSection = document.getElementById("userAuctions");
        var res = "";
        for (var j = 0; j < count; j++) {
            var auc = aucs[j];
            
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
          
            
            if (parseInt(auc[5]) > currentBlockNumber) {
                //res = res + "<tr>";
                /*res = res + "<td><a href='auction.html?auctionId=" + auc[12] + "'>" + auc[3] + "</a></td>";
                res = res + "<td>" + web3.fromWei(auc[10], "ether") + " ETH" + "</td>";
                res = res + "<td>" + auc[11] + "</td>";
                res = res + "<td>" + auc[5] + "</td>";
                //res = res + "<td><img src='https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&h=350' height='150' width='250'></td>";
                res = res + "<td><img src=" + url[k] + "height='150' width='250' class='img-rounded img-center'></td>";
                k++;
                if(k>=3){k=0;}*/

if (!(auc[3] in localStorage))
{
 localStorage.setItem(auc[3],url[k]);
//console.log("set value");
}
//console.log(auc[3]);
//console.log(localStorage.getitem(auc[3]));
                res  = res + "<div class='w3-row-padding' align='center'>";
                res = res + "<a href='auction.html?auctionId=" + auc[12] + "'><img src=" + localStorage.getItem(auc[3]) + "height='350' width='300' class='img-rounded img-center'></a>" + "<br>";
                res = res + "<a href='auction.html?auctionId=" + auc[12] + "'>" + "Product  : " +  auc[3] + "</a><br>";
                res = res +  "Highest Bid    : " +  web3.fromWei(auc[10], "ether") + " ETH" + "<br>";
                res = res +   "Number of bids    : " +  auc[11] + "<br>";
                res = res +  "Time Left  : " +  auc[5] + "<br>";
               // res = res + "<div class='rating'><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span></div>";
               // if(k>=9){k=0;}
             
                res = res + "</div>";
               k++;

            }
        }
        console.log("Refreshing auctions!");
        auctionSection.innerHTML = res;
        setStatus("");
    }
}

function updateAuctions() {

    //alert("We are sorry to make you wait. Please wait till the auctions are being fetched.");
    setStatus("Auctions being fetched...", "warning");

    auctionHouseContract.getAuctionCount.call().then(function(count) {
    	console.log("Contract has this many auctions " + count);

    	if (count <= 0) {
            alert("Oops ! No auctions have been found.");
    	    setStatus("No auctions found", "error");
    	}

    	var aucs = [];
    	
    	for (var i = 0; i < count; i++) {
            getAuction(i);
    	}

        waitAndRefresh(count);
    });    
}

window.onload = function() {


	
    if (localStorage) {
	
	//alert(acc);
        // LocalStorage is supported!
        //localStorage.setItem('admin', '0xc89c5dfb434765f5b81a5d616410778c6688f139');
      // var name = localStorage.getItem('name');
   /* localStorage.setItem('0x194b1d58488821c49ce3d61266f5d5bfdc2412cd', 'Harika');
    localStorage.setItem('0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5', 'Deepika');
    localStorage.setItem('0xde9e2056fa6db88a6834e88e217847811b34f5dc', 'Rishika');
    localStorage.setItem('Harika', 8883957284);
    localStorage.setItem('Deepika', 9608476538);
    localStorage.setItem('Rishika', 4679038756);
    localStorage.setItem(8883957284, 'I am Harika');
    localStorage.setItem(9608476538, 'I am Deepika');
    localStorage.setItem(4679038756, 'I am Rishika');
    localStorage.setItem('I am Harika', 'hk@g.com');
    localStorage.setItem('I am Deepika', 'ds@g.com');
    localStorage.setItem('I am Rishika', 'ra@g.com');*/
    /*alert(localStorage.getItem('0x194b1d58488821c49ce3d61266f5d5bfdc2412cd'));
    alert(localStorage.getItem('Harika'));
    alert(localStorage.getItem('8883957284'));
    alert(localStorage.getItem('0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5'));*/

    
       // alert(name);
      } else {
       // alert("hey local storage is not supported.");
        // No support. Use a fallback such as browser cookies or store on the server.
      }
    getContractAddress(function(ah_addr, sn_addr, error) {
        if (error != null) {
            setStatus("Cannot find network. Please run an ethereum node or use Metamask.", "error");
            console.log(error);
            throw "Cannot load contract address";
        }

        auctionHouseContract = AuctionHouse.at(ah_addr);

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
		alert("There was an error fetching your accounts.");
		return;
            }
if (accs.length == 0) {
		    alert("Please Login/Register in your Metamask account before you continue with Smart Trading.");
		   // return;
	        }
	

	    accounts = accs;
	    account = accounts[0];
var acnt=String(account);
	if(acnt==localStorage.getItem('admin')){
var es=document.getElementById("enterstatus");
es.style.display = "";
}
	    updateEthNetworkInfo();
	    updateAuctions();
        updateBlockNumber();

	});
    });
}

function updateBlockNumber() {

    web3.eth.getBlockNumber(function(err, blockNumber) {
    currentBlockNumber = blockNumber;
    console.log("Current block number is: " + blockNumber);
    });
}



