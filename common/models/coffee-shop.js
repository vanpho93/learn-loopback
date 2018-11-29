'use strict';

module.exports = function (CoffeeShop) {
    CoffeeShop.status = function (cb) {
        cb(null, Math.random() > 0.5);
    }
    CoffeeShop.remoteMethod(
        'status', {
            http: {
                path: '/status',
                verb: 'get'
            },
            returns: {
                arg: 'status',
                type: 'string'
            }
        }
    );
    CoffeeShop.getName = function (shopId, cb) {
        CoffeeShop.findById(shopId, function (err, instance) {
            const response = "Name of coffee shop is " + instance.name;
            cb(null, response);
            console.log(response);
        });
    };

    CoffeeShop.beforeRemote('create', function (context, user, next) {
        next();
    });

    CoffeeShop.afterRemote('create', function (context, user, next) {
        if (context.result) {
            context.result.createAt = Date.now();
        }
        next();
    });

    CoffeeShop.on('dataSourceAttached', function (obj) {
        var find = CoffeeShop.find;
        CoffeeShop.find = function (filter, cb) {
            console.log('finddddd');
            return find.apply(this, arguments);
        };
    });
};
