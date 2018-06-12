var accounts; 
var account;
var auctions;
var stsContract;
var aucs = [];
var time;
var flag2=0;

var Mywin;
function sendMssg()
{
	Mywin = window.open("http://localhost:3000/","Mywin", "width=200,height=100");

    var closing = setTimeout(Winclose, 3000);
}
function Winclose()
{
    Mywin.close();
}


function getAuction(auctionId) {
    stsContract.getAuction.call(auctionId).then(function(auction) {
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
                
		var retrievedData = localStorage.getItem("none");
		var winarray = JSON.parse(retrievedData);
		var length=winarray.length;var i;
		//console.log(winarray+" "+length);
			for(i=0;i<length;i++){
				if(winarray[i]==auc[3])
				{	console.log("found name");flag2=1;break;
				}
			}
		if(flag2==0){
		if (!(auc[3] in localStorage))
		{
		 localStorage.setItem(auc[3],url[k]);
		//console.log("set value");
		}
        if(auc[5]>500)
        {
            time=auc[5] / 11;
            time=Math.round(time/(60*24));
            if(time>364)
            {
                time=Math.round(time/365)+"days";}
            else
            {
                time=((time/1000)*60)+"mins";
            }
        }
        else if(auc[5]>15)
        {
            time=auc[5]/11;time=Math.round(time/60);time=time+"hrs";
        }
		//console.log(auc[3]);
		//console.log(localStorage.getitem(auc[3]));
		if(auc[3]=="testing-smart trade"){localStorage.setItem(auc[3],"https://images.pexels.com/photos/846357/pexels-photo-846357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940");}

                res  = res + "<div class='w3-row-padding' align='center'>";
                res = res + "<a href='auction.html?auctionId=" + auc[12] + "'><img src=" + localStorage.getItem(auc[3]) + "height='350' width='300' class='img-rounded img-center'></a>" + "<br>";
                res = res + "<a href='auction.html?auctionId=" + auc[12] + "'>" + "Product  : " +  auc[3] + "</a><br>";
                res = res +  "Highest Bid    : " +  web3.fromWei(auc[10], "ether") + " ETH" + "<br>";
                res = res +   "Number of bids    : " +  auc[11] + "<br>";
                res = res +  "Time Left  : " +  time + "<br>";
               // res = res + "<div class='rating'><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span></div>";
               // if(k>=9){k=0;}
             
                res = res + "</div>";
               k++;
		}

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

    stsContract.getAuctionCount.call().then(function(count) {
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
	//var winarray= [322, 374, 300];
  //localStorage.setItem('0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5win', JSON.stringify(winarray));
/*var retrievedData = localStorage.getItem("harikawin");
var winarray = JSON.parse(retrievedData);
alert(winarray.length);
/*winarray[2]=56;
 localStorage.setItem('harikawin', JSON.stringify(winarray));
var retrievedData = localStorage.getItem("harikawin");
var movies2 = JSON.parse(retrievedData);
//making sure it still is an array
//alert(movies2[2]);	
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
        //localStorage.setItem("none",JSON.stringify(winarray));
        //localStorage.setItem("admin","0xdfdc4bc7e40fc534304638319d7b6cad0c5ad7d5");
    
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

        stsContract = Sts.at(ah_addr);

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



