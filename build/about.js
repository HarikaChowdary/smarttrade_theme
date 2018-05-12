

var accounts;
var account;
var infoBoxHTMLAbout="";

window.onload = function() {
    $("#right-column").load("rightPanel.html", function() {
        updateInfoBox(infoBoxHTMLAbout);


        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];

            updateEthNetworkInfo();
            updateAuctions();
        });
    });
}
function updateAuctions() {
    var auctionSection = document.getElementById("userAuctions");
    var res = "";

    auctionHouseContract.getAuctionsCountForUser.call(account).then(function(count) {
	console.log("User has this many auctions " + count);
	for (var i = 0; i < count; i ++) {
	    auctionHouseContract.getAuctionIdForUserAndIdx.call(account, i).then(function(idx) {
		auctionHouseContract.getAuction.call(idx).then(function(auc) {
		    console.log("Found an auction: " + auc[3]);
		    var bidAmount = web3.fromWei(auc[10], "ether");
		    res = res + "<br><a href='auction.html?auctionId=" + idx + "'>" + auc[3] + "</a>: " + bidAmount + " ETH";
		    auctionSection.innerHTML = res;
		});
	    });
	}
    });    
}
