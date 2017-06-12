import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        actionNewContact (pName, pOccupation, pBorn) {
            let rec = this.get('store').createRecord('contact', {name: pName, occupation: pOccupation, born: pBorn});
            rec.save();
        }
    }
});
