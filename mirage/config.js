export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  let contactsDB = [
    {
      type: 'contacts',
      id: 1, 
      attributes: {name: 'Martin'}
    }, {
      type: 'contacts',
      id: 2, 
      attributes: {name: 'Michal'}
    }, {
      type: 'contacts',
      id: 3,
      attributes: {name: 'Ježíš'}
    }        
  ];

  this.get('/contacts', () => {
    return {data: contactsDB};
  });

  this.get('/contacts/:id', function (db, request) {
    for (let c = 0; c < contactsDB.length; c++)
      console.log("Jméno: "+contactsDB[c].attributes.name);

    // deep copy
    let item = JSON.parse(JSON.stringify(
      contactsDB.find((it) => it.id == request.params.id)
    ));
    item.attributes.name += " je prase";
    return {data: item};
  });
}

