import utils from 'utils';

export default class Trx {
    constructor(trongrid = false) {
        if (!trongrid)
            throw new Error('Expected instance of TronGrid');

        this.trongrid = trongrid;
        this.tronWeb = trongrid.tronweb;
        this.defaultAddress = trongrid.defaultAddress;
        this.injectPromise = utils.promiseInjector(this);
    }

    getAccountByAddress(address = false, options = {}, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.defaultAddress;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getAccountByAddress, address, options);

        if (!this.trongrid.isAddress(address))
            return callback('Invalid address provided');

        address = this.trongrid.address.toHex(address);
        const params = {
            version: this.trongrid.apiVersion,
            address: address
        };

        const url = utils.processUrl("getAccountByAddress", options, params, callback);

        this.tronWeb.fullNode.request(url, 'get').then(account => {
            callback(null, account);
        }).catch(err => callback(err));
    }

    getTransactionsByAddress(address = false, options = {}, callback = false) {
        if (utils.isFunction(address)) {
            callback = address;
            address = this.defaultAddress;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getTransactionsByAddress, address, options);

        if (!this.trongrid.isAddress(address))
            return callback('Invalid address provided');

        address = this.trongrid.address.toHex(address);
        const params = {
            version: this.trongrid.apiVersion,
            address: address
        };

        const url = utils.processUrl("getTransactionsByAddress", options, params, callback);

        this.tronWeb.fullNode.request(url, 'get').then(transactions => {
            callback(null, transactions);
        }).catch(err => callback(err));
    }

    getAssetsByIdentifier(identifier = false, options = {}, callback = false) {
        if (utils.isFunction(identifier)) {
            callback = identifier;
            identifier = this.defaultAddress;
        }

        if (utils.isFunction(options)) {
            callback = options;
            options = {};
        }

        if (!callback)
            return this.injectPromise(this.getAssetsByIdentifier, identifier, options);

        const params = {
            version: this.trongrid.apiVersion,
            identifier: identifier
        };

        const url = utils.processUrl("getAssetsByIdentifier", options, params, callback);

        this.tronWeb.fullNode.request(url, 'get').then(assets => {
            callback(null, assets);
        }).catch(err => callback(err));
    }
};
