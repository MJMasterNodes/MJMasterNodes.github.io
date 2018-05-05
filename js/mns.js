MasterNode = function(name, coin) {
    this.name = name;
    this.alias = coin.alias;
    this.usd_price = coin.usd_price;
    this.description = coin.description;
    this.MNs = coin.MNs;
    this.coin_id = coin.id
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
    if (index % 3 == 0) {last = 'last-in-row'}

    return [
        '<div class="project island-light island-stack island featured-project ', last, ' ">',
            this.logoImage(),
            this.cmcPrice(),
            this.masternodeContent(),
            this.masterNodeLinks(),
        '</div>'
    ].join('');
}

MasterNode.prototype.cmcPrice = function(){
    if (this.coin_id){
        return ['<div class="coinmarketcap-currency-widget" data-currencyid="', this.coin_id, '" data-base="USD"  data-secondary="BTC" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-stats="USD" data-statsticker="true">','</div>'].join('');
    }
}

MasterNode.prototype.logoImage = function(){
    if (!this.coin_id){
        if (this.logo()){
            return [
                '<div class="island-item featured-image">',
                '<img src="/img/', this.logo() ,'">',
                '</div>'
            ].join('');
        }
    }
}

MasterNode.prototype.masternodeContent = function(){
  return [
    '<div class="island-item">',
      '<h3>',
        '<a href="', this.website(), '" target="_blank">', this.name, ' (',this.alias,')</a>',
      '</h3>',
      '<p>', this.description, '</p>',
    '</div>'
  ].join('');
}

MasterNode.prototype.getMasterNodeLink = function(mn, idx){
    if (mn){
        if (mn[0] != '' && mn[1] != ''){
            return '<div><li><a href="'+ mn[0] +'" target="_blank">Explorer_'+idx+'</a> &emsp; &emsp; <a href="'+ mn[1] +'" target="_blank">ShareHolder_'+idx+'</a> </li></div>';
        }else if(mn[1] == ''){
            return '<div><li><a href="'+ mn[0] +'" target="_blank">Explorer_'+idx+'</a> &emsp; &emsp; Anonymous Full Holder.</li></div>';
        }else{
            return '<div><li>Axplorer not available. &emsp; &emsp; <a href="'+ mn[1] +'" target="_blank">ShareHolder_'+idx+'</a> </li></div>';
        }
    }
}

MasterNode.prototype.masterNodeLinks = function(){
if (this.MNs) {
    var links = '';
    for (mn in this.MNs){
        links += this.getMasterNodeLink(this.MNs[mn], mn);
    }
    return [
    '<div class="island-item bottom-links">',
        links, 
        '</div>'].join('');
    }
}

$(document).ready(function(){
    $('.masternodes .full_coins').empty();
    $('.masternodes .shared_coins').empty();
    full_coins = {};
    shared_coins = {};
    for (coin in coins){
        if (coins[coin].type == 'full'){
            full_coins[coin] = coins[coin];
        }else{
            shared_coins[coin] = coins[coin];
        }
    }

    var i = 0;
    for (coin in full_coins){
        var masternode = new MasterNode(coin, coins[coin]);
        $('.masternodes .full_coins').append(masternode.getContainer(i+1));
        i += 1;
    }

    var j = 0;
    for (coin in shared_coins){
        var masternode = new MasterNode(coin, coins[coin]);
        $('.masternodes .shared_coins').append(masternode.getContainer(j+1));
        j += 1;
    }
    $('.masternodes-count').html(i+j);
});
