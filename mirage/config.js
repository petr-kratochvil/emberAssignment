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

  let dbFromStorage = localStorage.getItem('db');

  let contactsDB;

  let saveToStorage = function () {
    localStorage.setItem('db', JSON.stringify(contactsDB));
  };

  if (dbFromStorage) {
    contactsDB = JSON.parse(dbFromStorage);
  } else {
      contactsDB = [
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
    saveToStorage();
  }

  let nextID = 4;

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
    let index = contactsDB.findIndex((it) => it.id == request.params.id);
    contactsDB.splice(index, 1);
    saveToStorage();
  });

  this.post('/contacts', function (db, request) {
    let item = { type: 'contacts', id: nextID++, attributes: {
      name: request.params.name,
      occupation: request.params.occupation,
      born: request.params.born
    }};
    contactsDB.push(item);
    saveToStorage();
    return {data: item};
  });

  this.patch('/contacts/:id', function (db, request) {
    let params = JSON.parse(request.requestBody).data.attributes;
    let index = contactsDB.findIndex((it) => it.id == request.params.id);
    contactsDB[index].attributes.name = params.name;
    contactsDB[index].attributes.occupation = params.occupation;
    contactsDB[index].attributes.born = params.born;
    saveToStorage();
    return {data: contactsDB[index]};
  });
}

