/**
 * Created by Dominik on 2016-09-28.
 */
app.directive('productRentForm', function () {
    return {
        // scope: {
        //     data: '='
        // },
        //
        template: '<form ng-submit="submit(rent)">\
        <div> \
        <fieldset class="form-group">\
        <label for="categorySelect">Kategoria</label>\
        <select name="category" class="form-control" id="categorySelect" ng-model="rent.selectedCategory"">\
            <option ng-repeat="category in categories" value="{{category.Category_Id}}">{{ category.Category_Name }}</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group" ng-show="rent.selectedCategory">\
        <label for="typeSelect">Typ</label>\
        <select name="type" class="form-control" id="typeSelect" ng-model="rent.selectedType">\
        <option ng-repeat="type in types | filter : { Category_Id: rent.selectedCategory }" value="{{ type.Type_Id }}">{{ type.Type_Name }}</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="number">Ilość</label>\
        <input type="number" min="1" max="1000" class="form-control" id="quantity" ng-model="rent.rQuantity">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="fromDate">Od kiedy </label>\
    <input type="date" min="{{ today |date: \'yyyy-MM-dd\' }}" class="form-control" id="fromDate" ng-model="rent.fromDate" name="fromName" ng-change="toDateChange(rent.fromDate)">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="toDate">Do kiedy </label>\
    <input type="date" class="form-control" id="toDate" ng-model="rent.toDate" name="toDate" min="{{minToDate |date:\'yyyy-MM-dd\'}}" max="{{maxToDate | date: \'yyyy-MM-dd\'}}" >\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="comment">Uzasadnienie</label>\
        <textarea class="form-control" id="comment" ng-model="rent.comment" rows="3"></textarea>\
        </fieldset>\
        </div>\
        <button type="submit" class="btn btn-primary">Wyslij</button>\
        {{ toRent }}\
    </form>'
    };
});

