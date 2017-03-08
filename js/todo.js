// $(document).ready();
$(function(){

    //Model here
    var Todo = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "empty rodo...",
                order: Todos.nextOrder(),
                done: false
            };
        },
        toggle: function () {
            this.save({done: !this.get("done")});
        }
    })

    //collection here
    var TodoList = Backbone.Collection.extend({
        model: Todo,
        // localStorge: new Backbone.LocalStorge("todos-backbone"),
        done: function() {
            return this.where({done: true});
        },
    })

});