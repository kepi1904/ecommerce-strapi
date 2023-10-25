// @ts-nocheck
"use strict";

/**
 * payment-call-back controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::payment-call-back.payment-call-back',
  ({ strapi }) => ({
    async create(ctx) {
      let requestData = ctx.request.body;
      console.log('request ffff ', "ddddd");
      // console.log('request xendit ', requestData);

      let order = await strapi
        .service('api::order.order')
        .findOne(parseInt(requestData.external_id));
      let inputData = {'data': { 'history': requestData }};
      const result = await strapi
        .service('api::payment-call-back.payment-call-back')
        .create(inputData);
        console.log('request xendit ', result);
      let params = {};
      if (requestData.status == 'PAID') {
        params = { 'data': { 'status': 'packaging'} }
      } else {
        params = { 'data': { 'status': 'cancel' } }
      }
      let updateOrder = await strapi
        .service('api::order.order')
        .update(parseInt(requestData.external_id), params);
      return { 'data': updateOrder }

    },
  })
);
