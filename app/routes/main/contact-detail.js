import Ember from 'ember';

export default Ember.Route.extend({
    model (params) {
            return this.get('store').findRecord('contact', params.contact_id).catch(
                () => { this.transitionTo('main.nonexistent'); }
            );
    },
    actions: {
        actionRemoveContact(param) {
            this.get('store').findRecord('contact', param, { backgroundReload: false }).then(
                function(c) {
                    console.log("Destroying "+JSON.stringify(c));
                    c.destroyRecord();
                }
            ).then(() => {
                this.transitionTo('main');
            });
        },
        actionEdit(guiName) {
            document.getElementById('edit'+guiName).style.visibility = 'visible';
            document.getElementById('edit'+guiName+'Button').style.visibility = 'visible';
        },
        actionSave(guiName, dataName, id, value) {
            document.getElementById('edit'+guiName).style.visibility = 'hidden';
            document.getElementById('edit'+guiName+'Button').style.visibility = 'hidden';
            this.get('store').findRecord('contact', id).then(
                (c) => {
                    c.set(dataName, value);
                    c.save();
                }
            );
        },
    }
});
