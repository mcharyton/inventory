/**
 * Created by Dominik on 2016-09-28.
 */
app.directive('productRentForm', function () {
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
        <option ng-repeat="type in types || filter : { type.Category_Id: selectedCategory } : true" value="{{ type.Type_Id }}">{{ type.Type_Name }}</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="number">Ilosc</label>\
        <input type="number" class="form-control" id="ilosc" placeholder="">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="date">Od kiedy </label>\
    <input type="date" class="form-control" id="date1" placeholder="">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="date">Do kiedy </label>\
    <input type="date" class="form-control" id="date2" placeholder="">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="exampleTextarea">Uzasadnienie</label>\
        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>\
        </fieldset>\
        </div>'
    };
});

