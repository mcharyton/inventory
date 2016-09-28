/**
 * Created by Dominik on 2016-09-28.
 */
app.directive('productOrderForm', function () {
    return {
        template: '<div> \
        <fieldset class="form-group">\
        <label for="exampleSelect1">Kategoria</label>\
        <select class="form-control" id="exampleSelect1">\
        <option>1</option>\
        <option>2</option>\
        <option>3</option>\
        <option>4</option>\
        <option>5</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="exampleSelect1">Typ</label>\
        <select class="form-control" id="exampleSelect1">\
        <option>1</option>\
        <option>2</option>\
        <option>3</option>\
        <option>4</option>\
        <option>5</option>\
        </select>\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="number">Ilosc</label>\
        <input type="number" ng-model="Quantity" class="form-control" id="ilosc" placeholder="">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="date">Data </label>\
        <input type="date" ng-model="Order_Date" class="form-control" id="date1" placeholder="">\
        </fieldset>\
        <fieldset class="form-group">\
        <label for="exampleTextarea">Uzasadnienie</label>\
        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>\
        </fieldset>\
            </div>'
    };
});