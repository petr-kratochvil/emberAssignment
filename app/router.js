import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('main', function () {
    this.route('contact-detail', {path: '/detail/:contact_id'});
    this.route('contact-edit', {path: '/edit/:contact_id'});
    this.route('contact-new', {path: '/new'});
  });
});

export default Router;
