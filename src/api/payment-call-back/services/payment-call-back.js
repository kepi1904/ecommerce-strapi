'use strict';

/**
 * payment-call-back service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::payment-call-back.payment-call-back');
