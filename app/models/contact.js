import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    occupation: DS.attr(),
    born: DS.attr()
});
