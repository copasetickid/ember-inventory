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

/** Ember Data **/
Inventory.Item = DS.Model.extend({
  name: DS.attr('string'),
  value: DS.attr('string')
});

Inventory.Store = DS.Store.extend({
    adapter: DS.LSAdapter
});

Inventory.ItemsController = Ember.ArrayController.extend({
  newItemName: null,

  actions: {
    createNewItem: function(){
      var content = this.get('content');
      console.log("Content: "+content);
      var newItemName = this.get('newItemName');
      var unique = newItemName != null && newItemName.length > 1;

      content.forEach(function(item) {
        if (newItemName === item.get('name')) {
          unique = false; return;
        }
      });

      if (unique) {
        var newItem = this.store.createRecord('item');
        newItem.set('id', newItemName);
        newItem.set('name', newItemName);
        newItem.save();

        this.set('newItemName', null);
      } else {
        alert('Item must have a unique name of at least 2 characters!');
      }
    }
  },
});
