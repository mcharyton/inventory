/**
 * Created by Dominik on 2016-09-28.
 */
app.directive('productOrderForm', function () {
    return {
        // scope: {
        //     data: '='
        // },
        //
        template: '<div> \
        <fieldset class="form-group">\
        <label for="categorySelect">Kategoria</label>\
        <select name="category" class="form-control" id="categorySelect" ng-model="selectedCategory"">\
            <option ng-repeat="category in categories" value="{{category.Category_Id}}">{{ category.Category_Name }}</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group" ng-show="selectedCategory">\
        <label for="typeSelect">Typ</label>\
        <select name="type" class="form-control" id="typeSelect" ng-model="selectedType">\
        <option ng-repeat="type in types | filter : { Category_Id: selectedCategory }" value="{{ type.Type_Id }}">{{ type.Type_Name }}</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="number">Ilość</label>\
        <input type="number" min="0" max="1000" class="form-control" id="quantity" ng-model="quantity">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="fromDate">Data zamówienia </label>\
        {{today}}\
    <input type="date" min="{{ today |date: \'yyyy-MM-dd\' }}" class="form-control" id="fromDate" ng-model="fromDate" name="fromName">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="toDate">Data żądanej realizacji </label>\
        {{maxDate}}\
    <input type="date" class="form-control" id="toDate" ng-model="toDate" name="toDate" min="{{ today |date: \'yyyy-MM-dd\' }}" >\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="exampleTextarea">Uzasadnienie</label>\
        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>\
        </fieldset>\
        </div>'
    };
});

