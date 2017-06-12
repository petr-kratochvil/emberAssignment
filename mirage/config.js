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
      attributes: {name: 'Martin', occupation: 'Developer', born: '1980/02/03'}
    }, {
      type: 'contacts',
      id: 2, 
      attributes: {name: 'Michal', occupation: 'Gardener', born: '1990/09/05'}
    }, {
      type: 'contacts',
      id: 3,
      attributes: {name: 'Ježíš', occupation: 'Feet washer', born: '0000/24/12'}
    }        
  ];

  this.get('/contacts', () => {
    return {data: contactsDB};
  });

  this.get('/contacts/:id', function (db, request) {
    let item = contactsDB.find((it) => it.id == request.params.id);
    if (typeof item === "undefined")
      return {errors: [ { name: "Contact not found.", status: "404" }]};
    return {data: item};
  });

  this.del('/contacts/:id', function (db, request) {
    console.log("Deleting no. "+request.params.id);
    let index = contactsDB.find((it) => it.id == request.params.id).attributes.id;
    contactsDB.splice(index, 1);
  });
}

