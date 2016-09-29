/**
 * Created by Dominik on 2016-09-28.
 */
app.directive('productRentForm', function () {
    return {
        template: '<form ng-submit="submit(rent)" class="form-horizontal">\
        <div class="form-group">\
        <label for="categorySelect" class="control-label col-sm-3">Kategoria</label>\
        <div class="col-sm-7">\
        <select name="category" class="form-control" id="categorySelect" ng-model="rent.selectedCategory"">\
            <option ng-repeat="category in categories" value="{{category.Category_Id}}">{{ category.Category_Name }}</option>\
        </select>\
        </div>\
        </div>\
        <div class="form-group" ng-show="rent.selectedCategory">\
        <label for="typeSelect" class="control-label col-sm-3">Typ</label>\
        <div class="col-sm-7">\
        <select name="type" class="form-control" id="typeSelect" ng-model="rent.selectedType">\
        <option ng-repeat="type in types | filter : { Category_Id: rent.selectedCategory }" value="{{ type.Type_Id }}">{{ type.Type_Name }}</option>\
        </select>\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="quantity" class="control-label col-sm-3">Ilość</label>\
        <div class="col-sm-7">\
        <input type="number" name="quantity" min="1" max="1000" class="form-control" id="quantity" ng-model="rent.rQuantity">\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="fromDate" class="control-label col-sm-3">Od kiedy </label>\
        <div class="col-sm-7">\
        <input type="date" min="{{ today |date: \'yyyy-MM-dd\' }}" class="form-control" id="fromDate" ng-model="rent.fromDate" name="fromName" ng-change="toDateChange(rent.fromDate)">\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="toDate" class="control-label col-sm-3">Do kiedy </label>\
        <div class="col-sm-7">\
        <input type="date" class="form-control" id="toDate" ng-model="rent.toDate" name="toDate" min="{{minToDate |date:\'yyyy-MM-dd\'}}" max="{{maxToDate | date: \'yyyy-MM-dd\'}}" >\
        </div>\
        </div>\
        <div class="form-group">\
        <label for="comment" class="control-label col-sm-3">Uzasadnienie</label>\
        <div class="col-sm-7">\
        <textarea class="form-control" id="comment" ng-model="rent.comment" rows="3"></textarea>\
        </div>\
        </div>\
        <div class="col-sm-offset-3 col-sm-7">\
        <button type="submit" class="btn btn-primary">Wyslij</button>\
        </div> \
        {{ toRent }}\
    </form>'
    };
});

