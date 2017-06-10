import Ember from 'ember';

export default Ember.Route.extend({
      model () {return ['Michal', 'Martin', 'Ježíš', 'Mojžíš'];},
      actions: {
        actionNewContact() {
            this.transitionTo('main.contact-new');
        }
      }
});
