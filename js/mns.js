MasterNode = function(coin) {
    this.name = coin.name;
    this.alias = coin.alias;
    this.usd_price = coin.usd_price;
    this.btc_price = coin.btc_price;
    this.description = coin.discription;
}

MasterNode.prototype.website = function(){
    if (coins[this.name] && coins[this.name].website){
        return coins[this.name].website;
    }
}

MasterNode.prototype.logo = function(){
    if (coins[this.name] && coins[this.name].logo){
        return coins[this.name].logo;
    }
}

/*
MasterNode.prototype.getWebsiteLink = function() {
    if (this.website()){
        return '<a href="'+ this.website() +'" target="_blank"><span class="octicon octicon-file-text"></span>Website</a> ';
    }
}
*/

MasterNode.prototype.getContainer = function(index){
    var last = '';
    if (index % 4 == 0) {last = 'last-in-row'}

    return [
        '<div class="coin island-light island-stack island ', this.alias, ' ', last, ' ">',
            this.logoImage(),
            this.masternodeContent(),
        '</div>'
    ].join('');
}

MasterNode.prototype.logoImage = function(){
    if (this.logo()){
        return [
            '<div class="island-item logo-image">',
            '<img src="/img/', this.logo() ,'">',
            '</div>'
        ].join('');
    }
}

MasterNode.prototype.masternodeContent = function(){
  return [
    '<div class="island-item">',
      '<h3>',
        '<a href="', this.website(), '" target="_blank">', this.name, '</a>',
      '</h3>',
      '<div class="mn-info">',
        '<span><i class="coin coin-usd-price"></i> ', this.usd_price, '</span> ',
        '<span><i class="coin coin-btc-price"></i> ', this.btc_price, '</span>',
      '</div>',
      '<p>', this.description, '</p>',
    '</div>'
  ].join('');
}

$(document).ready(function(){
    $('.masternodes .coins').empty();
    coins.forEach(function(coin, i){
        console.log(coin);
        console.log(i);
        var masternode = new MasterNode(coin);
        console.log(masternode.getContainer(i+1));
        $('.masternodes .coins').append(masternode.getContainer(i+1));
    });
});
