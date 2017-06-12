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
        actionEditName() {
            document.getElementById('editName').style.visibility = 'visible';
            document.getElementById('editNameButton').style.visibility = 'visible';
        },
        actionSaveName(id, name) {
            document.getElementById('editName').style.visibility = 'hidden';
            document.getElementById('editNameButton').style.visibility = 'hidden';
            this.get('store').findRecord('contact', id).then(
                (c) => {
                    c.set("name", name);
                    c.save();
                }
            );
        },
        actionEditOccupation() {
            document.getElementById('editOccupation').style.visibility = 'visible';
            document.getElementById('editOccupationButton').style.visibility = 'visible';
        },
        actionSaveOccupation(id, name) {
            document.getElementById('editOccupation').style.visibility = 'hidden';
            document.getElementById('editOccupationButton').style.visibility = 'hidden';
            this.get('store').findRecord('contact', id).then(
                (c) => {
                    c.set("occupation", name);
                    c.save();
                }
            );
        },
        actionEditBorn() {
            document.getElementById('editBorn').style.visibility = 'visible';
            document.getElementById('editBornButton').style.visibility = 'visible';
        },
        actionSaveBorn(id, name) {
            document.getElementById('editBorn').style.visibility = 'hidden';
            document.getElementById('editBornButton').style.visibility = 'hidden';
            this.get('store').findRecord('contact', id).then(
                (c) => {
                    c.set("born", name);
                    c.save();
                }
            );
        }
    }
});
