/**
 * Created by Dominik on 2016-09-28.
 */
app.directive('productOrderForm', function () {
    return {
        template: '\
        <form ng-submit="submit(order)" class="form-horizontal">\
        <div class="form-group">\
            <label for="categorySelect" class="control-label col-sm-3">Kategoria</label>\
            <div class="col-sm-7">\
                <select name="category" class="form-control" id="categorySelect" ng-model="order.selectedCategory"">\
                    <option ng-repeat="category in categories" value="{{category.Category_Id}}">{{ category.Category_Name }}</option>\
                </select>\
            </div>\
        </div>\
        <div class="form-group" ng-show="order.selectedCategory">\
            <label for="typeSelect" class="control-label col-sm-3">Typ</label>\
            <div class="col-sm-7">\
                <select name="type" class="form-control" id="typeSelect" ng-model="order.selectedType">\
                    <option ng-repeat="type in types | filter : { Category_Id: order.selectedCategory }" value="{{ type.Type_Id }}">{{ type.Type_Name }}</option>\
                </select>\
            </div>\
        </div>\
        <div class="form-group">\
            <label for="quantity" class="control-label col-sm-3">Ilość</label>\
            <div class="col-sm-7">\
                <input type="number" min="1" max="1000" class="form-control" id="quantity" ng-model="order.quantity">\
            </div>\
        </div>\
        <div class="form-group">\
        <label for="deliveryDate" class="control-label col-sm-3">Data żądanej realizacji </label>\
        <div class="col-sm-7">\
    <input type="date" class="form-control" id="deliveryDate" ng-model="order.deliveryDate" name="deliveryDate" min="{{ today |date: \'yyyy-MM-dd\' }}" >\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="comment" class="control-label col-sm-3">Uzasadnienie</label>\
        <div class="col-sm-7">\
        <textarea class="form-control" id="comment" ng-model="order.comment" rows="3"></textarea>\
        </div>\
        </div>\
        <div class="col-sm-offset-3 col-sm-7">\
        <button type="submit" class="btn btn-primary">Wyslij</button>\
        </div>\
    </form>\
    {{toOrder}}'
    };
});

