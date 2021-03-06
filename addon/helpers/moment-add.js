import Ember from 'ember';
import moment from 'moment';

import computeFn from '../utils/helper-compute';
import BaseHelper from './-base';

export default BaseHelper.extend({
  globalAllowEmpty: false,

  compute: computeFn(function(params, { precision, locale, timeZone }) {
    this._super(...arguments);

    const { length } = params;
    const args = [];
    const additionArgs = [];

    if (length === 1) {
      additionArgs.push(params[0]);
    } else if (length === 2 && Ember.typeOf(params[0]) === 'number' && Ember.typeOf(params[1]) === 'string') {
      additionArgs.push(...params);
    } else {
      args.push(params[0]);
      additionArgs.push(...params.slice(1));
    }

    return this.morphMoment(moment(...args), { locale, timeZone }).add(...additionArgs, precision);
  })
});
