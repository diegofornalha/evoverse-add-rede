// ADD Binance Smart Chain to Metamask
var eth;
var isTestnet = 'false';
async function addNetwork(type) {

    if (type === 'web3') {
        if (typeof ethereum !== 'undefined') {
            eth = new Web3Eth(ethereum);
        } else if (typeof web3 !== 'undefined') {
            eth = new Web3Eth(web3.givenProvider);
        } else {
            eth = new Web3Eth(ethereum);
        }
    }
    if (typeof eth !== 'undefined') {
        var network = 0;
        network = await eth.net.getId();
        netID = network.toString();
        var params;
        if (isTestnet == "false") {
            if (netID == "56") {
                alert("A rede já foi adicionada ao Metamask.");
                return;
            } else {
                params = [{
                    chainId: '0x38',
                    chainName: 'Binance Smart Chain',
                    nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com/']
                }]
            }
        } else {
            if (netID == "97") {
                alert("Já foi adicionado ao Metamask");
                return;
            } else {
                params = [{
                    chainId: '0x61',
                    chainName: 'Binance Smart Chain Testnet',
                    nativeCurrency: {
                        name: 'tBNB',
                        symbol: 'tBNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                    blockExplorerUrls: ['https://testnet.bscscan.com/']
                }]
            }
        }

        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params
        }).then(()=>console.log('Success')).catch((error)=>console.log("Error", error.message));
    } else {
        alert('Incapaz de localizar um navegador web3 compatível!');
    }
}

// ADD TOKEN TO METAMASK
function addToWallet() {
    var net = "bsc";

    if (typeof binance !== 'undefined') {
        BNB = new Web3Eth(binance);
    } else if (typeof web3 !== 'undefined') {
        BNB = new Web3Eth(web3.currentProvider);
    } else {
        alert('No web3 provider');
        return;
    }

    var network = 0;
    BNB.net.getId((err,netId)=>{
        network = netId.toString();
        switch (network) {
        case "56":
            network = 'Bsc';
            break;
        default:
            console.log('Esta é uma rede desconhecida');
        }

        if (network.toLowerCase() !== net.toLowerCase()) {
            alert("Conecte-se à rede Bsc");
            return false;
        } else {
            try {
                web3.currentProvider.sendAsync({
                    method: 'wallet_watchAsset',
                    params: {
                        'type': 'ERC20',
                        'options': {
                            'address': '0x6E712547f5372103d9c3918144f4cA6fe06cF2b1',
                            'symbol': 'LDSC',
                            'decimals': '18',
                            'image': 'https://bscscan.com/images/main/empty-token.png',
                        },
                    },
                    id: Math.round(Math.random() * 100000)
                }, function(err, data) {
                    if (!err) {
                        if (data.result) {
                            console.log('Token added');
                        } else {
                            console.log(data);
                            console.log('Some error');
                        }
                    } else {
                        console.log(err.message);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
    );
}
