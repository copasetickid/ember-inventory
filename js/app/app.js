var Inventory = Ember.Application.create({
});

Inventory.Router.map(function(){
  this.resource('items', { path: "/"}, function(){
    this.route("item", {path: "/item/:item_id"});
  });
});

Inventory.ItemsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('item');
  }
});

Inventory.ItemsItemRoute = Ember.Route.extend({
  model: function(item) {
    return this.store.find('item', item.item_id);
  }
});

